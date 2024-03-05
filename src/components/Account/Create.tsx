import {
  Alert,
  AlertIcon,
  Box,
  Flex,
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
import { Account, FaucetAPI } from '@vocdoni/sdk'
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
  const [faucetPackage, setFaucetPackage] = useState<string>('')
  // site name, to be used in translations
  let sitename = 'Vocdoni'
  if (import.meta.env.theme !== 'default') {
    sitename = ucfirst(import.meta.env.theme)
  }

  const checkFaucetPackage = useCallback(async () => {
    if (!client.wallet) return ''
    if (faucetPackage) return faucetPackage
    const address = await client.wallet.getAddress()
    const fPackage = await FaucetAPI.collect(client.faucetService.url, address)
    setFaucetPackage(fPackage.faucetPackage)
    return fPackage.faucetPackage
  }, [creating, client.wallet, isConnected, exists, account, faucetPackage])

  // create account logic (used both in effect and retry button)
  const create = useCallback(async () => {
    if (creating) return

    setCreating(true)
    const fPackage = await checkFaucetPackage()

    if (fPackage) await createAccount({ faucetPackage: fPackage })
    else await createAccount()
    setCreating(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, client.wallet, isConnected, exists, account, faucetPackage])

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
          <ModalBody color='modal_description'>
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
              <Button mr={3} variant='primary' onClick={create} isLoading={creating}>
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
