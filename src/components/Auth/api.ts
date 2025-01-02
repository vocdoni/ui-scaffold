type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

export enum ApiEndpoints {
  InviteAccept = 'organizations/{address}/members/accept',
  Login = 'auth/login',
  Me = 'users/me',
  Organization = 'organizations/{address}',
  OrganizationMembers = 'organizations/{address}/members',
  OrganizationPendingMembers = 'organizations/{address}/members/pending',
  Organizations = 'organizations',
  OrganizationsRoles = 'organizations/roles',
  OrganizationSubscription = 'organizations/{address}/subscription',
  Password = 'users/password',
  PasswordRecovery = 'users/password/recovery',
  PasswordReset = 'users/password/reset',
  Plans = 'plans',
  Refresh = 'auth/refresh',
  Register = 'users',
  SubscriptionCheckout = 'subscriptions/checkout',
  SubscriptionPortal = 'subscriptions/{address}/portal',
  Verify = 'users/verify',
  VerifyCode = 'users/verify/code',
  Storage = 'storage',
}

export enum ErrorCode {
  // HTTP errors
  Unauthorized = 401,
  // Custom API errors
  MalformedJSONBody = 40004,
  UserNotAuthorized = 40001,
  UserNotVerified = 40014,
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
  path: string,
  { body, method = 'GET', headers = new Headers({}) }: ApiParams = {}
): Promise<T> => {
  const isFormData = typeof body === 'object' && body instanceof FormData
  // Append headers when not present
  if (!headers.has('Content-Type') && !isFormData) {
    headers.append('Content-Type', 'application/json')
  }
  // Format body if it's an object (and not FormData)
  const formatted = isFormData || typeof body === 'string' ? body : JSON.stringify(body)

  return fetch(`${import.meta.env.SAAS_URL}/${path}`, {
    method,
    headers,
    body: formatted,
  })
    .then(async (response) => {
      const sanitized = (await response.text()).replace('\n', '')
      // Parse error response
      if (!response.ok) {
        let error: IApiError
        try {
          error = JSON.parse(sanitized) as IApiError
        } catch (e) {
          // If parsing fails, use the raw text as the error message
          error = { error: sanitized.length ? sanitized : response.statusText }
        }
        // Handle unauthorized error
        if (response.status === ErrorCode.Unauthorized) {
          if (error?.code === ErrorCode.UserNotVerified) {
            throw new UnverifiedApiError(error, response)
          }
          throw new UnauthorizedApiError(error, response)
        }

        throw new ApiError(error, response)
      }
      return sanitized ? (JSON.parse(sanitized) as T) : undefined
    })
    .catch((error: Error | IApiError) => {
      throw error
    })
}
