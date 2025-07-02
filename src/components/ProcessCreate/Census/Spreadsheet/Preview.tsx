import { Alert, AlertDescription, AlertIcon, Button, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { DropzoneRootProps } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { LuCheck } from 'react-icons/lu'
import { CensusSpreadsheetManager } from './CensusSpreadsheetManager'
import { SpreadsheetManager } from './SpreadsheetManager'

type CsvPreviewProps = {
  manager?: CensusSpreadsheetManager | SpreadsheetManager
  upload: DropzoneRootProps
}

export const CsvPreview = ({ manager, upload }: CsvPreviewProps) => {
  const { t } = useTranslation()

  if (!manager || !manager?.data) return null

  return (
    <Alert status='success' variant='subtle' flexDirection='column' borderRadius='md'>
      <AlertDescription display='flex' flexDirection='column' gap={3}>
        <Flex>
          <AlertIcon as={LuCheck} boxSize={4} />
          <Text size='sm'>
            {t('form.process_create.spreadsheet.preview.success_title', {
              defaultValue: 'File uploaded successfully',
            })}
          </Text>
        </Flex>
        <Text size='sm'>
          {t('form.process_create.spreadsheet.preview.success_description', {
            defaultValue: 'The user will be asked to authenticate with:',
          })}
        </Text>
        <UnorderedList>
          {manager.header.map((field, index) => (
            <ListItem key={index} textTransform='capitalize'>
              {field}
            </ListItem>
          ))}
        </UnorderedList>
        <Button colorScheme='primary' variant='transparent' border='1px solid' flexShrink={0} {...upload}>
          {t('form.process_create.spreadsheet.preview.upload_new_list')}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
