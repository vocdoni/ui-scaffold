type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

export enum ApiEndpoints {
  LOGIN = 'auth/login',
  REFRESH = 'auth/refresh',
  REGISTER = 'users',
  VERIFY = 'users/verify',
  RESEND_VERIFICATION = 'users/verify/code',
  ACCOUNT_CREATE = 'organizations',
}

interface IApiError {
  error: string
  code?: number
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

export class UnverifiedApiError extends ApiError {
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
      const responseText = await response.text()
      // Parse error response
      if (!response.ok) {
        let error: IApiError
        try {
          error = JSON.parse(responseText) as IApiError
        } catch (e) {
          // If parsing fails, use the raw text as the error message
          const sanitized = responseText.replace('\n', '')
          error = { error: sanitized.length ? sanitized : response.statusText }
        }
        // Handle unauthorized error
        if (response.status === 401) {
          if (error?.code === 40014) {
            throw new UnverifiedApiError(error, response)
          }
          throw new UnauthorizedApiError(error, response)
        }

        throw new ApiError(error, response)
      }
      // check if type T is void or undefined, return void
      if ((undefined as T) === undefined) {
        return
      }
      return JSON.parse(responseText) as T
    })
    .catch((error: Error) => {
      throw error
    })
}
