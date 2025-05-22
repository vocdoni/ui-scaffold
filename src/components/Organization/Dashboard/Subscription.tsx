import { Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { isBefore, isValid, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useSubscription } from '~components/Auth/Subscription'
import { DashboardBox } from '~components/Layout/Dashboard'
import { SubscriptionPlans } from '~components/Pricing/Plans'
import { usePortalSession } from '../Subscription'

const SubscriptionPage = () => {
  const { t } = useTranslation()
  const { subscription, loading } = useSubscription()
  const { mutateAsync } = usePortalSession()

  const handleChangeClick = () =>
    mutateAsync()
      .then((res) => {
        window.open(res.portalURL, '_blank')
      })
      .catch(() => console.log('Error fetching portal URL'))

  if (loading) return <Progress isIndeterminate />

  const lastPaymentDate = parseISO(subscription?.subscriptionDetails.lastPaymentDate)
  const isFree =
    subscription?.plan.startingPrice === 0 &&
    (!isValid(lastPaymentDate) || isBefore(lastPaymentDate, new Date('1971-01-01')))

  return (
    <DashboardBox p={6}>
      <Flex>
        <Flex flex={1} direction='column'>
          <Heading size='md' fontWeight='extrabold'>
            {t('subscription_plan.title', { defaultValue: 'Subscription Plan' })}
          </Heading>
          <Text mb={6} color='gray.500' size='sm'>
            {t('subscription_plan.subtitle', {
              defaultValue: 'Manage your subscription plan and billing cycle.',
            })}
          </Text>
        </Flex>
        {!isFree && (
          <Button onClick={() => handleChangeClick()}>
            {t('billing_details', { defaultValue: 'Billing Details' })}
          </Button>
        )}
      </Flex>
      <SubscriptionPlans hidePlanActions={false} />
    </DashboardBox>
  )
}

export default SubscriptionPage
