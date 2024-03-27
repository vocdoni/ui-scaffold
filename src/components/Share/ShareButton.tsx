import { Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

export type ShareButtonProps = { url: string; caption: string } & ShareIconProps

interface ShareIconProps {
  variant?: string
  w?: number
  h?: number
}

type GenericShareButtonProps = {
  shareUrl: string
  icon: IconType
  network?: string
} & ShareIconProps

const ShareButton = ({ shareUrl, network = 'default', variant, icon, w = 6, h = 6 }: GenericShareButtonProps) => {
  const { t } = useTranslation()

  return (
    <Link
      href={shareUrl}
      target='_blank'
      title={t('process.share_title', { network: network })}
      rel='noopener noreferrer'
      variant={variant}
    >
      <Icon as={icon} w={w} h={h} cursor='pointer' />
    </Link>
  )
}

export default ShareButton
