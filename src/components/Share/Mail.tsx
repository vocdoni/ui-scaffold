import ShareButton, { ShareButtonProps } from '~components/Share/ShareButton'
import { IoMdMail } from 'react-icons/io'
import objectToGetParams from '~components/Share/utils'
import { useTranslation } from 'react-i18next'

const MailShare = ({ subject, url, caption, ...rest }: ShareButtonProps & { subject?: string }) => {
  const { t } = useTranslation()
  const _subject = subject ?? t('share.mail_subject')
  const mail = 'mailto:' + objectToGetParams({ _subject, body: caption ? caption + '\n' + url : url })

  return <ShareButton shareUrl={mail} icon={IoMdMail} network={'mail'} {...rest} />
}

export default MailShare
