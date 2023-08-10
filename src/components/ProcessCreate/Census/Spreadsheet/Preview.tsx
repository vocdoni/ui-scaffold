import { Badge, Box, Button, Flex, FormControl, FormLabel, Icon, Input, Text } from '@chakra-ui/react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RiFileExcel2Line } from 'react-icons/ri'
import { SpreadsheetManager } from './spreadsheet-manager'

export const CsvPreview = ({
  manager,
  setValue,
}: {
  manager?: SpreadsheetManager
  setValue: UseFormSetValue<FieldValues>
}) => {
  const { t } = useTranslation()
  if (!manager?.data) return null

  return (
    <Box p={10} borderRadius='lg' bgColor='process_create.spreadsheet.preview_bg'>
      <Flex alignItems='center' gap={3} mb={5}>
        <Icon as={RiFileExcel2Line} boxSize={14} color='process_create.spreadsheet.file' />
        <Box maxW='50%'>
          <Text fontSize='lg' isTruncated>
            {manager.file.name}
          </Text>
          <Text color='process_create.spreadsheet.total_rows_text'>
            {t('form.process_create.spreadsheet_total_rows', { count: manager.data.length })}
          </Text>
        </Box>
        <Button
          colorScheme='primary'
          variant='ghost'
          border='1px solid'
          onClick={() => setValue('spreadsheet', undefined)}
        >
          {t('form.process_create.spreadsheet.preview.upload_new_list')}
        </Button>
      </Flex>

      <Box bgColor='process_create.spreadsheet.preview_bg_interior' p={5} borderRadius='lg'>
        <Badge variant='primary'>{t('form.process_create.spreadsheet.preview.title')}</Badge>
        <Text my={3}>{t('form.process_create.spreadsheet.preview.description')}</Text>

        <Flex flexDirection='column' gap={3} w='50%' mx='auto'>
          {manager.header.map((field) => (
            <FormControl key={field}>
              <FormLabel mb={0} textTransform='capitalize'>
                {field}
              </FormLabel>
              <Input disabled />
            </FormControl>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
