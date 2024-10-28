import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'

interface PasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordParams {
  oldPassword: string
  newPassword: string
}

const useUpdatePassword = () => {
  const { bearedFetch } = useAuth()

  return useMutation<void, Error, UpdatePasswordParams>({
    mutationFn: (params) =>
      bearedFetch<void>(ApiEndpoints.Password, {
        method: 'PUT',
        body: params,
      }),
  })
}

const PasswordForm = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const updatePassword = useUpdatePassword()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>()

  const password = watch('newPassword')

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })

      toast({
        title: t('password.success', { defaultValue: 'Password updated successfully' }),
        status: 'success',
      })
      reset()
    } catch (error) {
      toast({
        title: t('password.error', { defaultValue: 'Failed to update password' }),
        status: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align='stretch'>
        <FormControl isInvalid={!!errors.oldPassword}>
          <FormLabel>{t('password.old.label', { defaultValue: 'Current Password' })}</FormLabel>
          <Input
            type='password'
            {...register('oldPassword', {
              required: t('password.old.required', { defaultValue: 'Current password is required' }),
            })}
          />
          <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.newPassword}>
          <FormLabel>{t('password.new.label', { defaultValue: 'New Password' })}</FormLabel>
          <Input
            type='password'
            {...register('newPassword', {
              required: t('password.new.required', { defaultValue: 'Password is required' }),
              minLength: {
                value: 8,
                message: t('password.new.minLength', { defaultValue: 'Password must be at least 8 characters' }),
              },
            })}
          />
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>{t('password.confirm.label', { defaultValue: 'Confirm Password' })}</FormLabel>
          <Input
            type='password'
            {...register('confirmPassword', {
              required: t('password.confirm.required', { defaultValue: 'Please confirm your password' }),
              validate: (value) =>
                value === password || t('password.confirm.mismatch', { defaultValue: "Passwords don't match" }),
            })}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button type='submit' size='lg' width='100%' isLoading={isSubmitting || updatePassword.isPending} mt={4}>
          {t('password.actions.update', { defaultValue: 'Update Password' })}
        </Button>
      </VStack>
    </form>
  )
}

export default PasswordForm
