import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { RiFileExcel2Line } from 'react-icons/ri'
import { addressTextOverflow, fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { Web3CensusSpreadsheetManager } from './Spreadsheet/Web3CensusSpreadsheetManager'

export const CensusWeb3Addresses = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const { bgSecondary } = useDarkMode()
  const [fileErr, setFileErr] = useState<string | null>(null)
  const isSaas = import.meta.env.SAAS_URL

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
            <Button
              variant='outline'
              colorScheme={isSaas && 'whiteAlpha'}
              type='button'
              ml='none'
              onClick={handleAddAddress}
            >
              {t('form.process_create.census.add_button')}
            </Button>
          </FormControl>

          <Flex
            flexDirection='column'
            minH='220px'
            overflowY='scroll'
            border='1px solid black'
            borderRadius={isSaas ? 'xl' : 'lg'}
            bgColor={isSaas ? bgSecondary : 'white'}
            my={6}
          >
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
                      <FormLabel fontSize='xs' m={0} ml={3} right={0} mb={0} pb={0}>
                        {t('form.process_create.census.weight')}
                      </FormLabel>
                    </FormControl>
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
          </Flex>
          <Text color='process_create.description' fontSize='sm' mb={1}>
            {t('form.process_create.web3.your_wallet_is_added')}
          </Text>
          <Flex gap={1} justifyContent='center'>
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
                mx='auto'
              >
                <Flex gap={1}>
                  <Icon as={BiCheckDouble} />
                  <Text mb={1}>
                    <Trans i18nKey='form.process_create.weighted'>Weighted vote</Trans>
                  </Text>
                </Flex>
                <Text>{t('form.process_create.spreadsheet.requirements.list_three')}</Text>
              </Checkbox>
            )}
          />
          <FormControl isInvalid={!!fileErr}>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={5}
              p={10}
              border='1px dotted'
              borderColor='process_create.census.drag_and_drop_border'
              bgColor='process_create.bg'
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
      </Flex>
    </>
  )
}
