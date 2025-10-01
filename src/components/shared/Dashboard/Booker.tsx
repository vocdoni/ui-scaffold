import Cal, { getCalApi } from '@calcom/embed-react'
import {
  Button,
  ButtonProps,
  Code,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Trans } from 'react-i18next'
import { LuCalendar } from 'react-icons/lu'
import { SetupStepIds, useOrganizationSetup } from '~queries/organization'

type BookerProps = {
  callback?: () => void
}

export const Booker = ({ callback }: BookerProps) => {
  const { colorMode } = useColorMode()

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view', theme: colorMode })
      cal('on', {
        action: 'bookingSuccessfulV2',
        callback,
      })
    })()
  }, [])

  if (!import.meta.env.CALCOM_EVENT_SLUG) {
    return (
      <Text>
        Hey developer, you forgot to define <Code>CALCOM_EVENT_SLUG</Code> env var 🥲
      </Text>
    )
  }

  return (
    <Cal
      namespace='30min'
      calLink={import.meta.env.CALCOM_EVENT_SLUG}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}

export type BookerModalButtonProps = ButtonProps & BookerProps

export const BookerModalButton = ({ callback, ...props }: BookerModalButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<Icon as={LuCalendar} boxSize={4} />}
        colorScheme='gray'
        variant='outline'
        whiteSpace='wrap'
        size='md'
        onClick={onOpen}
        children={<Trans i18nKey='home.support.btn_watch' />}
        {...props}
      />
      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Booker callback={callback} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const DashboardBookerModalButton = (props: ButtonProps) => {
  const { setStepDone } = useOrganizationSetup()

  return (
    <BookerModalButton
      callback={() => {
        setStepDone(SetupStepIds.expertCallBooking)
      }}
      {...props}
    />
  )
}
