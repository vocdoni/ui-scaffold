import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { ucfirst } from '~constants/strings'
import { Check, Close } from '~theme/icons'
import { useAccountHealthTools } from './use-account-health-tools'
import hello from '/shared/hello.jpeg'
import { CreateAccountParams, useAccountCreate } from '~components/Account/useAccountCreate'

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { create, error } = useAccountCreate()

  const [sent, setSent] = useState<boolean>(false)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = async (values: CreateAccountParams) => {
    return create(values)?.finally(() => setSent(true))
  }

  return (
    <Flex
      as='form'
      id='process-create-form'
      direction='column'
      gap={6}
      {...props}
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      {children}
      <Box px={{ base: 5, md: 10 }} pb={10}>
        <FormControl isInvalid={!!errors.name} mb={5}>
          <FormLabel className='brand-theme' fontWeight='bold' textTransform='uppercase'>
            {t('new_organization.name')}
          </FormLabel>
          <Input
            type='text'
            {...register('name', { required })}
            mb={1}
            placeholder={t('form.account_create.title_placeholder').toString()}
          />
          {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={5}>
          <Textarea
            {...register('description')}
            placeholder={t('form.account_create.description_placeholder').toString()}
          />
        </FormControl>
      </Box>

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
