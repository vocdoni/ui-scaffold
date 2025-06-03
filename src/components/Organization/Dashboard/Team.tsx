import { Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuUserPlus } from 'react-icons/lu'
import { InviteToTeamModal } from '~components/Organization/Invite'
import { TeamMembers } from '~components/Organization/Team'
import { DashboardBox } from '~components/shared/Dashboard/Contents'

const OrganizationTeam = () => {
  const { t } = useTranslation()
  return (
    <DashboardBox>
      <Flex>
        <Flex flex={1} direction='column'>
          <Heading size='md' fontWeight='extrabold'>
            {t('organization_settings.team.title', { defaultValue: 'Team Members' })}
          </Heading>
          <Text color='gray.500' size='sm'>
            {t('organization_settings.team.subtitle', {
              defaultValue: "Manage your organization's team members and their permissions.",
            })}
          </Text>
        </Flex>
        <InviteToTeamModal leftIcon={<Icon mr={2} as={LuUserPlus} />}>
          {t('organization_settings.team.add_team_member', { defaultValue: 'Add team member' })}
        </InviteToTeamModal>
      </Flex>
      <TeamMembers />
    </DashboardBox>
  )
}

export default OrganizationTeam
