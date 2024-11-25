import { Td, Tr } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle, QuestionsTypeBadge } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { InvalidElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useDateFns } from '~i18n/use-date-fns'

const ProcessCard = () => {
  const { election } = useElection()
  const { format } = useDateFns()
  const { t } = useTranslation()

  if (!election || election instanceof InvalidElection) return null

  return (
    <Tr>
      <Td>
        <ElectionTitle mb={0} fontSize='md' textAlign='left' fontWeight='500' isTruncated />
      </Td>
      <Td>
        {format(election.startDate, t('organization.date_format'))} -{' '}
        {format(election.endDate, t('organization.date_format'))}
      </Td>
      <Td>
        <QuestionsTypeBadge />
      </Td>
      <Td>
        <ElectionStatusBadge />
      </Td>
      <Td>
        {election.voteCount}/{election.census.size}
      </Td>
    </Tr>
  )
}

export default ProcessCard
