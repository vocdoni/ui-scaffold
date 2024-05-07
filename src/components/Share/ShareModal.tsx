import { useTranslation } from 'react-i18next'
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { LuShare } from 'react-icons/lu'
import {
  FacebookShare,
  MailShare,
  RedditShare,
  TelegramShare,
  TwitterShare,
  WhatsappShare,
} from '~components/Share/index'

const ShareModalButton = ({ caption = '', text }: { caption?: string; text?: string }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const rawUrl = document.location.href.split('#')[0] // Remove the PK after the hash
  const url = encodeURIComponent(rawUrl)

  const toast = useToast()
  const { onCopy } = useClipboard(rawUrl as string)
  const iconWidth = 9

  return (
    <>
      <Button onClick={onOpen} variant={'icon'}>
        <Icon as={LuShare} title={t('share.icon_title')} aria-label={t('share.icon_title')} />
        {text && (
          <Text pl={2} as='span'>
            {text}
          </Text>
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('share.modal_title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={8}>
            <Flex
              flexDirection={'row'}
              alignItems={{ base: 'start', xl: 'center' }}
              flexWrap={'wrap'}
              gap={3}
              justifyContent={'space-between'}
            >
              <TwitterShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
              <FacebookShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
              <TelegramShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
              <RedditShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
              <MailShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
              <WhatsappShare h={iconWidth} w={iconWidth} variant={'icon'} url={url} caption={caption} />
            </Flex>
          </ModalBody>
          <ModalFooter mt={8}>
            <Flex direction={'column'} gap={4} w={'full'}>
              <InputGroup size='md'>
                <Input
                  placeholder={rawUrl}
                  disabled
                  isTruncated
                  sx={{
                    '::placeholder': {
                      // Set the font size of the placeholder
                      fontSize: 'sm', // You can use Chakra's size tokens (sm, md, lg, etc.)
                    },
                  }}
                />
              </InputGroup>
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
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShareModalButton
