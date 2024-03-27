import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'
import { FaTelegram } from 'react-icons/fa'

const TelegramShare = ({ url, caption, ...rest }: ShareButtonProps) => {
  const telegram = `https://t.me/share/url?url=${url}&text=${caption}`

  return <ShareButton shareUrl={telegram} icon={FaTelegram} network={'telegram'} {...rest} />
}

export default TelegramShare
