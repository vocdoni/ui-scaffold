import { useMutation } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { NoOrganizationsError, RemoteSigner } from '@vocdoni/sdk'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, ApiEndpoints, ApiParams, UnauthorizedApiError } from '~components/Auth/api'
import { LoginResponse, useLogin, useRegister, useVerifyMail } from '~components/Auth/authQueries'

enum LocalStorageKeys {
  Token = 'authToken',
}

/**
 * Mutation to set the RemoteSigner and check its address
 * This hook is used as state to determine if an address is associated to the Signer to redirect
 * to create organization page if not.
 */
const useSigner = () => {
  const { setSigner } = useClient()

  const updateSigner = useCallback(async (token: string) => {
    const signer = new RemoteSigner({
      url: import.meta.env.SAAS_URL,
      token,
    })
    setSigner(signer)
    // Once the signer is set, try to get the signer address
    // This is an asynchronous call because the address are fetched from the server,
    // and we don't know if we need to create an organization until we try to retrieve the address

    try {
      return await signer.getAddress()
    } catch (e) {
      // If is NoOrganizationsError ignore the error
      if (!(e instanceof NoOrganizationsError)) {
        throw e
      }
    }
  }, [])

  return useMutation<string, Error, string>({ mutationFn: updateSigner })
}

export const useAuthProvider = () => {
  const { signer: clientSigner, clear } = useClient()
  const [bearer, setBearer] = useState<string | null>(localStorage.getItem(LocalStorageKeys.Token))

  const login = useLogin({
    onSuccess: (data) => {
      storeLogin(data)
    },
  })
  const register = useRegister()
  const mailVerify = useVerifyMail({
    onSuccess: (data) => {
      storeLogin(data)
    },
  })
  const { mutate: updateSigner, isIdle: signerIdle, isPending: signerPending, data: signerAddress } = useSigner()

  const bearedFetch = useCallback(
    <T>(path: string, { headers = new Headers({}), ...params }: ApiParams = {}) => {
      if (bearer) {
        headers.append('Authorization', `Bearer ${bearer}`)
      }
      return api<T>(path, { headers, ...params }).catch((e) => {
        if (e instanceof UnauthorizedApiError) {
          return api<LoginResponse>(ApiEndpoints.Refresh, { headers, method: 'POST' })
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

  const storeLogin = useCallback(({ token }: LoginResponse) => {
    localStorage.setItem(LocalStorageKeys.Token, token)
    setBearer(token)
    updateSigner(token)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.Token)
    setBearer(null)
    clear()
  }, [])

  // If no signer but berarer instantiate the signer
  // For example when bearer is on local storage but no login was done to instantiate the signer
  useEffect(() => {
    if (bearer && !clientSigner) {
      updateSigner(bearer)
    }
  }, [bearer, clientSigner])

  const isAuthenticated = useMemo(() => !!bearer, [bearer])
  const isAuthLoading = useMemo(
    () => (isAuthenticated && signerIdle) || (isAuthenticated && !signerIdle && signerPending),
    [isAuthenticated, signerIdle, signerPending]
  )

  return {
    isAuthenticated,
    login,
    register,
    mailVerify,
    logout,
    bearedFetch,
    isAuthLoading,
    signerAddress,
  }
}
