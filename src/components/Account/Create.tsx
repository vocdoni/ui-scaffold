import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { Account } from '@vocdoni/sdk'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useFaucet } from '~components/Faucet/use-faucet'
import { ucfirst } from '~constants/strings'
import { Check, Close } from '~theme/icons'
import { useAccountHealthTools } from './use-account-health-tools'
import hello from '/shared/hello.jpeg'

interface FormFields {
  name: string
  description: string
}

export const AccountCreate = () => {
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
  const {
    createAccount,
    updateAccount,
    errors: { account: error },
  } = useClient()
  const { t } = useTranslation()
  const [sent, setSent] = useState<boolean>(false)
  const { getAuthTypes } = useFaucet()
  const [faucetAmount, setFaucetAmount] = useState<number>(0)
  // we want to know if account exists, not the organization (slight difference)
  const { exists } = useAccountHealthTools()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        if (atypes.auth.oauth) {
          setFaucetAmount(atypes.auth.oauth)
        }
      } catch (e) {
        setFaucetAmount(NaN)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      gap={6}
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      <Text>
        <Trans
          i18nKey='new_organization.description1'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        />
      </Text>
      <Text>
        <Trans
          i18nKey='new_organization.description2'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
          values={{ faucetAmount }}
        />
      </Text>
      <Box px={{ base: 5, md: 10 }} pt={5} pb={10}>
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
  const { isConnected, address } = useAccount()
  const {
    client,
    account,
    createAccount,
    loaded: { account: loaded },
    errors: { create: error },
    connected,
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                  {creating ? <Spinner mt={1} mr={1} width={4} height={4} /> : error ? <Close /> : <Check />}
                  {t('welcome.step.register')}
                </Flex>
                <Flex flexDir='row'>
                  {creating ? <Spinner mt={1} mr={1} width={4} height={4} /> : error ? <Close /> : <Check />}
                  {t('welcome.step.sik')}
                </Flex>
              </Stack>
            </Stack>
            {error && <Text color='error'>{error}</Text>}
          </ModalBody>

          {error && (
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>
                Close
              </Button>
              <Button mr={3} variant='primary' onClick={create} isLoading={creating}>
                Retry
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
