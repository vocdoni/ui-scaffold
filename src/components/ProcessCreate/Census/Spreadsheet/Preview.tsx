import { Badge, Box, Button, Flex, FormControl, FormLabel, Icon, Input, Text } from '@chakra-ui/react'
import { DropzoneRootProps } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { RiFileExcel2Line } from 'react-icons/ri'
import { CensusSpreadsheetManager } from './CensusSpreadsheetManager'

type CsvPreviewProps = {
  manager?: CensusSpreadsheetManager
  upload: DropzoneRootProps
}

export const CsvPreview = ({ manager, upload }: CsvPreviewProps) => {
  const { t } = useTranslation()

  if (!manager || !manager?.data) return null

  return (
    <Box borderRadius='lg' bgColor='process_create.spreadsheet.preview_bg'>
      <Flex
        alignItems='center'
        flexDirection={{ base: 'column', xl: 'row' }}
        justifyContent='space-between'
        gap={3}
        mb={5}
      >
        <Flex gap={2} flexDirection={{ base: 'column', xl: 'row' }} alignItems='center'>
          <Icon as={RiFileExcel2Line} boxSize={14} color='process_create.spreadsheet.file' />
          <Box>
            <Text fontSize='lg' isTruncated>
              {manager.file.name}
            </Text>
            <Text color='process_create.spreadsheet.total_rows_text'>
              {t('form.process_create.spreadsheet_total_rows', { count: manager.data.length })}
            </Text>
          </Box>
        </Flex>
        <Button colorScheme='primary' variant='transparent' border='1px solid' flexShrink={0} {...upload}>
          {t('form.process_create.spreadsheet.preview.upload_new_list')}
        </Button>
      </Flex>

      <Box bgColor='process_create.spreadsheet.preview_bg_interior' p={5} borderRadius='lg'>
        <Badge>{t('form.process_create.spreadsheet.preview.title')}</Badge>
        <Text my={3}>{t('form.process_create.spreadsheet.preview.description')}</Text>

        <Flex flexDirection='column' gap={3} w={{ base: '70%', md: '50%' }} mx='auto'>
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
