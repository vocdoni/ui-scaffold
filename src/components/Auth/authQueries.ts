import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { api, ApiEndpoints } from '~components/Auth/api'

export type LoginResponse = { token: string; expirity: string }

export interface ILoginParams {
  email: string
  password: string
}

export interface IRegisterParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IVerifyParams {
  email: string
  code: string
}

export const useLogin = (options: Omit<UseMutationOptions<LoginResponse, Error, ILoginParams>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, ILoginParams>({
    mutationFn: (params: ILoginParams) => api<LoginResponse>(ApiEndpoints.LOGIN, { body: params, method: 'POST' }),
    ...options,
  })
}

export const useRegister = (options: Omit<UseMutationOptions<LoginResponse, Error, IRegisterParams>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, IRegisterParams>({
    mutationFn: (params: IRegisterParams) =>
      api<LoginResponse>(ApiEndpoints.REGISTER, { body: params, method: 'POST' }),
    ...options,
  })
}

export const useVerifyMail = (options: Omit<UseMutationOptions<LoginResponse, Error, IVerifyParams>, 'mutationFn'>) => {
  return useMutation<LoginResponse, Error, IVerifyParams>({
    mutationFn: (params: IVerifyParams) => api<LoginResponse>(ApiEndpoints.VERIFY, { body: params, method: 'POST' }),
    ...options,
  })
}
