import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
  HR,
} from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { ProcessDate } from './Date'

const ProcessCard = ({ election }: { election: PublishedElection }) => {
  const { t } = useTranslation()
  return (
    <ElectionProvider election={election}>
      <Card variant='process'>
        <CardHeader>
          <ElectionTitle as='h4' />
          <ElectionStatusBadge />
        </CardHeader>
        <CardBody>
          <ElectionDescription />
        </CardBody>
        <HR />
        <CardFooter>
          <ProcessDate />
          <Box>
            <Text color='branding.purple'>{t('process.votes')}</Text>
            <Text>{election?.voteCount}</Text>
          </Box>
        </CardFooter>
      </Card>
    </ElectionProvider>
  )
}

export default ProcessCard
