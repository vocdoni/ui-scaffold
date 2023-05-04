import { Box, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
  useClientContext,
} from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProcessActions from './Actions'
import { ProcessDate } from './Date'

interface Props {
  election: PublishedElection
}

const ProcessCardDetailed = ({ election }: Props) => {
  const { t } = useTranslation()
  const { account } = useClientContext()

  return (
    <Link to={`/processes/0x${election.id}`}>
      <ElectionProvider election={election}>
        <Card variant='detailed'>
          <CardHeader>
            <ElectionStatusBadge />
          </CardHeader>
          <CardBody>
            <Box>
              <Text>{format(new Date(election?.creationTime), 'dd MMM, yyyy')}</Text>
              <ElectionTitle as='h4' noOfLines={2} />
              <Box>
                <ElectionDescription noOfLines={3} />
              </Box>
            </Box>
            {election?.status !== ElectionStatus.CANCELED && (
              <Box>
                <ProcessDate />
                <Box>
                  <Text>{t('process.voters')}</Text>
                  <Text>{election?.voteCount}</Text>
                </Box>
              </Box>
            )}
          </CardBody>
          {election?.organizationId === account?.address &&
            (election?.status === ElectionStatus.ONGOING || election?.status === ElectionStatus.PAUSED) && (
              <CardFooter>
                <ProcessActions />
              </CardFooter>
            )}
        </Card>
      </ElectionProvider>
    </Link>
  )
}

export default ProcessCardDetailed
