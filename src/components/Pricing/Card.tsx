import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Link,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { PlanId } from '~constants'
import ContactLink from '~shared/ContactLink'
import type { Plan } from './Plans'

type PricingCardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: string
  features: { icon: React.ElementType; text: string }[]
  isDisabled: boolean
  isCurrentPlan: boolean
  width?: string
  plan: Plan
}

const PricingCard = ({
  title,
  subtitle,
  price,
  popular,
  features,
  isDisabled,
  isCurrentPlan,
  plan,
}: PricingCardProps) => {
  const { t } = useTranslation()
  const { setValue } = useFormContext()

  const commonButtonProps = {
    variant: isCurrentPlan ? 'outline' : 'solid',
    colorScheme: 'black',
    isDisabled: isDisabled || isCurrentPlan,
  }

  const isCustomPlan = plan?.organization?.customPlan || plan.id === PlanId.Custom

  return (
    <Card
      position='relative'
      flex={1}
      variant='pricing-card'
      align='stretch'
      border='1px solid'
      bgColor='card.pricing.bg'
      borderColor={popular ? 'card.pricing.featured.border' : 'card.pricing.border'}
    >
      <CardHeader>
        <Text>{title}</Text>
        <Text color='texts.subtle'>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Flex direction='column' gap={4}>
          <Flex align='center'>
            {isCustomPlan ? (
              <Text fontSize='3xl' fontWeight='extrabold'>
                <Trans i18nKey='pricing_card.custom_plan'>Price on request</Trans>
              </Text>
            ) : (
              <Trans
                i18nKey='pricing_card.from'
                values={{ price }}
                components={{
                  price: <Text fontSize='3xl' fontWeight='extrabold' />,
                  time: <Text size='sm' color='texts.subtle' />,
                }}
              >
                {{ price }}/year
              </Trans>
            )}
          </Flex>
          {isCustomPlan ? (
            <Text fontSize='sm'>
              <Trans i18nKey='pricing_card.custom_plan_description'>
                Do you have special governance requirements? We can adapt to your needs with a fully customized
                solution. A dedicated account manager will support you throughout the entire collaboration.
              </Trans>
            </Text>
          ) : (
            <UnorderedList spacing={3}>
              {features.map((feature, idx) => (
                <ListItem key={idx}>
                  <ListIcon as={feature.icon} />
                  {feature.text}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter>
        {isCustomPlan ? (
          <Flex direction='column' gap={2} w='full' alignItems='center'>
            <Flex gap={1} alignItems='center'>
              <Link fontWeight='extrabold' fontSize='sm' as={ReactRouterLink}>
                <Trans i18nKey='contact_sales'>Contact our sales team</Trans>
              </Link>
              <Text fontSize='sm' color='texts.subtle' textAlign='center'>
                <Trans i18nKey='pricing_card.custom_plan_or'>or</Trans>
              </Text>
            </Flex>
            <ContactLink
              {...commonButtonProps}
              w='full'
              aria-label={isCurrentPlan ? t('current_plan') : t('contact_us')}
            >
              {isCurrentPlan
                ? t('current_plan', { defaultValue: 'Current Plan' })
                : t('home.support.btn_watch', { defaultValue: 'Schedule a call' })}
            </ContactLink>
          </Flex>
        ) : (
          <Button
            {...commonButtonProps}
            onClick={() => setValue('planId', plan.id)}
            type='submit'
            aria-label={isCurrentPlan ? t('current_plan') : t('subscribe')}
          >
            {isCurrentPlan
              ? t('current_plan', { defaultValue: 'Current Plan' })
              : t('subscribe', { defaultValue: 'Subscribe' })}
          </Button>
        )}
      </CardFooter>
      {popular && (
        <Box
          position='absolute'
          top={0}
          left='50%'
          transform='translate(-50%, -50%)'
          fontSize='sm'
          w='min-content'
          whiteSpace='nowrap'
          py={1}
          px={3}
          borderRadius='full'
          backgroundColor='card.pricing.featured.badge.bg'
          color='card.pricing.featured.badge.color'
        >
          <Trans i18nKey='pricing_card.most_popular_plan'>Most popular plan</Trans>
        </Box>
      )}
    </Card>
  )
}

export default PricingCard
