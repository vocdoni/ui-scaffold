import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User, useUpdateProfile } from '~src/queries/account'

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8} align='stretch'>
        <FormControl isDisabled style={{ cursor: 'not-allowed' }}>
          <FormLabel>{t('profile.avatar.label', { defaultValue: 'Avatar' })}</FormLabel>
          <Flex align='center' gap={4}>
            <Avatar size='lg' name={profile ? `${profile.firstName} ${profile.lastName}` : undefined} />
            <Text color='gray.500' fontSize='sm'>
              {t('avatar.hint', { defaultValue: 'Min 200x200px .PNG or .JPEG' })}
            </Text>
          </Flex>
        </FormControl>

        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel>{t('name', { defaultValue: 'Name' })}</FormLabel>
          <Input
            {...register('firstName', {
              required: t('form.error.field_is_required'),
            })}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel>{t('surname', { defaultValue: 'Surname' })}</FormLabel>
          <Input
            {...register('lastName', {
              required: t('form.error.field_is_required'),
            })}
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>{t('email', { defaultValue: 'Email' })}</FormLabel>
          <Input {...register('email')} isDisabled type='email' />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button type='submit' size='lg' isLoading={isSubmitting || updateProfile.isPending}>
          {t('actions.save', { defaultValue: 'Save Changes' })}
        </Button>
      </VStack>
    </form>
  )
}

export default AccountForm
