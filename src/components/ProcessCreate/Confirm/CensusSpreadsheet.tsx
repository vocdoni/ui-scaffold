import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'

const RowsLimit = 10

const PreviewCensusSpreadsheet = () => {
  const { t } = useTranslation()
  const {
    form: { spreadsheet },
  } = useProcessCreationSteps()
  const overflow = useBreakpointValue({
    base: 12,
    sm: null,
  })

  if (!spreadsheet) return
  const data = useMemo(
    () => (spreadsheet.data.length > RowsLimit ? spreadsheet.data.slice(0, RowsLimit) : spreadsheet.data),
    [spreadsheet.data]
  )

  return (
    <Flex flexDirection='column' gap={1}>
      <Box>
        <Table variant='striped' colorScheme='blackAlpha' fontSize='xs' size='sm'>
          <Thead>
            <Tr>
              {spreadsheet.header.map((h) => (
                <Th key={h}>{h}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, r) => (
              <Tr key={r}>
                {row.map((field) => (
                  <Td key={field}>{field}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Text color='process_create.preview.census_web3_text_helper'>
        {t('form.process_create.confirm.census_total_people', { count: spreadsheet.data.length })}
      </Text>
      {data.length !== spreadsheet.data.length && (
        <Text
          color='process_create.preview.census_web3_text_helper'
          children={t('form.process_create.confirm.census_preview_is_shortened', {
            limit: RowsLimit,
          })}
        />
      )}
    </Flex>
  )
}

export default PreviewCensusSpreadsheet
