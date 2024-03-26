import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'
import { FaFacebook } from 'react-icons/fa'

const FacebookShare = ({ url, ...rest }: ShareButtonProps) => {
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`

  return <ShareButton shareUrl={facebook} icon={FaFacebook} network={'facebook'} {...rest} />
}

export default FacebookShare
