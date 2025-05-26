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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { enforceHexPrefix, useClient } from '@vocdoni/react-providers'
import { formatDistanceToNow } from 'date-fns'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuMail, LuPlus, LuRefreshCw, LuUserCog, LuUserPlus } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { roleIcons } from '~components/Layout/SaasSelector'
import { QueryKeys } from '~src/queries/keys'
import { useInviteMemberMutation, useRemoveMemberMutation, useRoles } from '~src/queries/organization'
import { ucfirst } from '~utils/strings'
import { InviteToTeamModal, RoleRadio } from './Invite'

// Define types
type UserInfo = {
  id: number
  email: string
  firstName: string
  lastName: string
}

type Member = {
  info?: UserInfo
  email?: string
  role: string
  expiration?: string
}

type TeamMembersResponse = {
  members: Member[]
}

type PendingTeamMembersResponse = {
  pending: Member[]
}

interface UpdateRoleParams {
  id: string
  body: {
    role: string
  }
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

export const ChangeRoleModal = ({ isOpen, onClose, member, ...props }) => {
  const toast = useToast()
  const { t } = useTranslation()
  const { data: roles, isLoading: rolesLoading, isError: rolesError, error: rolesFetchError } = useRoles()
  const methods = useForm()
  const updateRole = useUpdateRole()

  const currentRole = member?.role
  const fullName = `${member?.info?.firstName} ${member?.info?.lastName}`

  const onSubmit = (data) => {
    updateRole.mutate(
      { id: member?.info.id, body: data },
      {
        onSuccess: () => {
          toast({
            title: t('role.update.success', { defaultValue: 'Role updated successfully' }),
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
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

  if (rolesError) return <Alert status='error'>{rolesFetchError?.message || t('error.loading_roles')}</Alert>

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick {...props}>
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
                  <Text fontWeight='semibold'>{ucfirst(currentRole)}</Text>
                </Flex>
              </Box>
              <FormControl>
                <FormLabel fontSize='sm'>{t('role.update.new_role', { defaultValue: 'New role' })}</FormLabel>
                {rolesLoading && <Progress isIndeterminate />}
                <Controller
                  name='role'
                  control={methods.control}
                  render={({ field }) => (
                    <RadioGroup {...field} colorScheme='gray'>
                      <Stack direction='column' gap={2}>
                        {roles?.map((role) => (
                          <RoleRadio
                            key={role.role}
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
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <Flex gap={2} justifyContent='flex-end' mt={4}>
                <Button colorScheme='black' onClick={onClose}>
                  {t('role.update.cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button variant='outline' type='submit'>
                  {t('role.update.save', {
                    defaultValue: 'Update role',
                  })}
                </Button>
              </Flex>
            </Flex>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const RemoveMemberModal = ({ isOpen, onClose, member }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const removeMemberById = useRemoveMemberMutation()

  const id = member.info?.id

  const removeMember = () => {
    removeMemberById.mutate(id, {
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
    <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('team.remove_member.title', { defaultValue: 'Are you sure?' })}</ModalHeader>
        <ModalBody>
          <Text>
            {t('team.remove_member.confirmation', {
              defaultValue:
                'This will remove {{name}} from your team. They will no longer have access to your organization.',
              name: member?.info ? `${member.info.firstName} ${member.info.lastName}` : member.email,
            })}
          </Text>
          <Flex justifyContent='flex-end' mt={4} gap={2}>
            <Button variant='outline' onClick={onClose}>
              {t('team.remove_member.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button colorScheme='red' onClick={removeMember}>
              {t('team.remove_member.confirm', { defaultValue: 'Remove' })}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const MemberActions = ({ member }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { isOpen: isRoleModalOpen, onOpen: openRoleModal, onClose: closeRoleModal } = useDisclosure()
  const { isOpen: isRemoveModalOpen, onOpen: openRemoveModal, onClose: closeRemoveModal } = useDisclosure()
  const inviteMember = useInviteMemberMutation()

  const id = member.info?.id

  // This function is not working right now.
  const resendInvitation = () => {
    inviteMember.mutate(member, {
      onSuccess: () => {
        toast({
          title: t('team.actions.resend_invitation_success', { defaultValue: 'Invitation resent successfully' }),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error: Error) => {
        toast({
          title: t('team.actions.resend_invitation_error', { defaultValue: 'Error resending invitation' }),
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
      <Popover isLazy>
        <PopoverTrigger>
          <IconButton icon={<Icon as={LuEllipsis} />} ml='auto' variant='transparent' aria-label='Options' />
        </PopoverTrigger>
        <PopoverContent w='auto'>
          <Text fontWeight='extrabold' p={2} fontSize='sm'>
            {t('team.actions.title', { defaultValue: 'Actions' })}
          </Text>
          {id ? (
            <>
              <Button
                onClick={openRoleModal}
                leftIcon={<Icon mr={2} as={LuUserCog} />}
                fontSize='sm'
                variant='transparent'
              >
                {t('team.actions.change_role', { defaultValue: 'Change Role' })}
              </Button>
              <PopoverFooter>
                <Button variant='transparent' colorScheme='red' fontSize='sm' onClick={openRemoveModal}>
                  {t('team.actions.remove_member', { defaultValue: 'Remove Member' })}
                </Button>
              </PopoverFooter>
            </>
          ) : (
            <Button
              leftIcon={<Icon mr={2} as={LuRefreshCw} />}
              fontSize='sm'
              variant='transparent'
              onClick={resendInvitation}
            >
              {t('team.actions.resend_invitation', { defaultValue: 'Resend Invitation' })}
            </Button>
          )}
        </PopoverContent>
      </Popover>
      {member.info && (
        <>
          <ChangeRoleModal isOpen={isRoleModalOpen} onClose={closeRoleModal} member={member} />
          <RemoveMemberModal isOpen={isRemoveModalOpen} onClose={closeRemoveModal} member={member} />
        </>
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
        <Text size='lg' fontWeight='extrabold'>
          {t('team.only_one_member.title', { defaultValue: 'No team members' })}
        </Text>
        <Text color='gray.500'>
          {t('team.only_one_member.subtitle', {
            defaultValue: 'Add team members to collaborate on your organization',
          })}
        </Text>
      </Flex>
      <InviteToTeamModal leftIcon={<Icon mr={2} as={LuPlus} />}>
        {t('team.only_one_member.add_first_member', { defaultValue: 'Add Your First Team Member' })}
      </InviteToTeamModal>
    </Flex>
  )
}

const TeamMembersList = ({ members }: { members: Member[] }) => {
  const { t } = useTranslation()

  return (
    <Flex direction='column'>
      {members.map((member, i) => {
        const isPending = !member.info
        const name = isPending
          ? t('team.pending_invitation', { defaultValue: 'Invitation Pending' })
          : `${member.info.firstName} ${member.info.lastName}`
        const email = isPending ? member.email : member.info.email
        const avatarName = !isPending && `${member.info.firstName} ${member.info.lastName}`

        return (
          <Flex alignItems='center' p={2} key={i}>
            <Avatar name={avatarName} icon={isPending && <Icon as={LuMail} />} />
            <Box ml='3'>
              <HStack align='center'>
                <Text fontWeight='bold'>{name}</Text>
                <Badge variant='subtle'>{ucfirst(member.role)}</Badge>
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
