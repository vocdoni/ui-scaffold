import { FaTelegram } from 'react-icons/fa'
import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'

const TelegramShare = ({ url, caption, ...rest }: ShareButtonProps) => {
  const telegram = `https://t.me/share/url?url=${url}&text=${caption}`

  return <ShareButton shareUrl={telegram} icon={FaTelegram} network={'telegram'} {...rest} />
}

export default TelegramShare
