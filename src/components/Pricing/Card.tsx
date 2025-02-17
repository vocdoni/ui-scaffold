import { Box, Button, Card, CardBody, CardHeader, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans } from 'react-i18next'
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

  return (
    <Card variant='pricing-card' width={width} mt={4}>
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Box fontSize='30px' m='15px 0px 10px' textAlign='center'>
          {plan.startingPrice === 0 ? (
            <>
              <Text fontSize='30px' mt='10px'>
                0 €{' '}
                <Text display='inline' fontSize='10px' color='#888' _dark={{ color: 'white' }}>
                  (forever)
                </Text>
              </Text>
              <Text fontSize='16px' mt='20px' color='#666' _dark={{ color: 'white' }}>
                {features[features.length - 1]}
              </Text>
            </>
          ) : (
            <>
              <Trans i18nKey='' values={{ price }}>
                {{ price }}{' '}
                <Text display='inline' fontSize='10px'>
                  / year
                </Text>
              </Trans>
              <Text fontSize='16px' mt='10px' color='#666' _dark={{ color: 'white' }}>
                {features[features.length - 1]}
              </Text>
            </>
          )}
        </Box>
        {plan.startingPrice === 0 ? (
          <Button isDisabled={isDisabled || false} onClick={() => setValue('planId', plan.id)} type='submit'>
            <Trans i18nKey='register'>Register</Trans>
          </Button>
        ) : (
          <Button
            variant='primary'
            isDisabled={isDisabled || false}
            onClick={() => setValue('planId', plan.id)}
            type='submit'
            style={{ height: '40px' }}
          >
            <Trans i18nKey='subscribe'>Subscribe</Trans>
          </Button>
        )}
        <Box mt='20px' mb='10px'>
          <UnorderedList>
            {features.slice(0, -1).map((feature, idx) => (
              <ListItem key={idx} listStyleType='-'>
                {feature}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
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
          px={5}
          borderRadius='full'
          bgColor='brand.300'
          color='pricing_card.most_popular_plan.color'
        >
          <Trans i18nKey='pricing_card.most_popular_plan'>Recommended</Trans>
        </Box>
      )}
    </Card>
  )
}

export default PricingCard
