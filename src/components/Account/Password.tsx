import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Pencil01 } from '@untitled-ui/icons-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { ModalForm, useModalForm } from '~components/Layout/Form/ModalForm'

interface PasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

interface UpdatePasswordParams {
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

interface PasswordFormProps {
  onSuccess?: () => void
}

const PasswordForm = ({ onSuccess }: PasswordFormProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const updatePassword = useUpdatePassword()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>()

  const { formRef, setIsSubmitting, onClose } = useModalForm()

  React.useEffect(() => {
    setIsSubmitting(isSubmitting)
  }, [isSubmitting, setIsSubmitting])

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
      onSuccess?.()
      onClose()
    } catch (error) {
      toast({
        title: t('password_update.error', { defaultValue: 'Failed to update password' }),
        status: 'error',
      })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation()
        handleSubmit(onSubmit)(e)
      }}
      ref={formRef}
    >
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
      </VStack>
    </form>
  )
}

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const { t } = useTranslation()

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={t('change_password.title', { defaultValue: 'Change Password' })}
      subtitle={t('change_password.subtitle', {
        defaultValue: 'Enter your current password and a new password to update your credentials.',
      })}
      submitText={t('password_update.actions.save', { defaultValue: 'Save Password' })}
    >
      <PasswordForm />
    </ModalForm>
  )
}

export const ChangePasswordButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<Pencil01 />}
        aria-label='change password'
        variant={'outline'}
        size='sm'
        w='40px'
        h='40px'
      />
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
