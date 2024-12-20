import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
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
  VStack,
} from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useSubscription } from '~components/Auth/Subscription'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { Routes } from '~src/router/routes'
import { currency } from '~utils/numbers'

export const Subscription = () => {
  const { openModal } = usePricingModal()

  return (
    <VStack gap={4} w='full'>
      <Button onClick={() => openModal('subscription')} alignSelf='end'>
        <Trans i18nKey='view_plans_and_pricing'>View Plans & Pricing</Trans>
      </Button>
      <SubscriptionList />
    </VStack>
  )
}

export const SubscriptionList = () => {
  const { subscription, loading } = useSubscription()

  if (loading) {
    return <Progress size='xs' isIndeterminate />
  }

  if (!subscription) {
    return null
  }

  return (
    <VStack gap={4} w='full'>
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
        <Table size='sm'>
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
              <Th colSpan={2}>
                <Trans i18nKey='subscription.next_billing'>Next Billing</Trans>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td display='flex' alignItems='center' gap={3}>
                <Avatar name={subscription.plan.name} size='sm' />
                {subscription.plan.name} ({subscription.plan.organization.maxCensus} members)
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
              <Td>
                <Button variant='outline' size='sm'>
                  <Trans i18nKey='subscription.change_plan_button'>Change</Trans>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export const SubscriptionHistory = () => {}
