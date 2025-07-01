import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuCheck } from 'react-icons/lu'
import { Routes } from '~src/router/routes'
import type { Plan } from './Plans'

type PricingCardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: string
  features: string[]
  isDisabled: boolean
  isCurrentPlan: boolean
  hidePlanActions?: boolean
  width?: string
  plan: Plan
  featuresRef: RefObject<HTMLDivElement>
}

const PricingCard = ({
  title,
  subtitle,
  price,
  popular,
  features,
  isDisabled,
  isCurrentPlan,
  hidePlanActions,
  plan,
  featuresRef,
}: PricingCardProps) => {
  const { t } = useTranslation()
  const { setValue } = useFormContext()

  const handleViewFeatures = () => {
    if (featuresRef && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(Routes.plans + '?compare')
    }
  }

  return (
    <Card
      position='relative'
      flex={1}
      variant='pricing-card'
      align='stretch'
      border='1px solid'
      bgColor={isCurrentPlan ? 'card.pricing.current.bg' : 'card.pricing.bg'}
      borderColor={popular ? 'card.pricing.featured.border' : 'card.pricing.border'}
    >
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Flex direction='column'>
          <Flex align='center'>
            <Trans
              i18nKey='pricing_card.from'
              values={{ price }}
              components={{
                price: <Text size='2xl' fontWeight='bold' />,
                time: <Text size='sm' color='gray.500' />,
              }}
            >
              {{ price }}/year
            </Trans>
          </Flex>
          <UnorderedList>
            {features.map((feature, idx) => (
              <ListItem key={idx}>
                <ListIcon as={LuCheck} color='green.500' />
                {feature}
              </ListItem>
            ))}
          </UnorderedList>
          {!hidePlanActions && (
            <Button onClick={handleViewFeatures} variant='link' mt={3}>
              <Trans i18nKey='pricing_card.view_features'>View All features</Trans>
            </Button>
          )}
        </Flex>
      </CardBody>
      <CardFooter>
        <Button
          isDisabled={isDisabled || isCurrentPlan}
          onClick={() => setValue('planId', plan.id)}
          type='submit'
          variant={popular ? 'solid' : 'outline'}
          colorScheme='gray'
        >
          {isCurrentPlan
            ? t('current_plan', { defaultValue: 'Current Plan' })
            : t('subscribe', { defaultValue: 'Subscribe' })}
        </Button>
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
