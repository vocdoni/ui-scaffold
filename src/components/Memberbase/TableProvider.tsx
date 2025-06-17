import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type TableColumn = {
  id: string
  label: string
  visible?: boolean
}

type TableProviderProps = {
  data?: any[]
  isLoading?: boolean
  isFetching?: boolean
  initialColumns: TableColumn[]
  children: ReactNode
}

type SelectedRow = {
  id: string
  name: string
  surname: string
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
  const [selectedRows, setSelectedRows] = useState<SelectedRow[]>([])
  const [columns, setColumnsState] = useState<TableColumn[]>(() => {
    try {
      const savedVisibleColumns = localStorage.getItem(STORAGE_KEY)
      const visibleIds = savedVisibleColumns ? new Set<string>(JSON.parse(savedVisibleColumns)) : null

      return initialColumns.map((column) => ({
        ...column,
        visible: visibleIds !== null ? visibleIds.has(column.id) : column.visible !== false,
      }))
    } catch (e) {
      console.warn('Error reading column visibility from localStorage:', e)
      return initialColumns.map((column) => ({
        ...column,
        visible: column.visible !== false,
      }))
    }
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

  const isSelected = (id: string) => selectedRows.some((row) => row.id === id)

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const newSelections = filteredData
        .filter((item) => !isSelected(item.id))
        .map((item) => ({ id: item.id, name: item.name, surname: item.surname }))
      setSelectedRows((prev) => [...prev, ...newSelections])
    } else {
      const filteredIds = new Set(filteredData.map((item) => item.id))
      setSelectedRows((prev) => prev.filter((row) => !filteredIds.has(row.id)))
    }
  }

  const toggleOne = (id: string, checked: boolean) => {
    if (checked) {
      const item = data.find((i) => i.id === id)
      if (item) {
        setSelectedRows((prev) => [...prev, { id: item.id, name: item.name, surname: item.surname }])
      }
    } else {
      setSelectedRows((prev) => prev.filter((row) => row.id !== id))
    }
  }

  const resetSelectedRows = () => setSelectedRows([])

  const allVisibleSelected = filteredData.every((item) => isSelected(item.id))
  const someSelected = filteredData.some((item) => isSelected(item.id))

  return (
    <TableContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
        isFetching,
        selectedRows,
        allVisibleSelected,
        someSelected,
        resetSelectedRows,
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
