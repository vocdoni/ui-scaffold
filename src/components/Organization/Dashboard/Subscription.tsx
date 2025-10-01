import { Button, Flex, Heading, Link, Progress, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { isBefore, isValid, parseISO } from 'date-fns'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { ComparisonTable } from '~components/Pricing/ComparisonTable'
import { SubscriptionPlans } from '~components/Pricing/Plans'
import { Routes } from '~routes'
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
  const [showComparisonTable, setShowComparisonTable] = useState(false)

  const handleChangeClick = () =>
    mutateAsync()
      .then((res) => {
        window.open(res.portalURL, '_blank')
      })
      .catch((e) => console.error('Error fetching portal URL', e))

  const toggleComparisonTable = () => setShowComparisonTable((prev) => !prev)

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
          <Text mb={6} color='texts.subtle' size='sm'>
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
      <SubscriptionPlans />
      <Flex justifyContent='center'>
        <Button colorScheme='black' variant='outline' onClick={toggleComparisonTable} mb={6}>
          {showComparisonTable
            ? t('subscription_plan.hide_comparison_table', { defaultValue: 'Show less features' })
            : t('subscription_plan.show_comparison_table', { defaultValue: 'View all features' })}
        </Button>
      </Flex>
      {showComparisonTable && <ComparisonTable />}
      <Flex justifyContent='center' alignItems='center' flexDirection='column'>
        <Text fontSize='sm' color='texts.subtle' textAlign='center'>
          <Trans i18nKey='subscription_plan.gdpr_compliance'>All plans include GDPR compliance.</Trans>
        </Text>
        <Flex gap={1}>
          <Trans i18nKey='subscription_plan.need_help'>
            <Text fontSize='sm' color='texts.subtle' textAlign='center'>
              Need help choosing?
            </Text>
            <Link fontWeight='extrabold' fontSize='sm' as={ReactRouterLink} to={Routes.dashboard.settings.support}>
              Contact our sales team
            </Link>
          </Trans>
        </Flex>
      </Flex>
    </DashboardBox>
  )
}

export default SubscriptionPage
