type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

export enum ApiEndpoints {
  LOGIN = 'auth/login',
  REGISTER = 'users',
  ACCOUNT_CREATE = 'organizations',
}

interface IApiError {
  error: string
  code: number
}

export class ApiError extends Error {
  public response: Response
  public apiError: IApiError

  constructor(apiError?: IApiError, response?: Response) {
    super(apiError?.error ? apiError.error : 'undefined api error')
    this.response = response
    this.apiError = apiError
  }
}

export const api = <T>(path: ApiEndpoints, params?: unknown, method: MethodTypes = 'GET'): Promise<T> => {
  return fetch(`${import.meta.env.SAAS_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = (await response.json()) as IApiError
        throw new ApiError(error, response)
      }
      return (await response.json()) as T
    })
    .catch((error: Error) => {
      throw error
    })
}
