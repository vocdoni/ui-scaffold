import {
  Button,
  ButtonProps,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useSubscription } from '~components/Auth/Subscription'
import InputBasic from '~components/Layout/InputBasic'
import { RoleSelector } from '~components/Layout/SaasSelector'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { SubscriptionPermission } from '~constants'
import { useInviteMemberMutation } from '~src/queries/organization'
import { CallbackProvider, useCallbackContext } from '~utils/callback-provider'
import { useAllTeamMembers } from './Team'

type InviteFormProps = {
  onClose: () => void
}

// Invite form component
const InviteForm = ({ onClose }: InviteFormProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const mutation = useInviteMemberMutation()
  const { success } = useCallbackContext()

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data) =>
    mutation.mutate(
      { email: data.email, role: data.role.value },
      {
        onSuccess: () => {
          toast({
            title: t('invite.success', { defaultValue: 'Invitation sent successfully!' }),
            description: t('invite.user_invited', { defaultValue: 'Email sent to {{email}}', email: data.email }),
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          success()
        },
        onError: (error: Error) => {
          toast({
            title: t('invite.error', { defaultValue: 'Error' }),
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      }
    )

  return (
    <FormProvider {...methods}>
      <Flex as='form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={6}>
        <InputBasic
          formValue='email'
          label={t('email')}
          placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
          type='email'
          required
        />
        <RoleSelector name='role' required />
        <Flex justifyContent='flex-end' gap={2}>
          <Button onClick={onClose} colorScheme='gray' variant='outline'>
            <Trans i18nKey='cancel'>Cancel</Trans>
          </Button>
          <Button colorScheme='black' type='submit' isLoading={mutation.isPending}>
            <Trans i18nKey='send_invitation'>Send invitation</Trans>
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export const InviteToTeamModal = (props: ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { permission } = useSubscription()
  const { t } = useTranslation()
  const { members, isLoading } = useAllTeamMembers()
  const { openModal } = usePricingModal()

  const memberships = permission(SubscriptionPermission.Members)
  const canInvite = memberships > (members?.length || 0)

  return (
    <>
      <Button
        onClick={() => {
          if (canInvite) {
            onOpen()
          } else {
            openModal('planUpgrade', {
              feature: SubscriptionPermission.Members,
              text: t('more_than_memberships', {
                defaultValue: 'more than {count} memberships',
                count: memberships,
              }),
              value: members?.length + 1,
            })
          }
        }}
        {...props}
        isLoading={isLoading}
        loadingText={t('loading')}
      />
      <CallbackProvider success={() => onClose()}>
        <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading>
                <Trans i18nKey='invite.title'>Add team member</Trans>
              </Heading>
              <Trans i18nKey='invite.subtitle'>
                Send an invitation to join your organization. They'll receive an email with instructions.
              </Trans>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InviteForm onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </CallbackProvider>
    </>
  )
}
