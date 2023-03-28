import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { ElectionStatus, VocdoniSDKClient } from '@vocdoni/sdk'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'

interface Props {
  client: VocdoniSDKClient
  status: ElectionStatus
  id: string | undefined
}

const ProcessActions = ({ client, id, status }: Props) => {
  return (
    <ButtonGroup size='sm' isAttached variant='outline' position='relative'>
      <IconButton
        aria-label='Search database'
        icon={<FaPlay />}
        onClick={async () => await client.continueElection(id)}
        isDisabled={status === ElectionStatus.ONGOING}
      />
      <IconButton
        aria-label='Search database'
        icon={<FaPause />}
        onClick={async () => await client.pauseElection(id)}
        isDisabled={status === ElectionStatus.PAUSED}
      />
      <IconButton
        aria-label='Search database'
        icon={<FaStop />}
        onClick={async () => await client.cancelElection(id)}
      />
    </ButtonGroup>
  )
}

export default ProcessActions
