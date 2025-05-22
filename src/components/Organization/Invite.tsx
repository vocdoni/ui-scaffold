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
  useRadio,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { ReactNode } from 'react'
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { HSeparator } from '~components/Auth/SignIn'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import InputBasic from '~components/Layout/InputBasic'
import { RoleSelector } from '~components/Layout/SaasSelector'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { SubscriptionPermission } from '~constants'
import { QueryKeys } from '~src/queries/keys'
import { CallbackProvider, useCallbackContext } from '~utils/callback-provider'
import { useTeamMembers } from './Team'

type InviteData = {
  email: string
  role: string
}

type Role = {
  role: string
  name: string
  writePermission: boolean
}

// Hook to fetch roles
export const useRoles = () => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.organization.roles,
    queryFn: async () => {
      const response = await bearedFetch<{ roles: Role[] }>(ApiEndpoints.OrganizationsRoles)
      return response.roles
    },
    staleTime: 60 * 60 * 1000,
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  })
}

// Hook to handle member invitation mutation
const useInviteMemberMutation = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: InviteData) =>
      await bearedFetch(ApiEndpoints.OrganizationMembers.replace('{address}', ensure0x(organization.address)), {
        method: 'POST',
        body,
      }),
    onSuccess: () => {
      // Invalidate queries to refresh member and pending member lists
      queryClient.invalidateQueries({ queryKey: QueryKeys.organization.members() })
    },
  })
}

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

  const onSubmit = (data: InviteData) =>
    mutation.mutate(data, {
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
    })

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
  const { data: members, isLoading } = useTeamMembers()
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
  name: string
  fieldName: ReactNode
  description: ReactNode
  value: string
}

const RoleRadio = ({ name, fieldName: title, description, value, ...props }: RoleRadioProps) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })
  const { getInputProps, getRadioProps } = useRadio({
    value,
    onChange: field.onChange,
    isChecked: field.value === value,
  })

  const input = getInputProps()
  const radio = getRadioProps()

  return (
    <Flex
      as='label'
      border='1px solid'
      borderColor='rgba(135, 140, 189, 0.3)'
      gap={5}
      padding={6}
      cursor='pointer'
      _checked={{ bg: 'dashboard.invite' }}
      {...props}
      {...radio}
    >
      <input {...input} />
      <Box flex='1'>
        <Text>{title}</Text>
        <Text fontWeight='normal'>{description}</Text>
      </Box>
      <Radio isChecked={field.value === value} onChange={() => field.onChange(value)} />
    </Flex>
  )
}
