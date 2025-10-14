import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import ContactButton from '~components/shared/ContactLink'
import { BookerModalButton } from '~components/shared/Dashboard/Booker'
import { PlanId } from '~constants'
import { Routes } from '~routes'
import { currency } from '~utils/numbers'
import { usePlanTranslations, type Plan } from './Plans'

gsap.registerPlugin(useGSAP)

type PricingCardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: number
  features: { icon: React.ElementType; text: string }[]
  isDisabled?: boolean
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
  const translations = usePlanTranslations()
  const { setValue, watch } = useFormContext()
  const { isAuthenticated } = useAuth()
  const container = useRef<HTMLDivElement>(null)
  const commonButtonProps: ButtonProps = {
    variant: isCurrentPlan ? 'outline' : 'solid',
    colorScheme: 'black',
    isDisabled: isDisabled || isCurrentPlan,
    size: 'sm',
    w: 'full',
  }

  const isCustomPlan = plan?.organization?.customPlan || plan.id === PlanId.Custom
  const period = watch('billingPeriod', 'year')

  useGSAP(
    () => {
      if (!isCustomPlan && price > 0) {
        const priceElement = container.current?.querySelector('.pricing-card-price')

        if (priceElement) {
          const targetPrice = price
          const obj = { val: period === 'month' ? plan.yearlyPrice / 12 : plan.monthlyPrice }

          gsap.to(obj, {
            val: targetPrice,
            duration: 0.3,
            onUpdate: () => {
              priceElement.textContent = currency(Math.round(obj.val))
            },
          })
        }
      }
    },
    { scope: container, dependencies: [price, isCustomPlan] }
  )

  return (
    <Card ref={container} variant={isCustomPlan ? 'custom-pricing-card' : 'pricing-card'}>
      <CardHeader>
        <Text>{title}</Text>
        <Text color='texts.subtle'>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Flex direction='column' h='full' gap={4}>
          <Flex align='center'>
            {isCustomPlan ? (
              <Text fontSize='3xl' fontWeight='extrabold'>
                <Trans i18nKey='pricing_card.custom_plan'>Price on request</Trans>
              </Text>
            ) : (
              <Trans
                i18nKey='pricing_card.from'
                values={{ price: currency(price) }}
                components={{
                  price: <Text fontSize='3xl' fontWeight='extrabold' className='pricing-card-price' />,
                  time: <Text size='sm' color='texts.subtle' />,
                }}
              >
                {{ price }}/month
              </Trans>
            )}
          </Flex>
          <Box>
            {!isCustomPlan &&
              price > 0 &&
              (period === 'month' ? (
                <Text fontSize='sm' color='green' fontWeight='bold'>
                  <Trans
                    i18nKey='pricing_card.annual_savings'
                    defaultValue='Save {{ savings }}/year with annual'
                    values={{ savings: currency(plan.monthlyPrice * 12 - plan.yearlyPrice) }}
                  />
                </Text>
              ) : (
                <Text fontSize='sm' color='texts.subtle'>
                  <Trans
                    i18nKey='pricing_card.annual_total_cost'
                    defaults='{{ price }}/year billed annually'
                    values={{ price: currency(plan.yearlyPrice) }}
                  />
                </Text>
              ))}
            <Divider />
          </Box>
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
      {!isCustomPlan && <Divider />}
      <CardFooter>
        <Flex flexDirection='column' w='full' gap={2} alignItems='center' justifyContent='flex-end'>
          {isCustomPlan ? (
            <>
              <Flex gap={1}>
                <Trans i18nKey='pricing_card.contact_sales'>
                  <ContactButton variant='link' fontWeight='extrabold'>
                    Contact our sales team
                  </ContactButton>
                  <Text as='span' fontSize='sm' color='texts.subtle' textAlign='center'>
                    or
                  </Text>
                </Trans>
              </Flex>
              <BookerModalButton
                {...commonButtonProps}
                aria-label={isCurrentPlan ? t('current_plan') : t('contact_us')}
              >
                {isCurrentPlan
                  ? t('current_plan', { defaultValue: 'Current Plan' })
                  : t('home.support.btn_watch', { defaultValue: 'Schedule a call' })}
              </BookerModalButton>
            </>
          ) : isAuthenticated ? (
            <Button
              {...commonButtonProps}
              onClick={() => setValue('planId', plan.id)}
              type='submit'
              aria-label={isCurrentPlan ? t('current_plan') : t('subscribe')}
            >
              {isCurrentPlan
                ? t('current_plan', { defaultValue: 'Current Plan' })
                : t('upgrade_plan', {
                    defaultValue: 'Upgrade to {{plan}}',
                    plan: translations[plan.id]?.title || plan.name,
                  })}
            </Button>
          ) : (
            <Button {...commonButtonProps} w='full' as={RouterLink} to={Routes.auth.signIn}>
              <Trans i18nKey='upgrade_plan' values={{ plan: translations[plan.id]?.title || plan.name }} />
            </Button>
          )}
        </Flex>
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
