import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'
import { FaTwitter } from 'react-icons/fa'

const TwitterShare = ({ url, caption, ...rest }: ShareButtonProps) => {
  const linked = encodeURIComponent(`${caption} — ${document.location.href}`)
  const twitter = `https://twitter.com/intent/tweet?text=${linked}`

  return <ShareButton shareUrl={twitter} icon={FaTwitter} network={'twitter'} {...rest} />
}

export default TwitterShare
