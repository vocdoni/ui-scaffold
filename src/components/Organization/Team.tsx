import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Progress,
  Radio,
  RadioGroup,
  RadioProps,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useRadioGroupContext,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { enforceHexPrefix, useClient } from '@vocdoni/react-providers'
import { formatDistanceToNow } from 'date-fns'
import { ReactNode } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuMail, LuPlus, LuRefreshCw, LuUserCog, LuUserPlus } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { roleIcons } from '~components/Layout/SaasSelector'
import { useProfile } from '~src/queries/account'
import { QueryKeys } from '~src/queries/keys'
import { useRemoveMemberMutation, useRoles } from '~src/queries/organization'
import { InviteToTeamModal } from './Invite'

// Define types
type UserInfo = {
  id: number
  email: string
  firstName: string
  lastName: string
}

type ActiveMember = {
  info: UserInfo
  role: string
  expiration?: string
}

type PendingMember = {
  id: string
  email: string
  role: string
  expiration?: string
  info?: undefined
}

type Member = ActiveMember | PendingMember

const isActiveMember = (member: Member): member is ActiveMember => !!member.info

type WithDisclosure = {
  isOpen: boolean
  onClose: () => void
}

type MemberModalProps<T extends Member> = Omit<ModalProps, 'children' | 'isOpen' | 'onClose'> & {
  isOpen: boolean
  onClose: () => void
  member: T
}

type ActiveMemberModalProps = MemberModalProps<ActiveMember>
type PendingMemberModalProps = MemberModalProps<PendingMember>

type UpdateRoleBody = {
  role: string
}

type UpdateRoleParams = {
  id: string
  body: UpdateRoleBody
}

type ChangeRoleFormProps = {
  member: ActiveMember
  onClose: () => void
}

type RoleRadioProps = RadioProps & {
  fieldName: ReactNode
  description: ReactNode
  value: string
}

type RoleRadioGroupProps = {
  currentRole: string
}

type TeamMembersResponse = {
  members: Member[]
}

type PendingTeamMembersResponse = {
  pending: PendingMember[]
}

type MemberActionsProps = {
  member: Member
}

type PendingInvitationActionsProps = {
  member: PendingMember
  closeMenu: () => void
  openCancelInvitation: () => void
}

type ActiveMemberActionsProps = {
  openChangeRole: () => void
  openRemoveMember: () => void
}

type TeamMembersListProps = {
  members: Member[]
}

// Fetch hook for team members
export const useTeamMembers = ({
  options,
}: {
  options?: Omit<UseQueryOptions<TeamMembersResponse>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  return useQuery({
    queryKey: QueryKeys.organization.members(enforceHexPrefix(account?.address)),
    queryFn: () =>
      bearedFetch<TeamMembersResponse>(
        ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(account?.address))
      ),
    ...options,
    select: (data) => data.members,
  })
}

// Fetch hook for pending members
export const usePendingTeamMembers = ({
  options,
}: {
  options?: Omit<UseQueryOptions<PendingTeamMembersResponse>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  return useQuery({
    queryKey: QueryKeys.organization.pendingMembers(enforceHexPrefix(account?.address)),
    queryFn: () =>
      bearedFetch<PendingTeamMembersResponse>(
        ApiEndpoints.OrganizationPendingMembers.replace('{address}', enforceHexPrefix(account?.address))
      ),
    ...options,
    select: (data) => data.pending,
  })
}

export const useAllTeamMembers = () => {
  const {
    data: membersData,
    isLoading: membersLoading,
    isError: membersError,
    error: membersFetchError,
  } = useTeamMembers()

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
    error: pendingFetchError,
  } = usePendingTeamMembers()

  return {
    members: [...(membersData || []), ...(pendingData || [])],
    isLoading: membersLoading || pendingLoading,
    isError: membersError || pendingError,
    error: membersFetchError || pendingFetchError,
  }
}

const useUpdateRole = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  const client = useQueryClient()

  return useMutation<void, Error, UpdateRoleParams>({
    mutationFn: async ({ id, body }) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationMember.replace('{address}', enforceHexPrefix(account?.address)).replace(
          '{memberId}',
          id
        ),
        {
          method: 'PUT',
          body,
        }
      ),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: QueryKeys.organization.members(),
      })
    },
  })
}

const useCancelInvitation = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  const client = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationPendingMember.replace('{address}', enforceHexPrefix(account?.address)).replace(
          '{inviteId}',
          id
        ),
        { method: 'DELETE' }
      ),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: QueryKeys.organization.pendingMembers(),
      })
    },
  })
}

