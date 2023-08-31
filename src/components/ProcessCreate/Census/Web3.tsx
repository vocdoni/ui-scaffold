import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { addressTextOverflow, fieldMapErrorMessage, isInvalidFieldMap } from '@constants'
import { enforceHexPrefix, errorToString, useClient } from '@vocdoni/react-providers'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { RiFileExcel2Line } from 'react-icons/ri'
import { CensusSpreadsheetManager } from './Spreadsheet/CensusSpreadsheetManager'
import { Web3CensusSpreadsheetManager } from './Spreadsheet/Web3CensusSpreadsheetManager'

export const CensusWeb3Addresses = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const [fileErr, setFileErr] = useState<string | null>(null)

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    resetField,
    setError,
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    name: 'addresses',
  })

  const addresses = watch('addresses')
  const newAddress = watch('newAddress')

  const [initialized, setInitialized] = useState(!!addresses.length)

  const value = useBreakpointValue({
    base: 6,
    sm: 8,
    md: null,
  })

  useEffect(() => {
    if (account?.address && !initialized && addresses.length === 0) {
      setValue('addresses', [{ address: enforceHexPrefix(account.address) }])
      setInitialized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, addresses, initialized])

  const handleAddAddress = async () => {
    // Trigger form validation
    await trigger()

    const duplicateAddress = addresses.find((add: any) => add.address === newAddress)
    if (duplicateAddress) {
      return setError('newAddress', { type: 'custom', message: t('form.error.address_already_in_use') })
    }

    const pattern = /^(0x)?[0-9a-f]{40}$/i
    if (!pattern.test(newAddress)) {
      return setError('newAddress', { type: 'custom', message: t('form.error.address_pattern') })
    }

    if (!newAddress) {
      return setError('newAddress', { type: 'custom', message: t('form.error.field_is_required') })
    }

    if (!errors.newAddress) {
      // Perform any necessary actions
      setValue('addresses', [...addresses, { address: newAddress }])
      resetField('newAddress')
    }
  }

  // File dropzone
  const onDrop = async ([file]: File[]) => {
    try {
      setFileErr(null)
      // weighted set to false for now, since there's no weight management here yet
      const spreadsheet = new Web3CensusSpreadsheetManager(file, false)
      await spreadsheet.read()
      setValue('addresses', [
        ...addresses,
        ...spreadsheet.data.map(([first, second]) => ({
          address: first,
        })),
      ])
    } catch (e) {
      setFileErr(errorToString(e))
      console.error('could not load file:', e)
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: CensusSpreadsheetManager.AcceptedTypes.reduce((prev, curr) => ({ ...prev, [curr]: [] }), {}),
  })

  return (
    <>
      <FormControl isInvalid={isInvalidFieldMap(errors, 'newAddress')} display='flex' justifyContent='center' gap={2}>
        <Box mb={3}>
          <Input
            {...register('newAddress')}
            w={{ base: 52, sm: 72, md: 100 }}
            onKeyDown={(e) => {
              // avoid submitting form on enter
              if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                handleAddAddress()
              }
            }}
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, 'newAddress')}</FormErrorMessage>
        </Box>
        <Button type='button' ml='none' onClick={handleAddAddress}>
          {t('form.process_create.census.add_button')}
        </Button>
      </FormControl>
      <Flex
        flexDirection='column'
        gap={3}
        maxW={132}
        height={100}
        borderRadius='lg'
        border='1px solid'
        borderColor='process_create.border'
        mx='auto'
        overflowY='scroll'
        bgColor='process_create.census_box_bg'
      >
        {fields.map((address, index) => (
          <Flex
            key={address.id}
            justifyContent='start'
            alignItems='center'
            gap={2}
            mx='auto'
            borderBottom='1px solid'
            borderColor='process_create.border'
            w='full'
            p={5}
          >
            <Text fontWeight='bold'>{index + 1}</Text>
            <Text>{addressTextOverflow((address as any).address, value)}</Text>

            <IconButton
              size='xs'
              type='button'
              icon={<DeleteIcon />}
              aria-label='delete option'
              onClick={() => remove(index)}
              ml='auto'
            />
          </Flex>
        ))}
      </Flex>
      <FormControl isInvalid={!!fileErr}>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={5}
          p={10}
          border='1px dotted lightgray'
          bgColor='white'
          borderRadius='lg'
          mt={6}
          cursor='pointer'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon as={RiFileExcel2Line} boxSize={20} color='process_create.spreadsheet.file' />
          <Box>
            {isDragActive ? (
              <Text textAlign='center' color='process_create.spreadsheet.drag_and_drop_text'>
                {t('uploader.drop_here')}
              </Text>
            ) : (
              <Trans
                i18nKey='uploader.click_or_drag_and_drop'
                components={{
                  p1: <Text textAlign='center' color='process_create.spreadsheet.drag_and_drop_text' />,
                  p2: <Text textAlign='center' fontSize='sm' color='process_create.spreadsheet.drag_and_drop_text' />,
                }}
              />
            )}
          </Box>
        </Flex>
        <FormErrorMessage>{fileErr}</FormErrorMessage>
      </FormControl>
    </>
  )
}
