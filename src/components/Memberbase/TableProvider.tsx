import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type TableColumn = {
  id: string
  label: string
  visible: boolean
}

type TableProviderProps = {
  data?: any[]
  isLoading?: boolean
  isFetching?: boolean
  initialColumns: TableColumn[]
  children: ReactNode
}

const TableContext = createContext(undefined)

const STORAGE_KEY = 'table_columns_visibility'

export function TableProvider({
  data = [],
  isLoading = false,
  isFetching = false,
  initialColumns,
  children,
}: TableProviderProps) {
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [columns, setColumnsState] = useState<TableColumn[]>(() => {
    try {
      const savedVisibleColumns = localStorage.getItem(STORAGE_KEY)
      if (savedVisibleColumns) {
        const visibleIds = new Set<string>(JSON.parse(savedVisibleColumns))
        return initialColumns.map((column) => ({
          ...column,
          visible: visibleIds.has(column.id),
        }))
      }
    } catch (e) {
      console.warn('Error reading column visibility from localStorage:', e)
    }
    return initialColumns
  })

  const setColumns = (updatedColumns: TableColumn[]) => {
    const visibleIds = updatedColumns.filter((column) => column.visible).map((column) => column.id)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleIds))
    } catch (e) {
      console.warn('Error saving column visibility to localStorage:', e)
    }
    setColumnsState(updatedColumns)
  }

  const filteredData = useMemo(() => {
    const lowerFilter = search.toLowerCase()
    return data.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(lowerFilter)))
  }, [data, search])

  const allVisibleSelected = filteredData.every((item) => selectedRows.includes(item.id))
  const someSelected = filteredData.some((item) => selectedRows.includes(item.id))

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const unique = [
        ...selectedRows,
        ...filteredData.filter((item) => !selectedRows.includes(item.id)).map((item) => item.id),
      ]
      setSelectedRows(unique)
    } else {
      const filteredIds = filteredData.map((item) => item.id)
      setSelectedRows((prev) => prev.filter((p) => !filteredIds.includes(p)))
    }
  }

  const toggleOne = (id: string, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((p) => p !== id)))
  }

  const isSelected = (id: string) => selectedRows.includes(id)

  return (
    <TableContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
        isFetching,
        search,
        setSearch,
        selectedRows,
        setSelectedRows,
        allVisibleSelected,
        someSelected,
        isSelected,
        toggleAll,
        toggleOne,
        columns,
        setColumns,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }
  return context
}
