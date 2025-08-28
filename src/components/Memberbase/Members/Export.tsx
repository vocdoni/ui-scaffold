import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuFileDown, LuFileSpreadsheet } from 'react-icons/lu'
import { useTable } from '../TableProvider'

type RadioCardProps = {
  label: string
  value: string
  isSelected: boolean
  onSelect: (value: string) => void
}

export const RadioCard = ({ label, value, isSelected, onSelect }: RadioCardProps) => {
  return (
    <Button
      flex='1'
      onClick={() => onSelect(value)}
      p={4}
      leftIcon={<Icon as={LuFileSpreadsheet} boxSize={4} />}
      colorScheme='black'
      variant={isSelected ? 'solid' : 'outline'}
    >
      {label}
      <input type='radio' value={value} checked={isSelected} onChange={() => {}} style={{ display: 'none' }} />
    </Button>
  )
}

export const ExportMembers = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { columns, selectedRows } = useTable()

  const methods = useForm({
    defaultValues: {
      fileFormat: 'csv',
      exportedColumns: columns.map((col) => col.id),
    },
  })

  const fileFormats = [
    { label: 'CSV', value: 'csv' },
    { label: 'Excel', value: 'xlsx' },
  ]

  const selectedColumnCount =
    useWatch({
      control: methods.control,
      name: 'exportedColumns',
    })?.length || 0

  const onExport = (data) => {
    console.log('Exporting:', {
      members: selectedRows,
      ...data,
    })
    onClose()
  }

  return (
    <>
      <Button leftIcon={<Icon as={LuFileDown} />} variant='outline' onClick={onOpen} disabled={true}>
        {t('memberbase.exporter.button', { defaultValue: 'Export' })}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading variant='header'>{t('memberbase.exporter.title', { defaultValue: 'Export Members' })}</Heading>
            <Text variant='subheader'>
              {t('memberbase.exporter.subtitle', {
                defaultValue: 'Configure your export options. The export will include {{count}} members.',
                count: selectedRows.length,
              })}
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onExport)}>
              <ModalBody display='flex' flexDirection='column' gap={6}>
                <Box>
                  <Text fontWeight='medium' mb={2}>
                    {t('memberbase.exporter.file_format', { defaultValue: 'File Format' })}
                  </Text>
                  <Controller
                    name='fileFormat'
                    control={methods.control}
                    render={({ field }) => (
                      <Flex gap={2}>
                        {fileFormats.map((format) => (
                          <RadioCard
                            key={format.value}
                            label={format.label}
                            value={format.value}
                            isSelected={field.value === format.value}
                            onSelect={field.onChange}
                          />
                        ))}
                      </Flex>
                    )}
                  />
                </Box>
                <Box>
                  <Text fontWeight='medium' mb={2}>
                    {t('memberbase.exporter.columns', { defaultValue: 'Columns to Export' })}
                  </Text>
                  <Box border='1px solid' borderColor='gray.700' borderRadius='md' px={4} py={2}>
                    <Stack spacing={3}>
                      <Controller
                        name='exportedColumns'
                        control={methods.control}
                        render={({ field }) =>
                          columns
                            .filter((col) => col.visible)
                            .map((col) => (
                              <Checkbox
                                key={col.id}
                                value={col.id}
                                isChecked={field.value.includes(col.id)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked
                                  const value = col.id
                                  field.onChange(
                                    isChecked ? [...field.value, value] : field.value.filter((v) => v !== value)
                                  )
                                }}
                                colorScheme='black'
                              >
                                {col.label}
                              </Checkbox>
                            ))
                        }
                      />
                    </Stack>
                  </Box>
                </Box>
              </ModalBody>
              <ModalFooter display='flex' justifyContent='flex-end' gap={2}>
                <Button variant='outline' onClick={onClose}>
                  {t('memberbase.exporter.cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button type='submit' colorScheme='black'>
                  {t('memberbase.exporter.export', {
                    defaultValue: 'Export {{count}} columns',
                    count: selectedColumnCount,
                  })}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
