import { Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const ShareRrss = () => {
  const { t } = useTranslation()
  return (
    <>
      <Icon
        aria-label={t('link', { link: 'twitter' }).toString()}
        as={FaTwitter}
        w={6}
        h={6}
        cursor='pointer'
        onClick={() => {
          const url = `https://twitter.com/intent/tweet?url=${window.location.href}&text=share`
          window.open(url, '_blank')
        }}
      />
      <Icon
        aria-label={t('link', { link: 'twitter' }).toString()}
        as={FaFacebook}
        w={6}
        h={6}
        cursor='pointer'
        onClick={() => {
          const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
          window.open(url, '_blank')
        }}
      />
    </>
  )
}

export default ShareRrss
