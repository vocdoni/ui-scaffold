import { useClient } from '@vocdoni/react-providers'
import { RemoteSigner } from '@vocdoni/sdk'
import { useCallback, useMemo, useState } from 'react'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { api, ApiEndpoints } from '~components/Auth/api'

export type LoginResponse = { token: string; expirity: string }

export interface ILoginParams {
  email: string
  password: string
}

interface IRegisterParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useLogin = (options: Omit<UseMutationOptions<LoginResponse, Error, ILoginParams>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, ILoginParams>({
    mutationFn: (params: ILoginParams) => api<LoginResponse>(ApiEndpoints.LOGIN, params, 'POST'),
    ...options,
  })
}

export const useRegister = (options: Omit<UseMutationOptions<LoginResponse, Error, IRegisterParams>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, IRegisterParams>({
    mutationFn: (params: IRegisterParams) => api<LoginResponse>(ApiEndpoints.REGISTER, params, 'POST'),
    ...options,
  })
}

enum LocalStorageKeys {
  AUTH_TOKEN = 'authToken',
}

export const useAuthProvider = () => {
  const { setSigner, clear } = useClient()
  const [bearer, setBearer] = useState<string | null>(localStorage.getItem(LocalStorageKeys.AUTH_TOKEN))
  const login = useLogin({
    onSuccess: (data, variables) => {
      console.log('logged in', data, variables)
      storeLogin(data)
    },
  })
  const register = useRegister({
    onSuccess: (data, variables) => {
      console.log('registered', data, variables)
      storeLogin(data)
    },
  })

  const isAuthenticated = useMemo(() => !!bearer, [bearer])

  // todo: implement this
  // check if the token is still valid
  // useEffect(() => {
  //   if (!bearer) return
  //
  //   bearedFetch(`${appUrl}/auth/check`)
  //     // Invalid token or expired, so logout
  //     .then(async (response) => {
  //       if (response.status !== 200) {
  //         logout()
  //       }
  //     })
  //     // network errors or other issues
  //     .catch(() => {
  //       logout()
  //     })
  // }, [])

  const storeLogin = useCallback(({ token }: LoginResponse) => {
    const signer = new RemoteSigner({
      url: import.meta.env.SAAS_URL,
      token,
    })
    localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token)
    setBearer(token)
    setSigner(signer)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    setBearer(null)
    clear()
  }, [])

  return {
    isAuthenticated,
    login,
    register,
    logout,
  }
}
