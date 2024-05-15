import { Button, ButtonGroup } from '@chakra-ui/react'
import { ReactElement, useMemo } from 'react'
import { generatePath, Link as RouterLink, useParams } from 'react-router-dom'
import { usePagination, useRoutedPagination } from './PaginationProvider'

export const Pagination = () => {
  const { page, setPage, totalPages } = usePagination()

  const pages: ReactElement[] = useMemo(() => {
    const pages: ReactElement[] = []
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Button key={i} onClick={() => setPage(i)} isActive={page === i}>
          {i + 1}
        </Button>
      )
    }
    return pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages])

  return <ButtonGroup isAttached>{pages.map((page) => page)}</ButtonGroup>
}

export const RoutedPagination = () => {
  const { path, totalPages } = useRoutedPagination()
  const { page }: { page?: number } = useParams()

  const p = Number(page) || 0

  const pages: ReactElement[] = useMemo(() => {
    const pages: ReactElement[] = []
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Button as={RouterLink} key={i} to={generatePath(path, { page: i })} isActive={p === i}>
          {i + 1}
        </Button>
      )
    }
    return pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, totalPages])

  return <ButtonGroup isAttached>{pages.map((page) => page)}</ButtonGroup>
}
