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
      <SubscriptionModal isOpenModal={isOpen} onCloseModal={onClose} title={t('pricing.title')} />
      <Button onClick={onOpen} alignSelf='end'>
        View Plans & Pricing
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
              {subscription.plan.name} ({subscription.plan.organization.memberships} members)
            </Td>
            <Td>
              <Tag>undefined</Tag>
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
