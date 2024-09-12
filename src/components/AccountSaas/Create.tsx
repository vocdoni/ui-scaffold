import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { ucfirst } from '~constants/strings'
import { Check, Close } from '~theme/icons'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import hello from '/shared/hello.jpeg'

interface FormFields {
  name: string
  description: string
}

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      website: '',
      description: '',
      membership_size: 0,
      type: '',
      country: '',
      communications: false,
      terms: false,
    },
  })
  const {
    createAccount,
    updateAccount,
    errors: { account: error },
    loading: { create },
  } = useClient()
  const { t } = useTranslation()
  const [sent, setSent] = useState<boolean>(false)
  // we want to know if account exists, not the organization (slight difference)
  const { exists } = useAccountHealthTools()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = async (values: FormFields) => {
    let call = () =>
      createAccount({
        account: new Account(values),
      })

    if (exists) {
      call = () => updateAccount(new Account(values))
    }

    return call()?.finally(() => setSent(true))
  }

  return (
    <Flex
      as='form'
      id='process-create-form'
      direction='column'
      {...props}
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      {children}
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='24px'>
          <Trans i18nKey='create_org.title'>Create Your Organization</Trans>
        </Heading>
      </Box>
      <Text color={textColor} fontWeight='bold' mb='24px'>
        <Trans i18nKey='create_org.public_info'>Public Organization Information</Trans>
      </Text>
      <Box px={{ base: 5, md: 10 }}>
        <FormControl isInvalid={!!errors.name} mb='24px'>
          <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            {t('new_organization.name')}
            <Text color={textColorBrand}>*</Text>
          </FormLabel>
          <Input
            type='text'
            {...register('name', { required })}
            placeholder={t('form.account_create.title_placeholder').toString()}
            variant='auth'
            size='lg'
          />
          {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            <Trans i18nKey='website'>Website</Trans>
          </FormLabel>
          <Input
            type='text'
            {...register('website')}
            placeholder={'https://example.com'}
            variant='auth'
            mb='24px'
            size='lg'
          />
          {!!errors.website && <FormErrorMessage>{errors.website?.message?.toString()}</FormErrorMessage>}
        </FormControl>
        <FormControl mb='32px'>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor}>
            <Trans i18nKey='description'>Description</Trans>
          </FormLabel>
          <Textarea
            {...register('description')}
            placeholder={t('form.account_create.description_placeholder').toString()}
            _focus={{
              boxShadow: 'none',

              _hover: {
                boxShadow: 'none',
              },
            }}
          />
        </FormControl>
      </Box>
      <Text color={textColor} fontWeight='bold' mb='0px'>
        <Trans i18nKey='create_org.private_org'>Private Organization Details</Trans>
      </Text>
      <Text color={textColorSecondary} mb='24px' fontSize='sm'>
        <Trans i18nKey='create_org.private_org_description'>
          Help us tailor your experience with information about your org. We won't share this info
        </Trans>
      </Text>
      <Box px={{ base: 5, md: 10 }}>
        <FormControl isInvalid={!!errors.membership_size} mb='24px'>
          <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            <Trans i18nKey='create_org.membership_size'>Membership size</Trans>
          </FormLabel>
          <Select
            {...register('membership_size', { required })}
            fontSize='sm'
            ms={{ base: '0px', md: '0px' }}
            fontWeight='500'
            size='lg'
            borderRadius='xl'
          ></Select>
          <FormErrorMessage>{errors.membership_size?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.type} mb='24px'>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            <Trans i18nKey='create_org.type_sector'>Type / Sector</Trans>
          </FormLabel>

          <Select
            {...register('type', { required })}
            fontSize='sm'
            ms={{ base: '0px', md: '0px' }}
            fontWeight='500'
            size='lg'
            borderRadius='xl'
          ></Select>
          <FormErrorMessage>{errors.type?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.country} mb='32px'>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            <Trans i18nKey='country'>Country</Trans>
          </FormLabel>

          <Select
            {...register('country', { required })}
            fontSize='sm'
            ms={{ base: '0px', md: '0px' }}
            fontWeight='500'
            size='lg'
            borderRadius='xl'
          />
          <FormErrorMessage>{errors.country?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>
      <FormControl display='flex' alignItems='start' mb='12px'>
        <Checkbox {...register('communications')} colorScheme='brandScheme' me='10px' mt='4px' />
        <FormLabel mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
          <Trans i18nKey='create_org.communication'>
            I want to receive communications and be contacted to tailor my governance experience.
          </Trans>
        </FormLabel>
      </FormControl>
      <FormControl isInvalid={!!errors.terms} mb='32px'>
        <Flex alignItems='start'>
          <Checkbox {...register('terms', { required })} colorScheme='brandScheme' me='10px' mt='4px' />
          <FormLabel mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
            <Trans
              i18nKey='signup_agree_terms'
              components={{
                termsLink: <Link as={ReactRouterLink} to='/terms' />,
                privacyLink: <Link as={ReactRouterLink} to='/privacy' />,
              }}
            />
          </FormLabel>
        </Flex>
        <FormErrorMessage>{errors.terms?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <Button form='process-create-form' type='submit' isLoading={create} mx='auto' mb='32px' w='80%'>
        {t('organization.create_org')}
      </Button>
      <Text color={textColorSecondary} fontSize='sm'>
        <Trans i18nKey='create_org.already_profile'>
          If your organization already have a profile, ask the admin to invite you to your organization.
        </Trans>
      </Text>

      {sent && error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Flex>
  )
}

export const BasicAccountCreation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isConnected } = useAccount()
  const {
    client,
    account,
    createAccount,
    loaded: { fetch: loaded },
    errors: { create: error },
  } = useClient()
  const { exists } = useAccountHealthTools()
  const { t } = useTranslation()
  const [creating, setCreating] = useState<boolean>(false)

  // site name, to be used in translations
  let sitename = 'Vocdoni'
  if (import.meta.env.theme !== 'default') {
    sitename = ucfirst(import.meta.env.theme)
  }

  // create account logic (used both in effect and retry button)
  const create = useCallback(async () => {
    if (creating) return

    setCreating(true)
    await createAccount()
    setCreating(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, client.wallet, isConnected, exists, account])

  // open modal and init create for the first time
  useEffect(() => {
    if (!isConnected || (isConnected && exists) || !client.wallet || creating || !loaded) return
    ;(async () => {
      onOpen()
      create()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, exists, account, client.wallet, loaded])

  // close modal after successfully creating account
  useEffect(() => {
    if (!isConnected || !exists || !isOpen || !account) return
    onClose()
  }, [isConnected, exists, account, isOpen, onClose])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!!error} closeOnOverlayClick={!!error}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('welcome.title', { sitename })}</ModalHeader>
          {!!error && <ModalCloseButton />}
          <ModalBody>
            <Box
              className='welcome-modal'
              bgImage={hello}
              bgRepeat='no-repeat'
              bgPosition='top center'
              bgSize='100%'
              mb={5}
              borderRadius='10px'
              boxShadow='3px 3px 20px lightgray'
              height='150px'
            />
            <Stack gap={4}>
              <Text>{t('welcome.intro', { sitename })}</Text>
              <Text>{t('welcome.description', { sitename })}</Text>
              <Stack mt={4}>
                <Flex flexDir='row'>
                  <StateIcon creating={creating} error={error} />
                  {t('welcome.step.register')}
                </Flex>
                <Flex flexDir='row'>
                  <StateIcon creating={creating} error={error} />
                  {t('welcome.step.sik')}
                </Flex>
              </Stack>
              {error && <Text color='error'>{error}</Text>}
            </Stack>
          </ModalBody>

          {error && (
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>
                {t('close')}
              </Button>
              <Button mr={3} onClick={create} isLoading={creating}>
                {t('retry')}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const StateIcon = ({ creating, error }: { creating: boolean; error: string | null }) => {
  const style = {
    alignSelf: 'center',
    mr: 1,
    width: 4,
    height: 4,
  }

  if (creating) {
    return <Spinner {...style} />
  }

  if (error) {
    return <Icon as={Close} {...style} />
  }

  return <Icon as={Check} {...style} />
}
