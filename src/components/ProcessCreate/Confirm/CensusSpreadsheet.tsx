import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CensusPreviewRowsLimit } from '~constants'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusSpreadsheet = () => {
  const { t } = useTranslation()
  const {
    form: { spreadsheet },
  } = useProcessCreationSteps()

  const data = useMemo(
    () =>
      spreadsheet!.data.length > CensusPreviewRowsLimit
        ? spreadsheet?.data.slice(0, CensusPreviewRowsLimit)
        : spreadsheet?.data,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spreadsheet?.data]
  )

  if (!spreadsheet || !data) return null

  return (
    <Flex flexDirection='column' gap={1} maxW='100%'>
      <Box overflowX='scroll' maxW='100%'>
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
      <Text color='process_create.description'>
        {t('form.process_create.confirm.census_total_people', { count: spreadsheet.data.length })}
      </Text>
      {data.length !== spreadsheet.data.length && (
        <Text
          color='process_create.description'
          children={t('form.process_create.confirm.census_preview_is_shortened', {
            limit: CensusPreviewRowsLimit,
          })}
        />
      )}
    </Flex>
  )
}

export default PreviewCensusSpreadsheet
