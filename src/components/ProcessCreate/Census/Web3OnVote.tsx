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
import { enforceHexPrefix, errorToString, useClient } from '@vocdoni/react-providers'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { RiFileExcel2Line } from 'react-icons/ri'
import { addressTextOverflow, fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
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
      const plain = addresses.map(({ address }: { address: string }) => address.toLowerCase())
      spreadsheet.data.forEach((row) => {
        const [address] = row
        if (!plain.includes(address.toLowerCase())) {
          addresses.push({ address })
        }
      })
      setValue('addresses', addresses)
    } catch (e) {
      setFileErr(errorToString(e))
      console.error('could not load file:', e)
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: Web3CensusSpreadsheetManager.AcceptedTypes.reduce((prev, curr) => ({ ...prev, [curr]: [] }), {}),
  })

  return (
    <>
      <Flex flexDirection={{ base: 'column', xl: 'row' }} gap={5} alignItems='center'>
        <Box flex='1 1 50%' w='100%'>
          <FormControl
            isInvalid={isInvalidFieldMap(errors, 'newAddress')}
            display='flex'
            justifyContent='center'
            gap={2}
          >
            <Box mb={3} w='100%'>
              <Input
                {...register('newAddress')}
                onKeyDown={(e) => {
                  // avoid submitting form on enter
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleAddAddress()
                  }
                }}
                aria-label={t('form.process_create.census.add_new_address')}
              />
              <FormErrorMessage>{fieldMapErrorMessage(errors, 'newAddress')}</FormErrorMessage>
            </Box>
            <Button type='button' variant='onvote-secondary' ml='none' onClick={handleAddAddress}>
              {t('form.process_create.census.add_button')}
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            height={100}
            border='1px solid'
            borderColor='process_create.wallet_addresses_border'
            overflowY='scroll'
            mb={1}
          >
            {fields.map((address, index) => (
              <Flex
                key={address.id}
                justifyContent='start'
                alignItems='center'
                gap={2}
                mx='auto'
                borderBottom='1px solid'
                borderColor='process_create.wallet_addresses_border'
                w='full'
                p={5}
              >
                <Text fontWeight='bold'>{index + 1}</Text>
                <Text>{addressTextOverflow((address as any).address, value)}</Text>

                <IconButton
                  size='xs'
                  type='button'
                  icon={<DeleteIcon />}
                  aria-label={t('form.process_create.census.delete_web3_address', {
                    values: { index: index },
                  })}
                  onClick={() => remove(index)}
                  ml='auto'
                />
              </Flex>
            ))}
          </Flex>
          <Text color='process_create.description' fontSize='sm' mb={1}>
            {t('form.process_create.web3.your_wallet_is_added')}
          </Text>
          <Flex gap={1}>
            <Trans
              i18nKey='form.process_create.web3.census_members'
              components={{
                span: <Text as='span' fontWeight='bold' />,
                text: <Text />,
              }}
              count={fields.length}
            />
          </Flex>
        </Box>

        <FormControl isInvalid={!!fileErr} flex='1 1 50%'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={5}
            p={10}
            border='1px dotted'
            borderColor='process_create.census.drag_and_drop_border'
            bgColor='process_create.bg'
            mt={6}
            cursor='pointer'
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon as={RiFileExcel2Line} boxSize={20} color='process_create.spreadsheet.file' />
            <Box>
              {isDragActive ? (
                <Text textAlign='center' color='process_create.description'>
                  {t('uploader.drop_here')}
                </Text>
              ) : (
                <Trans
                  i18nKey='uploader.click_or_drag_and_drop'
                  components={{
                    p1: <Text textAlign='center' color='process_create.description' />,
                    p2: <Text textAlign='center' fontSize='sm' color='process_create.description' />,
                  }}
                />
              )}
            </Box>
          </Flex>
          <FormErrorMessage>{fileErr}</FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  )
}
