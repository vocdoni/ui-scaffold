import { useTranslation } from 'react-i18next'
import { Subscription } from '~components/Organization/Subscription'

const SubscriptionPage = () => {
  const { t } = useTranslation()

  return <Subscription />
}

export default SubscriptionPage
