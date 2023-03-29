import { ButtonGroup, IconButton, ToastId, useToast } from '@chakra-ui/react'
import { useClientContext, useElection } from '@vocdoni/react-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'

const ProcessActions = () => {
  const { client } = useClientContext()
  const { election } = useElection()
  const { t } = useTranslation()
  const toast = useToast()
  const tRef = useRef<ToastId>()

  if (!election) return null

  const closeToast = () => {
    if (tRef.current) {
      toast.close(tRef.current)
    }
  }

  const infoToast = (description: string) => {
    tRef.current = toast({
      title: t('process.actions.waiting_title'),
      description: t('process.actions.continue_description', {
        election,
      }),
      isClosable: false,
      duration: null,
    })
  }

  const errorToast = (description: string) => {
    toast({
      description,
      title: t('process.actions.error_title'),
      duration: 7000,
      status: 'error',
    })
  }

  return (
    <ButtonGroup size='sm' isAttached variant='outline' position='relative'>
      <IconButton
        aria-label={t('process_actions.play')}
        icon={<FaPlay />}
        onClick={async () => {
          infoToast(t('process.actions.continue_description', { election }))

          try {
            await client.continueElection(election.id)
          } catch (e: any) {
            if ('message' in e) {
              errorToast(e.message)
            }
            console.warn('catched error in "continue" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={election.status === ElectionStatus.ONGOING}
      />
      <IconButton
        aria-label={t('process_actions.pause')}
        icon={<FaPause />}
        onClick={async () => {
          infoToast(t('process.actions.pause_description', { election }))

          try {
            await client.pauseElection(election.id)
          } catch (e: any) {
            if ('message' in e) {
              errorToast(e.message)
            }
            console.warn('catched error in "pause" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={election.status === ElectionStatus.PAUSED}
      />
      <IconButton
        aria-label={t('process_actions.stop')}
        icon={<FaStop />}
        onClick={async () => {
          infoToast(t('process.actions.cancel_description', { election }))

          try {
            await client.cancelElection(election.id)
          } catch (e: any) {
            if ('message' in e) {
              errorToast(e.message)
            }
            console.warn('catched error in "cancel" action', e)
          } finally {
            closeToast()
          }
        }}
      />
    </ButtonGroup>
  )
}

export default ProcessActions
