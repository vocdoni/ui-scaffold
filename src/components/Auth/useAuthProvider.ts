import { useClient } from '@vocdoni/react-providers'
import { RemoteSigner } from '@vocdoni/sdk'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, ApiEndpoints, ApiParams, UnauthorizedApiError } from '~components/Auth/api'
import { LoginResponse, useLogin, useRegister, useVerifyMail } from '~components/Auth/authQueries'

enum LocalStorageKeys {
  AUTH_TOKEN = 'authToken',
}

export const useAuthProvider = () => {
  const { signer, setSigner, clear } = useClient()
  const [bearer, setBearer] = useState<string | null>(localStorage.getItem(LocalStorageKeys.AUTH_TOKEN))

  // Helper state to determine if the bearer key is loaded and the signer address is available
  const [loaded, setLoaded] = useState<boolean>(false)
  // Helper state to determine the signer have an address available
  const [signerAddress, setSignerAddress] = useState<string>('')

  const login = useLogin({
    onSuccess: (data, variables) => {
      storeLogin(data)
    },
  })
  const register = useRegister()
  const mailVerify = useVerifyMail({
    onSuccess: (data, variables) => {
      storeLogin(data)
    },
  })

  const isAuthenticated = useMemo(() => !!bearer, [bearer])

  const bearedFetch = useCallback(
    <T>(path: ApiEndpoints, { headers = new Headers({}), ...params }: ApiParams) => {
      if (!bearer) {
        logout()
        throw new Error('No bearer token')
      }
      headers.append('Authorization', `Bearer ${bearer}`)
      return api<T>(path, { headers, ...params }).catch((e) => {
        if (e instanceof UnauthorizedApiError) {
          return api<LoginResponse>(ApiEndpoints.REFRESH, { headers, method: 'POST' })
            .then((data) => {
              storeLogin(data)
              headers.set('Authorization', `Bearer ${data.token}`)
              return api<T>(path, { headers, ...params })
            })
            .catch((e) => {
              logout()
              throw e
            })
        }
        throw e
      })
    },
    [bearer]
  )

  const updateSigner = useCallback(async (token: string) => {
    let saasUrl = import.meta.env.SAAS_URL
    // Ensure saas url doesn't end with `/` because the inner paths of the SDK are absolute
    if (saasUrl.endsWith('/')) {
      saasUrl = saasUrl.slice(0, -1)
    }
    const signer = new RemoteSigner({
      url: saasUrl,
      token,
    })
    setSignerAddress(await signer.getAddress())
    setSigner(signer)
  }, [])

  const storeLogin = useCallback(({ token }: LoginResponse) => {
    localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token)
    setBearer(token)
    updateSigner(token)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    setBearer(null)
    clear()
  }, [])

  /**
   * Reinstantate Remotesigner to perform updates on the client
   */
  const refresh = useCallback(() => {
    updateSigner(bearer)
  }, [bearer])

  // If no signer but berarer instantiate the signer
  // For example when bearer is on local storage but no login was done to instantiate the signer
  useEffect(() => {
    ;(async () => {
      if (bearer && !signer) {
        await updateSigner(bearer)
      }
      setLoaded(true)
    })()
  }, [bearer, signer])

  return {
    isAuthenticated,
    login,
    register,
    mailVerify,
    logout,
    bearedFetch,
    refresh,
    loaded,
    signerAddress,
  }
}
