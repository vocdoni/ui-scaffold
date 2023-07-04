import {
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'

export const Disclaimer = () => {
  const [closed, setClosed] = useState(window.localStorage.getItem('vocdoni.disclaimer-modal'))

  return (
    <Modal
      isOpen={!closed}
      onClose={() => {
        setClosed('yup')
        window.localStorage.setItem('vocdoni.disclaimer-modal', 'yup')
      }}
      size='4xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Disclaimer</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack gap={3}>
            <p>
              This is a DEMO frontend build for showcase purposes. All the data on this homepage is placeholder. You can
              navigate and create elections to better understand how to use the Vocdoni tech stack.
            </p>
            <p>Built with ❤️ by Vocdoni using:</p>
            <p>
              <Link href='https://github.com/vocdoni/ui-components' fontWeight='bold'>
                UI-Components
              </Link>
              : React components made with Chakra. This project aims to ease the creation of voting user interfaces,
              allowing developers to easily style everything as desired and choose from a variety of different voting
              flow components.
            </p>
            <p>
              <Link href='https://github.com/vocdoni/vocdoni-sdk' fontWeight='bold'>
                SDK
              </Link>
              : A Typescript library. The Vocdoni SDK is a convenient way to interact with the Vocdoni Protocol through
              the new API, allowing anyone to create, manage, and participate in voting processes and collective
              decision-making.
            </p>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
