import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Progress,
  Text,
} from '@chakra-ui/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { enforceHexPrefix, useClient } from '@vocdoni/react-providers'
import { formatDistanceToNow } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { LuEllipsis, LuMail, LuPlus, LuRefreshCw, LuUserCog, LuUserPlus } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { QueryKeys } from '~src/queries/keys'
import { useInviteMemberMutation, useRemoveMemberMutation } from '~src/queries/organization'
import { ucfirst } from '~utils/strings'
import { InviteToTeamModal } from './Invite'

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

const MemberActions = ({ member }) => {
  const id = member.info?.id
  const inviteMember = useInviteMemberMutation()
  const removeMemberById = useRemoveMemberMutation()

  const resendInvitation = () => {
    inviteMember.mutate(member, {
      onSuccess: () => {
        console.log('Invitation resent')
      },
      onError: (error: Error) => {
        console.log('error', error)
      },
    })
  }

  const removeMember = () => {
    removeMemberById.mutate(id, {
      onSuccess: () => {
        console.log('Member removed')
      },
      onError: (error: Error) => {
        console.log('error', error)
      },
    })
  }

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton icon={<Icon as={LuEllipsis} />} ml='auto' variant='transparent' aria-label='Options' />
      </PopoverTrigger>
      <PopoverContent w='auto'>
        <Text fontWeight='extrabold' p={2} fontSize='sm'>
          Actions
        </Text>
        {id ? (
          <>
            <Button leftIcon={<Icon mr={2} as={LuUserCog} />} fontSize='sm' variant='transparent'>
              Change Role
            </Button>
            <PopoverFooter>
              <Button variant='transparent' colorScheme='red' fontSize='sm' onClick={() => removeMember()}>
                Remove member
              </Button>
            </PopoverFooter>
          </>
        ) : (
          <Button
            leftIcon={<Icon mr={2} as={LuRefreshCw} />}
            fontSize='sm'
            variant='transparent'
            onClick={() => resendInvitation()}
          >
            Resend Invitation
          </Button>
        )}
      </PopoverContent>
    </Popover>
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
