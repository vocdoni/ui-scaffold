import { Heading, Text } from '@chakra-ui/react'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'
import Votings from '~components/Organization/Dashboard/Votings'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { DashboardContents } from '~shared/Dashboard/Contents'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const data = useLoaderData() as ElectionListWithPagination
  const { status } = useParams<{ status?: string }>()

  // Set page title
  useEffect(() => {
    setBreadcrumb([
      {
        title: t('voting_processes', { defaultValue: 'Voting processes' }),
      },
    ])
  }, [setBreadcrumb])

  return (
    <DashboardContents display='flex' flexDirection='column'>
      <Heading fontSize='2xl' fontWeight='extrabold' textTransform='capitalize'>
        {t('voting_processes')}
      </Heading>
      <Text mb={6}>{t('voting_processes_description')}</Text>
      <Votings data={data as ElectionListWithPagination} status={status} />
    </DashboardContents>
  )
}

export default OrganizationVotings
