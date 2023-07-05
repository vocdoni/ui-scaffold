import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import { ElectionDescription, ElectionStatusBadge, ElectionTitle, useElection } from '@vocdoni/chakra-components'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ProcessDate } from './Date'

const ProcessCard = () => (
  <Card variant='process-description'>
    <CardHeader>
      <ElectionStatusBadge />
    </CardHeader>
    <CardBody>
      <ProcessCardHeading />
      <ProcessCardBody />
    </CardBody>
  </Card>
)

export default ProcessCard

const ProcessCardHeading = () => (
  <Box>
    <ProcessCreationDate />
    <ElectionTitle as='h4' noOfLines={2} />
    <Box>
      <ElectionDescription />
    </Box>
  </Box>
)

const ProcessCreationDate = () => {
  const { election } = useElection()
  if (!election?.creationTime) return null

  return <Text>{format(new Date(election.creationTime), 'dd MMM, yyyy')}</Text>
}

const ProcessCardBody = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (election instanceof InvalidElection) {
    return (
      <Text fontStyle='italic' color='brand.color'>
        {t('process.is_invalid')}
      </Text>
    )
  }

  return election?.status !== ElectionStatus.CANCELED ? (
    <Box>
      <Box>
        <ProcessDate />
      </Box>
      <Box>
        <Text>{t('process.voters')}</Text>
        <Text>{election?.voteCount}</Text>
      </Box>
    </Box>
  ) : (
    <Box>
      <Text>{t('process.status.canceled')}</Text>
    </Box>
  )
}
