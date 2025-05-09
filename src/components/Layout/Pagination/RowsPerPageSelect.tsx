import { Box, Text } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const rowsPerPageOptions = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
]

const RowsPerPageSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()

  const value =
    rowsPerPageOptions.find((opt) => opt.value === Number(searchParams.get('limit'))) || rowsPerPageOptions[0]

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Text size='sm'>{t('pagination.rows_per_page', 'Rows per page')}</Text>
      <Select
        value={value}
        onChange={(newValue) => {
          searchParams.set('limit', String(newValue?.value))
          setSearchParams(searchParams)
        }}
        options={rowsPerPageOptions}
        isSearchable={false}
        isClearable={false}
        size='sm'
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: '100px',
          }),
        }}
      />
    </Box>
  )
}

export default RowsPerPageSelect
