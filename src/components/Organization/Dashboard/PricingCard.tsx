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
}) => (
  <Card variant='pricing-card' width={width}>
    <CardHeader>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </CardHeader>
    <CardBody>
      <Button variant='pricing-card'>
        <Trans i18nKey='subscribe'>Subscribe</Trans>
      </Button>
      <Text color='black'>
        <Trans i18nKey='pricing_card.from'>From ${price}/year</Trans>
      </Text>
      <Box color='black'>
        <UnorderedList>
          {features.map((feature, idx) => (
            <ListItem key={idx}>{feature}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </CardBody>
    <CardFooter>
      <Button variant='outline' border='none' _hover={{ textDecoration: 'underline' }}>
        <Trans i18nKey='pricing_card.view_features'>View all features</Trans>
      </Button>
    </CardFooter>
    {popular && (
      <Box
        bgColor='#D2CBB9'
        w='min-content'
        whiteSpace='nowrap'
        mx='auto'
        py={1}
        px={3}
        borderRadius='full'
        position='absolute'
        mt={-4}
        ml='50%'
        transform='translateX(-50%)'
        color='black'
        fontSize='sm'
      >
        <Trans i18nKey='pricing_card.most_popular_plan'>Most popular plan</Trans>
      </Box>
    )}
  </Card>
)

export default PricingCard
