import {
  Avatar,
  Button,
  Progress,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { useSubscription } from '~components/Auth/Subscription'
import { SubscriptionModal } from '~components/Pricing/Plans'

export const Subscription = () => {
  const { t } = useTranslation()
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <SubscriptionModal isOpen={isOpen} onClose={onClose} title={t('pricing.title')} />
      <Button onClick={onOpen} alignSelf='end'>
        <Trans i18nKey='view_plans_and_pricing'>View Plans & Pricing</Trans>
      </Button>
      <SubscriptionList />
    </>
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
    <TableContainer>
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
              <Tag>{subscription.plan.startingPrice} €</Tag>
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
  )
}

export const SubscriptionHistory = () => {}
