import { createContext, useContext, useMemo, useState } from 'react'

const TableContext = createContext(undefined)

export function TableProvider({ data = [], isLoading = false, columns: initialColumns, children }) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [columns, setColumns] = useState(initialColumns)

  const filteredData = useMemo(() => {
    const lowerFilter = globalFilter.toLowerCase()
    return data.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(lowerFilter)))
  }, [data, globalFilter])

  const allVisibleSelected = filteredData.every((item) => selectedRows.some((selected) => selected.id === item.id))
  const someSelected = filteredData.some((item) => selectedRows.some((selected) => selected.id === item.id))

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const unique = [
        ...selectedRows,
        ...filteredData.filter((item) => !selectedRows.some((selected) => selected.id === item.id)),
      ]
      setSelectedRows(unique)
    } else {
      const filteredIds = filteredData.map((item) => item.id)
      setSelectedRows((prev) => prev.filter((p) => !filteredIds.includes(p.id)))
    }
  }

  const toggleOne = (item, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, item] : prev.filter((p) => p.id !== item.id)))
  }

  return (
    <TableContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
        globalFilter,
        setGlobalFilter,
        selectedRows,
        setSelectedRows,
        allVisibleSelected,
        someSelected,
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
