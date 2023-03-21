import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'
import { format, formatDistance } from 'date-fns'
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
          <Box px={4} pt={1}>
            <Text color='branding.purple'>
              {election.startDate > election.endDate
                ? t('process.date.starts')
                : new Date() < election.endDate
                ? t('process.date.ends')
                : t('process.date.ended')}
            </Text>
            <Text>
              {formatDistance(new Date(), election.endDate!)}{' '}
              {new Date() > election.endDate && t('process.date.ago')}
            </Text>
          </Box>

          <Box>
            <Text color='branding.purple'>{t('process.votes')}</Text>
            <Text>{election?.voteCount}</Text>
          </Box>
        </CardBody>
      </Card>
    </ElectionProvider>
  )
}

export default ProcessCardDescription
