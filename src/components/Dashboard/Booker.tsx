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

const Booker = () => {
  const { colorMode } = useColorMode()

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view', theme: colorMode })
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

export const BookerModalButton = (props: ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<Icon as={LuCalendar} boxSize={4} />}
        colorScheme='gray'
        variant='outline'
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
            <Booker />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
