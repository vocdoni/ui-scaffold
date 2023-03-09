import { InfoIcon } from '@chakra-ui/icons'
import { Box, ButtonGroup, HStack, IconButton } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'

interface Props {
  el: PublishedElection
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>
}

const getButtonsDisabled = (
  el: PublishedElection,
  electionStatus: ElectionStatus
) => {
  const now = new Date()

  const isStarted = now.getTime() > el.startDate.getTime()

  const allDisabled =
    !isStarted ||
    el.status === ElectionStatus.RESULTS ||
    el.status === ElectionStatus.CANCELED ||
    el.status === ElectionStatus.ENDED

  const readyDisabled = el.status === ElectionStatus.READY
  const pauseDisabled = el.status === ElectionStatus.PAUSED

  if (electionStatus === ElectionStatus.READY)
    return allDisabled || readyDisabled

  if (electionStatus === ElectionStatus.PAUSED)
    return allDisabled || pauseDisabled

  if (electionStatus === ElectionStatus.CANCELED) return allDisabled
}

const ProcessListActionButtons = ({ el, setElectionsList }: Props) => {
  const { client } = useClientContext()

  // const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAction = async (action: string) => {
    // onOpen()
    try {
      if (action === ElectionStatus.READY) await client.continueElection(el.id)
      if (action === ElectionStatus.PAUSED) await client.pauseElection(el.id)
      if (action === ElectionStatus.CANCELED) await client.cancelElection(el.id)
    } catch (err) {
      console.log(err)
    } finally {
      setElectionsList([])
      // onClose()
    }
  }

  return (
    <HStack spacing={4} justifyContent='end' flex='0 0 160px'>
      {/* <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <ModalLoading />
        <ModalProcessInfo el={el} />
      </ModalWrapper> */}
      <Box position='relative'>
        <ButtonGroup size='sm' isAttached variant='outline' position='relative'>
          <>
            <IconButton
              aria-label='Search database'
              icon={<FaPlay />}
              onClick={() => handleAction(ElectionStatus.READY)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.READY)}
            />
            <IconButton
              aria-label='Search database'
              icon={<FaPause />}
              onClick={() => handleAction(ElectionStatus.PAUSED)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.PAUSED)}
            />
            <IconButton
              aria-label='Search database'
              icon={<FaStop />}
              onClick={() => handleAction(ElectionStatus.CANCELED)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.CANCELED)}
            />
          </>
        </ButtonGroup>
      </Box>

      {/* <InfoIcon boxSize={6} cursor='pointer' onClick={() => onOpen()} /> */}
      <InfoIcon boxSize={6} cursor='pointer' />
    </HStack>
  )
}

export default ProcessListActionButtons
