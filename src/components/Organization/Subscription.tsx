import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Link,
  Progress,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { Trans } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useMutation } from 'wagmi'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { PlanId } from '~constants'
import { Routes } from '~src/router/routes'
import { currency } from '~utils/numbers'

export const Subscription = () => {
  const { openModal } = usePricingModal()

  return (
    <VStack gap={4} w='full'>
      <Button as={RouterLink} to={Routes.plans} alignSelf='end'>
        <Trans i18nKey='view_plans_and_pricing'>View Plans & Pricing</Trans>
      </Button>
      <SubscriptionList />
    </VStack>
  )
}

const usePortalSession = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  return useMutation({
    mutationFn: () =>
      bearedFetch<{ portalURL: string }>(
        ApiEndpoints.SubscriptionPortal.replace('{address}', ensure0x(account?.address))
      ),
  })
}

export const SubscriptionList = () => {
  const { subscription, loading } = useSubscription()
  const { mutateAsync, isLoading } = usePortalSession()
  const toast = useToast()

  if (loading) {
    return <Progress size='xs' isIndeterminate />
  }

  if (!subscription) {
    return null
  }

  const handleChangeClick = () =>
    mutateAsync()
      .then((res) => {
        window.open(res.portalURL, '_blank')
      })
      .catch(() => {
        toast({
          status: 'error',
          title: 'Request error',
          description:
            'There was an error trying to fulfill your request, please retry and, if the problem persists, contact support.',
        })
      })

  const isFree = subscription.plan.id === PlanId.Free
  const { openModal } = usePricingModal()

  return (
    <VStack gap={4} w='full' mt='8'>
      {!subscription.subscriptionDetails.active && (
        <Alert status='warning' w='full'>
          <AlertIcon />
          <AlertTitle>
            <Trans i18nKey='subscription.inactive_subscription_title'>Inactive Subscription</Trans>
          </AlertTitle>
          <AlertDescription>
            <Trans i18nKey='subscription.inactive_subscription_description'>
              Your subscription is currently inactive. Consider{' '}
              <Link as={RouterLink} to={Routes.contact}>
                contacting us
              </Link>{' '}
              to reactivate it.
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      <TableContainer w='full'>
        <Table size='sm' variant={'subscription'}>
          <Thead>
            <Tr>
              <Th>
                <Trans i18nKey='subscription.your_subscription'>Your Subscription</Trans>
              </Th>
              <Th>
                <Trans i18nKey='subscription.price'>Price</Trans>
              </Th>
              <Th>
                <Trans i18nKey='subscription.since'>Since</Trans>
              </Th>
              <Th>
                <Trans i18nKey='subscription.next_billing'>Next Billing</Trans>
              </Th>
              <Th>
                <Trans i18nKey='subscription.action'>Action</Trans>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box display='flex' alignItems='center' gap={3}>
                  <Avatar name={subscription.plan.name} size='sm' />
                  {subscription.plan.name} ({subscription.plan.organization.maxCensus} members)
                </Box>
              </Td>
              <Td>
                <Tag>{currency(subscription.plan.startingPrice)}</Tag>
              </Td>
              <Td>
                <Tag>{new Date(subscription.subscriptionDetails.startDate).toLocaleDateString()}</Tag>
              </Td>
              <Td>
                <Tag>{new Date(subscription.subscriptionDetails.renewalDate).toLocaleDateString()}</Tag>
              </Td>
              {isFree ? (
                <Td>
                  <Button variant='primary' size='sm' isLoading={isLoading} onClick={() => openModal('subscription')}>
                    <Trans i18nKey='upgrade'>Upgrade</Trans>
                  </Button>
                </Td>
              ) : (
                <Td>
                  <Button variant='outline' size='sm' isLoading={isLoading} onClick={() => handleChangeClick()}>
                    <Trans i18nKey='subscription.change_plan_button'>Change</Trans>
                  </Button>
                </Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export const SubscriptionHistory = () => {}