const useResendInvitationMutation = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationPendingMember.replace('{address}', enforceHexPrefix(account?.address)).replace(
          '{inviteId}',
          id
        ),
        {
          method: 'PUT',
        }
      ),
  })
}

const RoleRadio = ({ fieldName: title, description, value, isDisabled, ...props }: RoleRadioProps) => {
  const group = useRadioGroupContext()
  const isSelected = group?.value === value

  return (
    <Box
      as='label'
      border='1px solid'
      borderRadius='md'
      borderColor={isSelected ? 'gray.500' : 'gray.200'}
      bg={isSelected && 'gray.50'}
      p={2}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.6 : 1}
      _hover={!isDisabled ? { borderColor: 'gray.400' } : undefined}
    >
      <Flex align='start' gap={4}>
        <Radio value={value} isChecked={isSelected} mt={1} isDisabled={isDisabled} {...props} />
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

const RoleRadioGroup = ({ currentRole }: RoleRadioGroupProps) => {
  const { t } = useTranslation()
  const { data: roles, isLoading: rolesLoading, isError: rolesError, error: rolesFetchError } = useRoles()
  const { control } = useFormContext()

  if (rolesError) return <Alert status='error'>{rolesFetchError?.message || t('error.loading_roles')}</Alert>

  return (
    <FormControl>
      <FormLabel fontSize='sm'>{t('role.update.new_role', { defaultValue: 'New role' })}</FormLabel>
      {rolesLoading && <Progress isIndeterminate />}
      <Controller
        name='role'
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} colorScheme='gray'>
            <Stack direction='column' gap={2}>
              {roles?.map((role) => (
                <RoleRadio
                  key={role.role}
                  value={role.role}
                  fieldName={role.name}
                  isDisabled={role.role === currentRole}
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
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}

const ChangeRoleForm = ({ member, onClose }: ChangeRoleFormProps) => {
  const toast = useToast()
  const { t } = useTranslation()
  const methods = useForm<UpdateRoleBody>()
  const updateRole = useUpdateRole()

  const onSubmit = (body: UpdateRoleBody) => {
    updateRole.mutate(
      { id: member?.info.id.toString(), body },
      {
        onSuccess: (): void => {
          toast({
            title: t('role.update.success', { defaultValue: 'Role updated successfully' }),
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error: Error): void => {
          toast({
            title: t('role.update.error', { defaultValue: 'Error updating role' }),
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      }
    )
  }

  const currentRole = member?.role
  const fullName = `${member?.info?.firstName} ${member?.info?.lastName}`

  return (
    <FormProvider {...methods}>
      <Flex as='form' direction='column' gap={4} onSubmit={methods.handleSubmit(onSubmit)}>
        <Flex border='1px solid' borderColor='gray.200' p={4} borderRadius='md' alignItems='center' bg='gray.50'>
          <Avatar name={fullName} />
          <Box ml='3'>
            <HStack align='center'>
              <Text fontWeight='bold'>{fullName}</Text>
            </HStack>
            <Flex direction='column'>
              <Text fontSize='sm' color='gray.500'>
                {member?.info.email}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Text fontSize='sm' fontWeight='bold'>
          {t('role.update.current_role', {
            defaultValue: 'Current Role',
          })}
        </Text>
        <Box p={2} border='1px solid' borderColor='gray.200' borderRadius='md'>
          <Flex gap={2} align='center'>
            <Text>{roleIcons[currentRole]}</Text>
            <Text fontWeight='semibold' textTransform='capitalize'>
              {currentRole}
            </Text>
          </Flex>
        </Box>
        <RoleRadioGroup currentRole={currentRole} />
        <Flex gap={2} justifyContent='flex-end' mt={4}>
          <Button colorScheme='black' onClick={onClose}>
            {t('role.update.cancel', { defaultValue: 'Cancel' })}
          </Button>
          <Button isLoading={updateRole.isPending} variant='outline' type='submit'>
            {t('role.update.save', {
              defaultValue: 'Update role',
            })}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

const ChangeRoleModal = ({ isOpen, onClose, member, ...props }: ActiveMemberModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalHeader display='flex' flexDirection='column' gap={6}>
          <Flex justifyContent='space-between' flexDirection='column' gap={1}>
            <Heading fontSize='md' fontWeight='extrabold'>
              {t('role.update.title', { defaultValue: 'Change team member role' })}
            </Heading>
            <Text fontSize='sm' color='gray.500'>
              {t('role.update.subtitle', {
                defaultValue: 'Update the permissions for this team member by changing their role.',
              })}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChangeRoleForm member={member} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const RemoveMemberModal = ({ isOpen, onClose, member, ...props }: ActiveMemberModalProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const removeMember = useRemoveMemberMutation()

  const id = member.info?.id

  const removeMemberHandler = () => {
    removeMember.mutate(id, {
      onSuccess: () => {
        toast({
          title: t('team.remove_member.success', { defaultValue: 'Member removed successfully' }),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error: Error) => {
        toast({
          title: t('team.remove_member.error', { defaultValue: 'Error removing member' }),
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('team.remove_member.title', { defaultValue: 'Are you sure?' })}</ModalHeader>
        <ModalBody>
          <Text>
            {t('team.remove_member.confirmation', {
              defaultValue:
                'This will remove {{name}} from your team. They will no longer have access to your organization.',
              name: `${member.info.firstName} ${member.info.lastName}`,
            })}
          </Text>
          <Flex justifyContent='flex-end' mt={4} gap={2}>
            <Button variant='outline' onClick={onClose}>
              {t('team.remove_member.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button isLoading={removeMember.isPending} colorScheme='red' onClick={removeMemberHandler}>
              {t('team.remove_member.confirm', { defaultValue: 'Remove' })}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const CancelInvitationModal = ({ isOpen, onClose, member, ...props }: PendingMemberModalProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const cancelInvitation = useCancelInvitation()

  const cancelInvitationHandler = () => {
    cancelInvitation.mutate(member.id, {
      onSuccess: () => {
        toast({
          title: t('team.actions.cancel_invitation_success', { defaultValue: 'Invitation cancelled successfully' }),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error: Error) => {
        toast({
          title: t('team.actions.cancel_invitation_error', { defaultValue: 'Error cancelling invitation' }),
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('team.cancel_invitation.title', { defaultValue: 'Are you sure?' })}</ModalHeader>
        <ModalBody>
          <Text>
            {t('team.cancel_invitation.confirmation', {
              defaultValue: 'This will cancel the invitation. The person will not be able to join your organization.',
            })}
          </Text>
          <Flex justifyContent='flex-end' mt={4} gap={2}>
            <Button variant='outline' onClick={onClose}>
              {t('team.cancel_invitation.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button isLoading={cancelInvitation.isPending} colorScheme='red' onClick={cancelInvitationHandler}>
              {t('team.cancel_invitation.confirm', { defaultValue: 'Cancel invitation' })}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const PendingInvitationActions = ({ member, closeMenu, openCancelInvitation }: PendingInvitationActionsProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const resendInvitation = useResendInvitationMutation()
  const isLoading = resendInvitation.isPending

  const resendInvitationHandler = () => {
    resendInvitation.mutate(member.id, {
      onSuccess: () => {
        toast({
          title: t('team.actions.resend_invitation_success', {
            defaultValue: 'Invitation resent to {{email}} successfully',
            email: member?.email,
          }),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        closeMenu()
      },
      onError: (error: Error) => {
        toast({
          title: t('team.actions.resend_invitation_error', {
            defaultValue: 'Error resending invitation to {{email}}',
            email: member?.email,
          }),
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <>
      <MenuItem
        icon={isLoading ? <Spinner size='xs' /> : <Icon as={LuRefreshCw} />}
        fontSize='sm'
        isDisabled={isLoading}
        onClick={resendInvitationHandler}
      >
        {t('team.actions.resend_invitation', { defaultValue: 'Resend Invitation' })}
      </MenuItem>
      <MenuItem color='red' fontSize='sm' isDisabled={isLoading} onClick={openCancelInvitation}>
        {t('team.actions.cancel_invitation', { defaultValue: 'Cancel Invitation' })}
      </MenuItem>
    </>
  )
}

const ActiveMemberActions = ({ openChangeRole, openRemoveMember }: ActiveMemberActionsProps) => {
  const { t } = useTranslation()

  return (
    <>
      <MenuItem onClick={openChangeRole} fontSize='sm' icon={<Icon boxSize={4} as={LuUserCog} />}>
        {t('team.actions.change_role', { defaultValue: 'Change Role' })}
      </MenuItem>
      <MenuDivider />
      <MenuItem color='red.400' fontSize='sm' onClick={openRemoveMember}>
        {t('team.actions.remove_member', { defaultValue: 'Remove Member' })}
      </MenuItem>
    </>
  )
}

const MemberActions = ({ member }: MemberActionsProps) => {
  const { t } = useTranslation()
  const { data: profile, isLoading } = useProfile()
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure()

  const isCurrentUser = String(member.info?.id) === String(profile?.id)
  if (isCurrentUser) return null

  // Disclosures para los modales
  const roleModal = useDisclosure()
  const removeModal = useDisclosure()
  const cancelModal = useDisclosure()

  return (
    <>
      <Menu
        closeOnSelect={false}
        isOpen={isMenuOpen}
        onOpen={openMenu}
        onClose={closeMenu}
        placement='bottom-end'
        isLazy
      >
        <MenuButton
          as={IconButton}
          isLoading={isLoading}
          icon={<Icon as={LuEllipsis} />}
          ml='auto'
          variant='transparent'
          aria-label='Options'
          onClick={openMenu}
        />
        <MenuList minW='unset'>
          <MenuGroup title={t('team.actions.title', { defaultValue: 'Actions' })}>
            {isActiveMember(member) ? (
              <ActiveMemberActions openChangeRole={roleModal.onOpen} openRemoveMember={removeModal.onOpen} />
            ) : (
              <PendingInvitationActions
                member={member}
                openCancelInvitation={cancelModal.onOpen}
                closeMenu={closeMenu}
              />
            )}
          </MenuGroup>
        </MenuList>
      </Menu>
      {isActiveMember(member) ? (
        <>
          <ChangeRoleModal isOpen={roleModal.isOpen} onClose={roleModal.onClose} member={member} />
          <RemoveMemberModal isOpen={removeModal.isOpen} onClose={removeModal.onClose} member={member} />
        </>
      ) : (
        <CancelInvitationModal isOpen={cancelModal.isOpen} onClose={cancelModal.onClose} member={member} />
      )}
    </>
  )
}

const TeamMembersEmpty = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems='center' direction='column' p={10} gap={6}>
      <Flex alignItems='center' direction='column'>
        <Icon as={LuUserPlus} boxSize={20} color='gray.500' />
        <Text fontSize='lg' fontWeight='extrabold'>
          {t('team.only_one_member.title', { defaultValue: "You're the only team member of this organization" })}
        </Text>
        <Text color='gray.500'>
          {t('team.only_one_member.subtitle', {
            defaultValue: 'Add team members to collaborate on your organization',
          })}
        </Text>
      </Flex>
      <InviteToTeamModal leftIcon={<Icon mr={2} as={LuPlus} />}>
        {t('team.only_one_member.add_team_member', { defaultValue: 'Add team member' })}
      </InviteToTeamModal>
    </Flex>
  )
}

const TeamMembersList = ({ members }: TeamMembersListProps) => {
  const { t } = useTranslation()

  return (
    <Flex direction='column'>
      {members.map((member, i) => {
        const isActive = isActiveMember(member)
        const name = isActive
          ? `${member.info.firstName} ${member.info.lastName}`
          : t('team.pending_invitation', { defaultValue: 'Invitation Pending' })
        const email = isActive ? member.info.email : member.email
        const avatarName = isActive && `${member.info.firstName} ${member.info.lastName}`

        return (
          <Flex alignItems='center' p={2} key={i}>
            <Avatar name={avatarName} icon={!isActive && <Icon as={LuMail} />} />
            <Box ml='3'>
              <HStack align='center'>
                <Text fontWeight='bold'>{name}</Text>
                <Badge variant='subtle' textTransform='capitalize'>
                  {member.role}
                </Badge>
              </HStack>
              <Flex direction='column'>
                <Text fontSize='sm' color='gray.500'>
                  {email}
                </Text>
                {member.expiration && (
                  <Text fontSize='xs' color='gray.500'>
                    {t('team.expires_in', {
                      defaultValue: 'Expires in {{time}}',
                      time: formatDistanceToNow(new Date(member.expiration)),
                    })}
                  </Text>
                )}
              </Flex>
            </Box>
            <MemberActions member={member} />
          </Flex>
        )
      })}
    </Flex>
  )
}

export const TeamMembers = () => {
  const { members, isLoading, isError, error } = useAllTeamMembers()

  if (isLoading) return <Progress isIndeterminate />

  return (
    <QueryDataLayout isEmpty={!members || members.length === 0} isLoading={isLoading} isError={isError} error={error}>
      {members.length === 1 ? <TeamMembersEmpty /> : <TeamMembersList members={members} />}
    </QueryDataLayout>
  )
}
