import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { RemoteSigner } from '@vocdoni/sdk'
import { useCallback, useMemo, useState } from 'react'

type LoginResponse = { token: string; expirity: string }

export interface ILoginParameters {
  email: string
  password: string
}

export interface IRegisterParameters {
  firstName: string
  lastName: string
  email: string
  password: string
}

type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = <T>(path: string, params?: unknown, method: MethodTypes = 'GET'): Promise<T> => {
  return fetch(`${import.meta.env.SAAS_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
    .catch((error: Error) => {
      // todo(kon): implement error handling
      throw error
    })
}

const useLogin = (options: Omit<UseMutationOptions<LoginResponse, Error, ILoginParameters>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, ILoginParameters>({
    mutationFn: (params: ILoginParameters) => api<LoginResponse>('/auth/login', params, 'POST'),
    ...options,
  })
}

const useRegister = (options: Omit<UseMutationOptions<LoginResponse, Error, IRegisterParameters>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, IRegisterParameters>({
    mutationFn: (params: IRegisterParameters) => api<LoginResponse>('/users', params, 'POST'),
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
