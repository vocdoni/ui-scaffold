import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User, useUpdateProfile } from '~src/queries/account'
import { ChangePasswordButton } from './Password'

interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
}

const AccountForm = ({ profile }: { profile: User }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const updateProfile = useUpdateProfile()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    values: profile
      ? {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        }
      : undefined,
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
      })

      toast({
        title: t('profile.success', { defaultValue: 'Profile updated successfully' }),
        status: 'success',
      })
    } catch (error) {
      toast({
        title: t('profile.error', { defaultValue: 'Failed to update profile' }),
        status: 'error',
      })
    }
  }

  return (
    <>
      {' '}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text size={'2xl'} fontWeight={'extrabold'} mb={1.5}>
          {t('account.title', { defaultValue: 'Account Information' })}
        </Text>
        <Text size={'sm'} color={'rgb(115, 115, 115)'} mb={6}>
          {t('account.subtitle', { defaultValue: 'Update your account details and personal information' })}{' '}
        </Text>
        <VStack spacing={8} align='stretch'>
          <HStack>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel fontSize={'14px'}>{t('name', { defaultValue: 'Name' })}</FormLabel>
              <Input
                {...register('firstName', {
                  required: t('form.error.field_is_required'),
                })}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel fontSize={'14px'}>{t('lastname', { defaultValue: 'Last name' })}</FormLabel>
              <Input
                {...register('lastName', {
                  required: t('form.error.field_is_required'),
                })}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel fontSize={'14px'}>{t('email', { defaultValue: 'Email' })}</FormLabel>
            <Input {...register('email')} isDisabled type='email' />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={'14px'}>{t('password', { defaultValue: 'Password' })}</FormLabel>
            <HStack gap={2}>
              <Input placeholder={'• • • • • • • •'} type='password' isDisabled />
              <ChangePasswordButton />
            </HStack>
          </FormControl>

          <Button type='submit' size='lg' isLoading={isSubmitting || updateProfile.isPending} alignSelf={'start'}>
            {t('actions.save', { defaultValue: 'Save Changes' })}
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default AccountForm
