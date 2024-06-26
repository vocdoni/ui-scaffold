import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { errorToString, useClient, useOrganization } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import fallback from '/assets/default-avatar.png'

interface EditFormFields {
  name: string
  description: string
  avatar: string
}

const REGEX_AVATAR = /^(https?:\/\/|ipfs:\/\/)/i

export const EditProfile = () => {
  const { account, fetchAccount } = useClient()
  const { update } = useOrganization()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: account?.account.name.default || '',
      description: account?.account.description.default || '',
      avatar: account?.account.avatar || '',
    },
  })

  const avatar = watch('avatar')

  const correctAvatarFormat = (val: string) => REGEX_AVATAR.test(val)

  const onSubmit: SubmitHandler<EditFormFields> = async (values: EditFormFields) => {
    setLoading(true)

    try {
      await update(new Account({ ...account?.account, ...values }))
      fetchAccount()
    } catch (err: any) {
      setError(errorToString(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      as='form'
      onSubmit={(e: any) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      <Flex direction='column' gap={6} my={8}>
        <Flex alignItems='center' gap={5}>
          <Box position='relative' outline='none' border='none'>
            <AspectRatio flexShrink={0} w={{ base: 20, md: 40 }} ratio={1.25 / 1} borderRadius='lg' overflow='hidden'>
              <Image src={avatar} fallbackSrc={fallback} />
            </AspectRatio>
            {correctAvatarFormat(avatar) && (
              <IconButton
                aria-label={t('form.account_create.delete_image')}
                icon={<BiTrash />}
                onClick={() => setValue('avatar', '')}
                position='absolute'
                top={2}
                right={2}
                cursor='pointer'
                size='xs'
                fontSize='md'
              />
            )}
          </Box>
          <FormControl isInvalid={!!errors.avatar}>
            <Input
              type='text'
              {...register('avatar', {
                validate: (val: string) => {
                  if (val && !correctAvatarFormat(val)) {
                    return t('form.error.avatar_error')
                  }
                },
              })}
              mb={1}
              placeholder={t('form.edit_profile.avatar_placeholder').toString()}
            />

            {!!errors.avatar ? (
              <FormErrorMessage>{errors.avatar?.message?.toString()}</FormErrorMessage>
            ) : (
              <FormHelperText>
                <InfoOutlineIcon />
                <Text>{t('form.edit_profile.avatar_helper')}</Text>
              </FormHelperText>
            )}
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!errors.name}>
          <Input
            type='text'
            {...register('name', { required })}
            mb={1}
            placeholder={t('form.account_create.title_placeholder').toString()}
          />
          {!!errors.name ? (
            <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
          ) : (
            <FormHelperText>
              <InfoOutlineIcon />
              <Text>{t('form.account_create.title_helper')}</Text>
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <Textarea
            {...register('description')}
            placeholder={t('form.account_create.description_placeholder').toString()}
          />
          <FormHelperText>
            <InfoOutlineIcon />
            <Text> {t('form.account_create.description_helper')}</Text>
          </FormHelperText>
        </FormControl>

        {error && (
          <Text color='error' textAlign='center'>
            {error}
          </Text>
        )}
      </Flex>
      <Box display='flex' flexDirection='column' gap={5} w='full' alignItems='center'>
        <Button type='submit' isLoading={loading} px={10} py={4}>
          {t('form.edit_profile.btn')}
        </Button>
        <Text textAlign='center' maxW='70%'>
          {t('form.edit_profile.footer')}
        </Text>
      </Box>
    </Box>
  )
}
