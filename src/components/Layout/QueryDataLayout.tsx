import ErrorComponent from '~components/Layout/ErrorComponent'
import { PropsWithChildren } from 'react'
import { Loading } from '~src/router/SuspenseLoader'

interface IUserQueryLayout {
  isLoading: boolean
  isEmpty?: boolean
  isError: boolean
  error?: Error
}

const QueryDataLayout = ({ isLoading, isEmpty, isError, error, children }: IUserQueryLayout & PropsWithChildren) => {
  if (isLoading) {
    return <Loading minHeight={1} />
  }
  if (isError) {
    return <ErrorComponent error={error} />
  }
  if (isEmpty) {
    return null
  }
  return <>{children}</>
}

export default QueryDataLayout