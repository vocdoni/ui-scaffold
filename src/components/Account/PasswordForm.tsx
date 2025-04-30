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

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })

      toast({
        title: t('password_update.success', { defaultValue: 'Password updated successfully' }),
        status: 'success',
      })
      reset()
    } catch (error) {
      toast({
        title: t('password_update.error', { defaultValue: 'Failed to update password' }),
        status: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align='stretch'>
        <FormControl isInvalid={!!errors.oldPassword}>
          <FormLabel>{t('password_update.old.label', { defaultValue: 'Current Password' })}</FormLabel>
          <Input
            type='password'
            {...register('oldPassword', {
              required: t('password_update.old.required', { defaultValue: 'Current password is required' }),
            })}
          />
          <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.newPassword}>
          <FormLabel>{t('password_update.new.label', { defaultValue: 'New Password' })}</FormLabel>
          <Input
            type='password'
            {...register('newPassword', {
              required: t('password_update.new.required', { defaultValue: 'Password is required' }),
              minLength: {
                value: 8,
                message: t('password_update.new.minLength', { defaultValue: 'Password must be at least 8 characters' }),
              },
            })}
          />
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>

        {/* DEBERIA SUBSTITUIR ESTE BOTON POR EL MODAL FOOTER EN CASO DE PASAR MODAL FOOTER */}
        <Button type='submit' size='lg' isLoading={isSubmitting || updatePassword.isPending} mt={4} alignSelf={'end'}>
          {t('password_update.actions.save', { defaultValue: 'Save Password' })}
        </Button>
      </VStack>
    </form>
  )
}

export default PasswordForm
