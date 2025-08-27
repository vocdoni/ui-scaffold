import { Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { isBefore, isValid, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { SubscriptionPlans } from '~components/Pricing/Plans'
import { DashboardBox } from '~shared/Dashboard/Contents'

export const usePortalSession = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  return useMutation({
    mutationFn: () =>
      bearedFetch<{ portalURL: string }>(
        ApiEndpoints.SubscriptionPortal.replace('{address}', ensure0x(account?.address))
      ),
  })
}

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
          <Heading size='md'>{t('subscription_plan.title', { defaultValue: 'Subscription Plan' })}</Heading>
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
