import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'
import { FaReddit } from 'react-icons/fa'

const RedditShare = ({ url, caption, ...rest }: ShareButtonProps) => {
  const reddit = `https://reddit.com/submit?url=${url}&title=${caption}`

  return <ShareButton shareUrl={reddit} icon={FaReddit} network={'reddit'} {...rest} />
}

export default RedditShare
