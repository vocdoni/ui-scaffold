import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ProcessDate } from './Date'

const ProcessCardDescription = ({
  election,
}: {
  election: PublishedElection
}) => {
  const { t } = useTranslation()

  return (
    <ElectionProvider election={election}>
      <Card variant='process_description'>
        <CardHeader>
          <ElectionStatusBadge />
        </CardHeader>
        <CardBody>
          <Box>
            <Text>
              {format(new Date(election.creationTime), 'dd MMM, yyyy')}
            </Text>
            <ElectionTitle as='h4' noOfLines={2} />
            <Box>
              <ElectionDescription />
            </Box>
          </Box>
          <Box>
            <Box>
              <ProcessDate />
            </Box>
            <Box>
              <Text>{t('process.voters')}</Text>
              <Text>{election.voteCount}</Text>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </ElectionProvider>
  )
}

export default ProcessCardDescription
