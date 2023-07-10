import { Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const ShareButtons = () => {
  const { t } = useTranslation()
  return (
    <>
      <Icon
        onClick={() => {
          const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`
          window.open(url, '_blank')
        }}
        aria-label={t('share.twitter').toString()}
        as={FaTwitter}
        w={6}
        h={6}
        cursor='pointer'
      />
      <Icon
        onClick={() => {
          const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
          window.open(url, '_blank')
        }}
        aria-label={t('share.facebook').toString()}
        as={FaFacebook}
        w={6}
        h={6}
        cursor='pointer'
      />
    </>
  )
}

export default ShareButtons
