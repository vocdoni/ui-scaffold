import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
  useDisclosure,
  useRadioGroupContext,
  useToast,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { HSeparator } from '~components/Auth/SignIn'
import { useSubscription } from '~components/Auth/Subscription'
import InputBasic from '~components/Layout/InputBasic'
import { roleIcons, RoleSelector } from '~components/Layout/SaasSelector'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { SubscriptionPermission } from '~constants'
import { useInviteMemberMutation } from '~src/queries/organization'
import { CallbackProvider, useCallbackContext } from '~utils/callback-provider'
import { useAllTeamMembers } from './Team'

// Invite form component
const InviteForm = () => {
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
        <Flex justifyContent='center'>
          <Button mx='auto' type='submit' isLoading={mutation.isPending}>
            <Trans i18nKey='submit'>Submit</Trans>
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
            <ModalHeader display='flex' flexDirection='column' gap={6}>
              <Flex justifyContent='space-between' flexDirection='column' gap={1}>
                <Heading fontSize='2xl'>
                  <Trans i18nKey='invite.title'>Invite people to your team</Trans>
                </Heading>
                <Text fontWeight='normal'>
                  <Trans i18nKey='invite.subtitle'>Work together on projects</Trans>
                </Text>
              </Flex>
              <HSeparator />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InviteForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </CallbackProvider>
    </>
  )
}

type RoleRadioProps = FlexProps & {
  fieldName: ReactNode
  description: ReactNode
  value: string
}

export const RoleRadio = ({ fieldName: title, description, value, ...props }: RoleRadioProps) => {
  const group = useRadioGroupContext()

  return (
    <Box
      as='label'
      border='1px solid'
      borderRadius='md'
      borderColor={group?.value === value ? 'gray.500' : 'gray.200'}
      bg={group?.value === value && 'gray.50'}
      p={2}
      cursor='pointer'
      _hover={{ borderColor: 'gray.400' }}
    >
      <Flex align='start' gap={4}>
        <Radio value={value} isChecked={group?.value === value} mt={1} {...props} />
        <Box flex='1'>
          <Flex gap={2} align='center' mb={1}>
            <Text>{roleIcons[value]}</Text>
            <Text fontWeight='semibold'>{title}</Text>
          </Flex>
          <Text fontSize='sm' color='gray.600'>
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
