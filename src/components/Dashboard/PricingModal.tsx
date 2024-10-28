import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import PricingCard from '~components/Organization/Dashboard/PricingCard'

type CardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: string
  features: string[]
}

export const PricingModal = ({ isOpenModal, onCloseModal }: { isOpenModal: boolean; onCloseModal: () => void }) => {
  const { t } = useTranslation()

  const cards: CardProps[] = [
    {
      popular: false,
      title: t('pricing_modal.essential_title', { defaultValue: 'Essential' }),
      subtitle: t('pricing_modal.essential_subtitle', {
        defaultValue: 'Small or medium-sized orgs or community groups with basic voting needs.',
      }),
      price: '99',
      features: [
        t('pricing_modal.essential_feat.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing_modal.essential_feat.up_to_admins', { defaultValue: 'Up to 3 Admins and 1 org' }),
        t('pricing_modal.essential_feat.yearly_processes', { defaultValue: '5 yearly voting processes' }),
        t('pricing_modal.essential_feat.report_analytitcs', { defaultValue: 'Basic reporting and analytics' }),
        t('pricing_modal.essential_feat.ticket_support', { defaultValue: 'Ticket support' }),
        t('pricing_modal.essential_feat.gpdr_compilance', { defaultValue: 'GDPR compliance' }),
      ],
    },
    {
      popular: true,
      title: t('pricing_modal.premium_title', { defaultValue: 'Premium' }),
      subtitle: t('pricing_modal.premium_subtitle', {
        defaultValue: 'Larger amount that require more advanced features.',
      }),
      price: '389',
      features: [
        t('pricing_modal.premium_feat.all_essential', { defaultValue: 'All essential plan features' }),
        t('pricing_modal.premium_feat.up_to_admins', { defaultValue: 'Up to 5 Admins' }),
        t('pricing_modal.premium_feat.yearly_processes', { defaultValue: '10 yearly voting processes' }),
        t('pricing_modal.premium_feat.custom_subdomain', { defaultValue: 'Custom subdomain & branding' }),
        t('pricing_modal.premium_feat.report_analytitcs', { defaultValue: 'Advanced reporting & analytics' }),
        t('pricing_modal.premium_feat.ticket_support', { defaultValue: 'Ticket and chat support' }),
        t('pricing_modal.premium_feat.gpdr_compilance', { defaultValue: 'GDPR compliance' }),
      ],
    },
    {
      popular: false,
      title: t('pricing_modal.custom_title', { defaultValue: 'Custom Plan' }),
      subtitle: t('pricing_modal.custom_subtitle', {
        defaultValue:
          'Large organizations enterprises, and institutions requiring extensive customization and support.',
      }),
      price: '999',
      features: [
        t('pricing_modal.custom_feat.all_votings', { defaultValue: 'All faetures & voting types' }),
        t('pricing_modal.custom_feat.unlimited_admins', { defaultValue: 'Unlimited Admins & suborgs' }),
        t('pricing_modal.custom_feat.unlimited_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing_modal.custom_feat.white_label_solution', { defaultValue: 'White-label solution' }),
        t('pricing_modal.custom_feat.advanced_security', { defaultValue: 'Advanced security features' }),
        t('pricing_modal.custom_feat.account_manager', { defaultValue: 'Dedicated account manager' }),
        t('pricing_modal.custom_feat.full_tech_support', {
          defaultValue: 'Full technical support (ticket, chat, email)',
        }),
      ],
    },
  ]
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal} variant='dashboard-plans'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Trans i18nKey='pricing_modal.title'>You need to upgrade to use this feature</Trans>
        </ModalHeader>
        <ModalCloseButton fontSize='lg' />
        <ModalBody>
          {cards.map((card, idx) => (
            <PricingCard key={idx} {...card} />
          ))}
        </ModalBody>

        <ModalFooter>
          <Box>
            <Text>
              <Trans i18nKey='pricing_modal.more_voters'>If you need more voters, you can select it here:</Trans>
            </Text>
            <Select>
              <option>1-500 members</option>
            </Select>
          </Box>
          <Text>
            <Trans i18nKey='pricing_modal.your_plan'>
              Currently you are subscribed to the 'Your plan' subscription. If you upgrade, we will only charge the
              yearly difference. In the next billing period, starting on 'dd/mm/yy' you will pay for the new select
              plan.
            </Trans>
          </Text>
          <Box>
            <Text>
              <Trans i18nKey='pricing_modal.help'>Need some help?</Trans>
            </Text>
            <Button as={ReactRouterLink} colorScheme='white'>
              <Trans i18nKey='contact_us'>Contact us</Trans>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
