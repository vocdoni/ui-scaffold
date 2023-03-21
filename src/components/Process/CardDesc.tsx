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

const ProcessCardDescription = ({
  election,
}: {
  election: PublishedElection
}) => {
  const { t } = useTranslation()

  return (
    <ElectionProvider election={election}>
      <Card variant='processDescription'>
        <CardHeader>
          <ElectionStatusBadge />
        </CardHeader>
        <CardBody>
          <Box>
            <Text>
              {format(new Date(election.creationTime), 'dd MMM, yyyy')}
            </Text>
            <ElectionTitle as='h4' />
            <ElectionDescription />
          </Box>
          <Box>
            <Box>
              <Text>{t('process.date.ends')}</Text>
              <Text>in 6 days</Text>
            </Box>
            <Box>
              <Text>{t('process.voters')}</Text>
              <Text>20</Text>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </ElectionProvider>
  )
}

export default ProcessCardDescription
