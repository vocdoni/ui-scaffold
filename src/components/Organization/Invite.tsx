import {
  Alert,
  Box,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Radio,
  Stack,
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
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { SubscriptionPermission } from '~constants'
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
const useRoles = () => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: ['organization', 'roles'],
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
      queryClient.invalidateQueries({ queryKey: ['organizations', 'members'] })
    },
  })
}

// Invite form component
const InviteForm = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const mutation = useInviteMemberMutation()
  const { success } = useCallbackContext()
  const { data: roles, isLoading: rolesLoading, isError: rolesError, error: rolesFetchError } = useRoles()

  const methods = useForm({
    defaultValues: {
      email: '',
      role: 'admin',
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

  // could be better placed, but I prefered breaking the entire form just in case
  if (rolesError) return <Alert status='error'>{rolesFetchError?.message || t('error.loading_roles')}</Alert>

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
        <FormControl>
          <FormLabel fontSize='sm'>
            <Trans i18nKey='invite.select_option'>Select an option</Trans>
          </FormLabel>
          <Stack
            direction='column'
            my='10px'
            gap={0}
            sx={{
              '& :first-of-type': {
                borderTopRadius: 'lg',
              },
              '& :last-of-type': {
                borderBottomRadius: 'lg',
              },
            }}
          >
            {rolesLoading && <Progress size='xs' isIndeterminate />}
            {roles &&
              roles?.map((role) => (
                <RoleRadio
                  key={role.role}
                  name='role'
                  value={role.role}
                  fieldName={role.name}
                  description={
                    role.writePermission ? (
                      <Trans i18nKey='role.write_permission'>Can create and edit content</Trans>
                    ) : (
                      <Trans i18nKey='role.read_permission'>Read-only access</Trans>
                    )
                  }
                />
              ))}
          </Stack>
        </FormControl>
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
      >
        <Trans i18nKey='invite_people'>Invite People</Trans>
      </Button>
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
      _checked={{ bg: 'dashboard.invite.bg_checked_light', _dark: { bg: 'dashboard.invite.bg_checked_dark' } }}
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
