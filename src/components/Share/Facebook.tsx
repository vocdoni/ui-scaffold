import { FaFacebook } from 'react-icons/fa'
import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'

const FacebookShare = ({ url, ...rest }: ShareButtonProps) => {
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`

  return <ShareButton shareUrl={facebook} icon={FaFacebook} network={'facebook'} {...rest} />
}

export default FacebookShare
