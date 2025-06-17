import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react'

export type DeleteModalProps = {
  title: string | React.ReactNode
  subtitle: string | React.ReactNode
  children: React.ReactNode
} & ModalProps

const DeleteModal = ({ title, subtitle, children, ...modalProps }: DeleteModalProps) => {
  return (
    <Modal size='lg' {...modalProps}>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader p={0}>
          <Flex flexDirection='column' gap={3}>
            <Heading size='sm'>{title}</Heading>
            <Text size='sm' color='texts.subtle'>
              {subtitle}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
