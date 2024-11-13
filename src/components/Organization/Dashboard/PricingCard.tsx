import { Box, Button, Card, CardBody, CardFooter, CardHeader, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

const PricingCard = ({
  title,
  subtitle,
  price,
  width,
  popular,
  features,
}: {
  title: string
  subtitle: string
  price: string
  width?: string
  popular?: boolean
  features: string[]
}) => {
  return (
    <Card variant='pricing-card' width={width}>
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Button>
          <Trans i18nKey='subscribe'>Subscribe</Trans>
        </Button>
        <Text>
          <Trans i18nKey='pricing_card.from' values={{ price }}>
            From ${price}/year
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
      </CardBody>
      <CardFooter>
        <Button>
          <Trans i18nKey='pricing_card.view_features'>View all features</Trans>
        </Button>
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

export default PricingCard
