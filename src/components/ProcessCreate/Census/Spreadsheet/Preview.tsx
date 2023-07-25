import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SpreadsheetManager } from './spreadsheet-manager'

export const CsvPreview = ({ manager }: { manager?: SpreadsheetManager }) => {
  const { t } = useTranslation()
  if (!manager?.data) return null

  return (
    <Box>
      <Text>{manager.file.name}</Text>
      <Text>{t('form.process_create.spreadsheet_total_rows', { count: manager.data.length })}</Text>
      {manager.header.map((field) => (
        <FormControl key={field}>
          <FormLabel>{field}</FormLabel>
          <Input disabled />
        </FormControl>
      ))}
    </Box>
  )
}
