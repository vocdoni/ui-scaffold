import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  Checkbox,
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
import { ChangeEvent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import UploaderCustom from '~components/Layout/UpLoaderCustom'
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
    control,
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    name: 'addresses',
  })

  const addresses = watch('addresses')
  const newAddress = watch('newAddress')
  const weighted: boolean = watch('weightedVote')

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
      const naddresses = [...addresses, { address: newAddress }]
      setValue('addresses', naddresses)
      resetField('newAddress')
    }
  }

  // File dropzone
  const onDrop = async ([file]: File[]) => {
    try {
      setFileErr(null)
      // weighted set to false for now, since there's no weight management here yet
      const spreadsheet = new Web3CensusSpreadsheetManager(file, weighted)
      await spreadsheet.read()
      const plain = addresses.map(({ address }: { address: string }) => address.toLowerCase())
      spreadsheet.data.forEach((row, k) => {
        const [address] = row
        if (!plain.includes(address.toLowerCase())) {
          addresses.push({
            address: spreadsheet.data[k][0],
            weight: spreadsheet.weights[k],
          })
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
      <Flex
        flexDirection={{ base: 'column', xl: 'row' }}
        gap={10}
        textAlign='center'
        alignItems={{ base: 'center', xl: 'start' }}
      >
        <Box flex={{ lg: '0 0 620px' }}>
          <FormControl
            isInvalid={isInvalidFieldMap(errors, 'newAddress')}
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={2}
            flexDirection={{ base: 'column', lg: 'row' }}
          >
            <Box w='100%'>
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
                placeholder={'0x000...000'}
              />
              <FormErrorMessage>{fieldMapErrorMessage(errors, 'newAddress')}</FormErrorMessage>
            </Box>
            <Button variant='outline' type='button' ml='none' onClick={handleAddAddress}>
              {t('form.process_create.census.add_button')}
            </Button>
          </FormControl>

          <Card variant='web3-addresses'>
            {fields.map((address, index) => (
              <Flex
                key={address.id}
                justifyContent='space-between'
                alignItems='center'
                gap={2}
                mx='auto'
                borderBottom='1px solid'
                borderColor='process_create.wallet_addresses_border'
                w='full'
                p={5}
                flexDirection={{ base: 'column', sm: 'row' }}
              >
                <Flex direction={'row'} gap={2} justifyContent='start' alignItems='center'>
                  <Text fontWeight='bold'>{index + 1}</Text>
                  <Text>{addressTextOverflow((address as any).address, value)}</Text>
                </Flex>
                <Flex direction={'row'} gap={2} justifyContent='start' alignItems='center'>
                  {weighted && (
                    <FormControl display='flex' alignItems='center'>
                      <Input
                        {...register(`addresses.${index}.weight` as const)}
                        type='number'
                        min={0}
                        defaultValue={1}
                        size='sm'
                        w={20}
                        ml={3}
                        maxH='2px'
                        p={3}
                      />
                    </FormControl>
                  )}
                  {weighted && (
                    <Text fontWeight='bold' fontSize='xs' m='0 !important' ml={3} right={0} p={0}>
                      {t('form.process_create.census.weight')}
                    </Text>
                  )}
                  <IconButton
                    size='xs'
                    variant='transparent'
                    type='button'
                    icon={<DeleteIcon />}
                    aria-label={t('form.process_create.census.delete_web3_address', {
                      values: { index: index },
                    })}
                    onClick={() => remove(index)}
                    ml='auto'
                  />
                </Flex>
              </Flex>
            ))}
          </Card>
          <Text variant='process-create-subtitle-sm'>{t('form.process_create.web3.your_wallet_is_added')}</Text>
          <Flex gap={1} justifyContent='center'>
            <Trans
              i18nKey='form.process_create.web3.census_members'
              components={{
                span: <Text as='span' fontWeight='bold' variant='process-create-subtitle-sm' />,
                text: <Text variant='process-create-subtitle-sm' />,
              }}
              count={fields.length}
            />
          </Flex>
        </Box>
        <Flex flexDirection='column' alignItems='start' gap={6}>
          <Controller
            control={control}
            name='weightedVote'
            defaultValue={weighted}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Checkbox
                onChange={(event: ChangeEvent<HTMLInputElement>) => setValue('weightedVote', event.target.checked)}
                onBlur={onBlur}
                ref={ref}
                isChecked={value}
                variant={'radiobox'}
              >
                <Flex>
                  <Icon as={BiCheckDouble} />
                  <Text>
                    <Trans i18nKey='form.process_create.weighted'>Weighted vote</Trans>
                  </Text>
                </Flex>
                <Text>{t('form.process_create.spreadsheet.requirements.list_three')}</Text>
              </Checkbox>
            )}
          />
          <FormControl isInvalid={!!fileErr}>
            <UploaderCustom getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />
            <FormErrorMessage>{fileErr}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </>
  )
}
