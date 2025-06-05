import { createContext, useContext, useMemo, useState } from 'react'

const TableContext = createContext(undefined)

export function TableProvider({ data = [], isLoading = false, initialColumns, children }) {
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [columns, setColumns] = useState(initialColumns)

  const filteredData = useMemo(() => {
    const lowerFilter = search.toLowerCase()
    return data.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(lowerFilter)))
  }, [data, search])

  const allVisibleSelected = filteredData.every((item) =>
    selectedRows.some((selected) => selected === item.participantNo)
  )
  const someSelected = filteredData.some((item) => selectedRows.some((selected) => selected === item.participantNo))

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const unique = [
        ...selectedRows,
        ...filteredData
          .filter((item) => !selectedRows.some((selectedId) => selectedId === item.participantNo))
          .map((item) => item.participantNo),
      ]
      setSelectedRows(unique)
    } else {
      const filteredIds = filteredData.map((item) => item.participantNo)
      setSelectedRows((prev) => prev.filter((p) => !filteredIds.includes(p)))
    }
  }

  const toggleOne = (id, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((p) => p !== id)))
  }

  const isSelected = (id) => {
    return selectedRows.some((selected) => selected === id)
  }

  return (
    <TableContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
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
