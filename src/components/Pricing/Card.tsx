import { Box, Button, Card, CardBody, CardHeader, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { Routes } from '~src/router/routes'
import type { Plan } from './Plans'

type PricingCardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: string
  features: string[]
  isDisabled: boolean
  width?: string
  plan: Plan
  featuresRef: RefObject<HTMLDivElement>
}

const PricingCard = ({
  title,
  subtitle,
  price,
  width,
  popular,
  features,
  isDisabled,
  plan,
  featuresRef,
}: PricingCardProps) => {
  const { setValue } = useFormContext()

  const handleViewFeatures = () => {
    if (featuresRef && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(Routes.plans + '?compare')
    }
  }

  return (
    <Card variant='pricing-card' width={width} mt={4}>
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Button
          isDisabled={isDisabled || false}
          onClick={() => setValue('planId', plan.id)}
          type='submit'
          variant={'solid'}
        >
          <Trans i18nKey='subscribe'>Subscribe</Trans>
        </Button>
        <Text mt={4}>
          <Trans i18nKey='pricing_card.from' values={{ price }}>
            From ${{ price }}/year
          </Trans>
        </Text>
        <Box>
          <UnorderedList>
            {features.map((feature, idx) => (
              <ListItem key={idx} listStyleType='-'>
                {feature}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Button onClick={handleViewFeatures} variant={'transparent'}>
          <Trans i18nKey='pricing_card.view_features'>View All features</Trans>
        </Button>
      </CardBody>
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

export default PricingCard
