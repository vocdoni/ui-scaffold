import { useTranslation } from 'react-i18next'
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { LuShare } from 'react-icons/lu'
import { FacebookShare, RedditShare, TelegramShare, TwitterShare } from '~components/Share/index'

const ShareModalButton = ({ caption = '' }: { caption?: string }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const rawUrl = document.location.href.split('#')[0] // Remove the PK after the hash
  const url = encodeURIComponent(rawUrl)

  const toast = useToast()
  const { onCopy } = useClipboard(rawUrl as string)

  return (
    <>
      <IconButton
        variant={'icon'}
        icon={<LuShare />}
        title={t('share.icon_title')}
        aria-label={t('share.icon_title')}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('share.modal.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={'row'}
              alignItems={{ base: 'start', xl: 'center' }}
              flexWrap={'wrap'}
              gap={3}
              justifyContent={'space-between'}
            >
              <TwitterShare variant={'icon'} url={url} caption={caption} />
              <FacebookShare variant={'icon'} url={url} caption={caption} />
              <TelegramShare variant={'icon'} url={url} caption={caption} />
              <RedditShare variant={'icon'} url={url} caption={caption} />
            </Flex>
          </ModalBody>
          <ModalFooter mt={8}>
            <InputGroup size='md'>
              <Input placeholder={rawUrl} pr='4.5rem' />
              <InputRightElement width='4.5rem'>
                <Button
                  borderRadius={'unset'}
                  variant={'primary'}
                  onClick={() => {
                    toast({
                      title: t('copy.copied_title'),
                      duration: 3000,
                    })
                    onCopy()
                  }}
                >
                  {t('share.copy')}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShareModalButton
