import { Button, Flex, Text } from '@chakra-ui/react'
import { ElectionStatusBadge } from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { FormatDate } from '../../constants'

interface Props {
  el: PublishedElection
}

const ModalProcessInfo = ({ el }: Props) => (
  <Flex
    direction='column'
    justifyContent='center'
    alignItems='center'
    gap={4}
    p={4}
  >
    <ElectionStatusBadge />
    <Text>Creation date: {format(el.creationTime, FormatDate)}</Text>
    <Text>Start date: {format(el.startDate, FormatDate)}</Text>
    <Text>End date: {format(el.endDate, FormatDate)}</Text>
    <Button alignSelf='center' mt={12}>
      <Link to={`/${el.id}`}>More info</Link>
    </Button>
  </Flex>
)

export default ModalProcessInfo
