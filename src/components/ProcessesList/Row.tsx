import { Box, Text } from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'
import { Link } from 'react-router-dom'
import WrapperListRow from './WrapperRow'
import ProcessListActionButtons from './ActionButtons'

interface Props {
  el: PublishedElection
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>
}

const ProcessListRow = ({ el, setElectionsList }: Props) => {
  return (
    <WrapperListRow>
      <>
        <Box isTruncated flex='1 1 auto' cursor='pointer'>
          <Link to={`/${el.id}`}>
            <Text width='100%' isTruncated title={el.title.default}>
              {el.title.default}
            </Text>
            <Text width='100%' color='gray.500' isTruncated title={el.id}>
              {el.id}
            </Text>
          </Link>
        </Box>
        <ProcessListActionButtons el={el} setElectionsList={setElectionsList} />
      </>
    </WrapperListRow>
  )
}

export default ProcessListRow
