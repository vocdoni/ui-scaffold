type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

export enum ApiEndpoints {
  LOGIN = 'auth/login',
  REFRESH = 'auth/refresh',
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

export class UnauthorizedApiError extends ApiError {
  constructor(apiError?: IApiError, response?: Response) {
    super(apiError, response)
  }
}

export type ApiParams = {
  body?: unknown
  method?: MethodTypes
  headers?: Headers
}

export const api = <T>(
  path: ApiEndpoints,
  { body, method = 'GET', headers = new Headers({}) }: ApiParams
): Promise<T> => {
  headers.append('Content-Type', 'application/json')
  return fetch(`${import.meta.env.SAAS_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = (await response.json()) as IApiError
        if (response.status === 401) {
          throw new UnauthorizedApiError(error, response)
        }
        throw new ApiError(error, response)
      }
      return (await response.json()) as T
    })
    .catch((error: Error) => {
      throw error
    })
}
