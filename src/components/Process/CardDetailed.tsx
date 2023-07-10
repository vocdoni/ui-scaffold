import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
  useElection,
} from '@vocdoni/chakra-components'
import { ElectionStatus, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDateFns } from '../../i18n/use-date-fns'
import { ProcessDate } from './Date'

interface Props {
  election: PublishedElection
}

const ProcessCardDetailed = ({ election }: Props) => {
  return (
    <ElectionProvider election={election}>
      <Link to={`/processes/0x${election.id}`}>
        <Card variant='detailed'>
          <CardHeader>
            <ElectionStatusBadge />
          </CardHeader>
          <CardBody>
            <Box>
              <Box>
                <ProcessDetailedCreationDate />
                <ProcessDetailedCardBody />
              </Box>
              <ElectionActions />
            </Box>
            <ProcessDetailedCardFooter />
          </CardBody>
        </Card>
      </Link>
    </ElectionProvider>
  )
}

export default ProcessCardDetailed

const ProcessDetailedCreationDate = () => {
  const { election } = useElection()
  const { format } = useDateFns()

  if (!election?.creationTime) return null

  return <Text>{format(new Date(election.creationTime), 'PPP')}</Text>
}

const ProcessDetailedCardBody = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (election instanceof InvalidElection) {
    return (
      <Text fontStyle='italic' color='primary.main'>
        {t('process.is_invalid')}
      </Text>
    )
  }

  return (
    <>
      <ElectionTitle as='p' />
      {election?.status !== ElectionStatus.CANCELED ? (
        <Box>
          <ElectionDescription />
        </Box>
      ) : (
        <Box>
          <Text>{t('process.status.canceled')}</Text>
        </Box>
      )}
    </>
  )
}

const ProcessDetailedCardFooter = () => {
  const { t } = useTranslation()
  const { election } = useElection()

  if (election instanceof InvalidElection) {
    return null
  }

  if (election?.status === ElectionStatus.CANCELED) return null

  return (
    <Box>
      <ProcessDate />
      <Box>
        <Text>{t('process.voters')}</Text>
        <Text>{election?.voteCount}</Text>
      </Box>
    </Box>
  )
}
