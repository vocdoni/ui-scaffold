import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Icon,
  Link,
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
import { LuCircleCheckBig } from 'react-icons/lu'
import { Link as RouterLink, useLocation } from 'react-router-dom'
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
  const container = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const commonButtonProps: ButtonProps = {
    variant: isCurrentPlan ? 'outline' : 'solid',
    colorScheme: 'black',
    isDisabled: isDisabled || isCurrentPlan,
    size: 'sm',
    w: 'full',
  }

  const isCustomPlan = plan?.organization?.customPlan || plan.id === PlanId.Custom
  const period = watch('billingPeriod', 'year')
  const isDashboard = pathname.startsWith(Routes.dashboard.base)

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
                <Text fontSize='sm'>
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
                    defaults='{{ price }} billed annually'
                    values={{ price: currency(plan.yearlyPrice) }}
                  />
                </Text>
              ))}
            <Divider />
            {!isCustomPlan && price > 0 && plan.freeTrialDays > 0 && period === 'year' && (
              <Text fontWeight='extrabold' display='flex' flexDir='row' alignItems='center' mt={1}>
                <Icon as={LuCircleCheckBig} mr={1} />
                <Trans
                  i18nKey='pricing_card.free_trial'
                  defaults='{{ freeDays }}-day free trial'
                  values={{ freeDays: plan.freeTrialDays }}
                />
              </Text>
            )}
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
      {plan.id === PlanId.Premium && (
        <Text size='xs' fontStyle='italic' textAlign='center'>
          <Trans i18nKey='pricing_card.need_more_members'>
            Need more members?{' '}
            <Link to={Routes.dashboard.settings.support} as={RouterLink}>
              Contact us
            </Link>
          </Trans>
        </Text>
      )}
      {!isCustomPlan && isDashboard && <Divider />}
      <CardFooter>
        <Flex flexDirection='column' w='full' gap={2} alignItems='center' justifyContent='flex-end'>
          {isCustomPlan ? (
            <>
              <Flex gap={1} flexWrap='wrap' flexDir='column' w='full'>
                <Trans i18nKey='pricing_card.contact_sales'>
                  <ContactButton variant='link' fontWeight='extrabold' whiteSpace='unset' textAlign='center'>
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
          ) : (
            isDashboard && (
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
            )
          )}
        </Flex>
      </CardFooter>
      {popular && (
        <Badge
          position='absolute'
          top={0}
          left='50%'
          transform='translate(-50%, -50%)'
          py={0}
          px={3}
          size='xs'
          backgroundColor='card.pricing.featured.badge.bg'
          color='card.pricing.featured.badge.color'
          fontWeight='extrabold'
        >
          <Trans i18nKey='pricing_card.most_popular_plan'>Most popular plan</Trans>
        </Badge>
      )}
    </Card>
  )
}

export default PricingCard
