import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuUpload, LuX } from 'react-icons/lu'
import { ParticipantsCsvManager } from './ParticipantsCsvManager'

export const ImportMembers = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const methods = useForm()

  const onSubmit = ({ spreadsheet }) => {
    const parsedRows = spreadsheet.filedata.map((row: string[]) => {
      return spreadsheet.heading.reduce((acc: Record<string, string>, key: string, index: number) => {
        acc[key] = row[index]
        return acc
      }, {})
    })

    console.log(parsedRows)
  }

  return (
    <>
      <Button ref={btnRef} leftIcon={<Icon as={LuUpload} />} onClick={onOpen}>
        {t('memberbase.importer.button', { defaultValue: 'Import' })}
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='md'>
        <DrawerOverlay />
        <DrawerContent p={1}>
          <IconButton
            aria-label='Close drawer'
            icon={<Icon as={LuX} />}
            position='absolute'
            top='6px'
            right='6px'
            onClick={onClose}
            variant='transparent'
          />
          <DrawerHeader display='flex' flexDirection='column' gap={2}>
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.importer.title', { defaultValue: 'Import Members' })}
            </Heading>
            <Text color='text.subtle' size='sm'>
              {t('memberbase.importer.subtitle', {
                defaultValue: 'Download a template or import your own CSV, XLS, or XLSX file to add members.',
              })}
            </Text>
          </DrawerHeader>

          <DrawerBody display='flex' flexDirection='column' gap={2}>
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.download_template.title', { defaultValue: 'Download Import Template' })}
            </Heading>
            <Text color='text.subtle' size='sm'>
              {t('memberbase.download_template.subtitle', {
                defaultValue:
                  'Download a CSV template with the required columns, then fill it with your member data for import.',
              })}
            </Text>
            <FormProvider {...methods}>
              <Box as='form' id='testing-this' onSubmit={methods.handleSubmit(onSubmit)}>
                <ParticipantsCsvManager />
              </Box>
              <Flex justify='flex-end' gap={2} mt={4}>
                <Button type='button' variant='outline' colorScheme='black' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='black' form='testing-this'>
                  Import
                </Button>
              </Flex>
            </FormProvider>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
