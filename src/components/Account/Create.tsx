import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useFaucet } from '~components/Faucet/use-faucet'
import anonymous from '/assets/anonymous.png'
import censorship from '/assets/censorship-resistance.png'
import inexpensive from '/assets/inexpensive.png'
import openSource from '/assets/open-source.png'
import scalable from '/assets/scalable.png'
import verificable from '/assets/verificable.png'

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
    errors: { account: error },
  } = useClient()
  const { t } = useTranslation()
  const [sent, setSent] = useState<boolean>(false)
  const { getAuthTypes } = useFaucet()
  const [faucetAmount, setFaucetAmount] = useState<number>(0)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        setFaucetAmount(atypes.oauth)
      } catch (e) {}
    })()
  }, [])

  const onSubmit = async (values: FormFields) => createAccount(new Account(values))?.finally(() => setSent(true))

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
      <Text fontWeight='light'>
        <Trans
          i18nKey='new_organization.description1'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        />
      </Text>
      <Text fontWeight='light'>
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
          <FormLabel fontWeight='bold'>*{t('new_organization.name')}</FormLabel>
          <Input
            type='text'
            {...register('name', { required })}
            mb={1}
            placeholder={t('form.account_create.title_placeholder').toString()}
          />
          {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl>
          <Textarea
            {...register('description')}
            placeholder={t('form.account_create.description_placeholder').toString()}
          />
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.account_create.description_helper')}</Text>
          </FormHelperText>
        </FormControl>
      </Box>
      <Text fontWeight='light'>
        <Trans
          i18nKey='new_organization.footer'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        />
      </Text>
      <Flex fontSize='xs' flexWrap='wrap' justifyContent={{ base: 'center', md: 'start' }} lineHeight={1} gap={5}>
        <VStack>
          <Image src={censorship} alt={t('new_organization.censorship')} boxSize={16} />
          <Text display='flex' flexDirection='column' alignItems='center' gap={1}>
            <Trans
              i18nKey='new_organization.censorship'
              components={{
                span: <Text as='span' />,
              }}
            />
          </Text>
        </VStack>
        <VStack>
          <Image src={openSource} alt={t('new_organization.open_source')} boxSize={16} />
          <Text display='flex' flexDirection='column' alignItems='center' gap={1}>
            <Trans
              i18nKey='new_organization.open_source'
              components={{
                span: <Text as='span' />,
              }}
            />
          </Text>
        </VStack>
        <VStack>
          <Image src={scalable} alt={'new_organization.scalable'} boxSize={16} />
          <Text>{t('new_organization.scalable')}</Text>
        </VStack>
        <VStack>
          <Image src={anonymous} alt={t('new_organization.anonyomus')} boxSize={16} />
          <Text>{t('new_organization.anonyomus')}</Text>
        </VStack>
        <VStack>
          <Image src={verificable} alt={t('new_organization.verificable')} boxSize={16} />
          <Text>{t('new_organization.verificable')}</Text>
        </VStack>
        <VStack>
          <Image src={inexpensive} alt={t('new_organization.inexpensive')} boxSize={16} />
          <Text>{t('new_organization.inexpensive')}</Text>
        </VStack>
      </Flex>
      {sent && error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Flex>
  )
}
