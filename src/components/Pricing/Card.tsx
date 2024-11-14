import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Flex,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { Trans, useTranslation } from 'react-i18next'
import type { Plan } from './Plans'

type PricingCardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: number
  features: string[]
  isDisabled: boolean
  width?: string
  plan: Plan
}

// Translation keys for the features
const translations = {
  'organization.memberships': 'pricing.features.memberships',
  'organization.subOrgs': 'pricing.features.sub_orgs',
  'votingTypes.weighted': 'pricing.features.weighted',
  'votingTypes.approval': 'pricing.features.approval',
  'votingTypes.ranked': 'pricing.features.ranked',
  'features.personalization': 'pricing.features.personalization',
  'features.emailReminder': 'pricing.features.email_reminder',
  'features.smsNotification': 'pricing.features.sms_notification',
}

const PricingCard = ({
  title,
  subtitle,
  price,
  width,
  popular,
  features: hardcodedFeatures,
  isDisabled,
  plan,
}: PricingCardProps) => {
  const { isOpen, onToggle } = useDisclosure()

  // Dynamically map the features from the plan
  const features = Object.entries(translations)
    .map(([key, translationKey]) => {
      const value = dotobject(plan, key)
      return value !== undefined
        ? {
            key,
            label: translationKey,
            value,
          }
        : null
    })
    .filter(Boolean)

  return (
    <Card variant='pricing-card' width={width} mt={4}>
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Button isDisabled={isDisabled || false}>
          <Trans i18nKey='subscribe'>Subscribe</Trans>
        </Button>
        <Text>
          <Trans i18nKey='pricing_card.from' values={{ price }}>
            From ${price}/year
          </Trans>
        </Text>
        <Box>
          <UnorderedList>
            {hardcodedFeatures.map((feature, idx) => (
              <ListItem key={idx} listStyleType='-'>
                {feature}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Button onClick={onToggle}>
          <Trans i18nKey='pricing_card.view_features'>{isOpen ? 'Hide features' : 'View all features'}</Trans>
        </Button>
      </CardBody>
      <CardFooter p={0}>
        <Collapse in={isOpen} animateOpacity>
          <Box p={4}>
            <UnorderedList>
              {features.map((feature) => (
                <ListItem key={feature.key} listStyleType='none' pb={1}>
                  <Flex align='center' gap={2}>
                    {typeof feature.value === 'boolean' && (
                      <Icon
                        as={feature.value ? CheckIcon : CloseIcon}
                        color={feature.value ? 'green.500' : 'red.500'}
                      />
                    )}
                    <Trans i18nKey={feature.label} values={{ value: feature.value }} />
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Collapse>
      </CardFooter>
      {popular && (
        <Box
          position='absolute'
          mt={-4}
          ml='50%'
          transform='translateX(-50%)'
          fontSize='sm'
          w='min-content'
          whiteSpace='nowrap'
          py={1}
          px={3}
          borderRadius='full'
          bgColor='pricing_card.most_popular_plan.bg'
          color='pricing_card.most_popular_plan.color'
        >
          <Trans i18nKey='pricing_card.most_popular_plan'>Most popular plan</Trans>
        </Box>
      )}
    </Card>
  )
}

// yeah, it's sad but we need to include all the translations in a way the extractor does not remove them...
// note this component does not need (and should never) to be included in the app
const UnusedComponentButRequiredToNotLoseTranslations = () => {
  const { t } = useTranslation()
  t('pricing.features.memberships', { defaultValue: 'Up to {{ count }} memberships' })
  t('pricing.features.sub_orgs', { defaultValue: 'Up to {{ count }} sub-organizations' })
  t('pricing.features.approval', { defaultValue: 'Approval voting' })
  t('pricing.features.ranked', { defaultValue: 'Ranked voting' })
  t('pricing.features.weighted', { defaultValue: 'Weighted voting' })
  t('pricing.features.personalization', { defaultValue: 'Personalization' })
  t('pricing.features.email_reminder', { defaultValue: 'Email reminder' })
  t('pricing.features.sms_notification', { defaultValue: 'SMS notification' })

  return null
}

export default PricingCard
