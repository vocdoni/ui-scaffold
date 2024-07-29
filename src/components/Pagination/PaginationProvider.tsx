import { createContext, PropsWithChildren, useContext, useState } from 'react'

export type PaginationContextProps = {
  page: number
  setPage: (page: number) => void
  totalPages: number
}

export type RoutedPaginationContextProps = Omit<PaginationContextProps, 'setPage' | 'page'> & {
  path: string
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)
const RoutedPaginationContext = createContext<RoutedPaginationContextProps | undefined>(undefined)

export const usePagination = (): PaginationContextProps => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }
  return context
}

export const useRoutedPagination = (): RoutedPaginationContextProps => {
  const context = useContext(RoutedPaginationContext)
  if (!context) {
    throw new Error('useRoutedPagination must be used within a RoutedPaginationProvider')
  }
  return context
}

export type PaginationProviderProps = Pick<PaginationContextProps, 'totalPages'>

export type RoutedPaginationProviderProps = PaginationProviderProps & {
  path: string
}

export const RoutedPaginationProvider = ({
  totalPages,
  path,
  ...rest
}: PropsWithChildren<RoutedPaginationProviderProps>) => {
  return <RoutedPaginationContext.Provider value={{ totalPages, path }} {...rest} />
}

export const PaginationProvider = ({ totalPages, ...rest }: PropsWithChildren<PaginationProviderProps>) => {
  const [page, setPage] = useState<number>(0)

  return <PaginationContext.Provider value={{ page, setPage, totalPages }} {...rest} />
}
