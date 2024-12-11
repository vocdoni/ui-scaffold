import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { RefObject } from 'react'
import { Trans } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { renderBooleanIcon } from '../../utils/icons'
import { PlanFeaturesTranslationKeys } from './Features'
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
  featuresRef: RefObject<HTMLDivElement>
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
  featuresRef,
}: PricingCardProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()
  const navigate = useNavigate()
  const isPlansPage = location.pathname === '/plans'

  // Dynamically map the features from the plan
  const features = Object.entries(PlanFeaturesTranslationKeys)
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

  const handleViewFeatures = () => {
    if (isPlansPage && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      onToggle()
    }
  }

  return (
    <Card variant='pricing-card' width={width} mt={4}>
      <CardHeader>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </CardHeader>
      <CardBody>
        <Button isDisabled={isDisabled || false}>
          <Trans i18nKey='view_pricing_plan'>View Pricing Plan</Trans>
        </Button>
        <Text>
          <Trans i18nKey='pricing_card.from' values={{ price }}>
            From ${{ price }}/year
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
        <Button onClick={handleViewFeatures}>
          <Trans i18nKey='pricing_card.view_features'>
            {isOpen && !isPlansPage ? 'Hide features' : 'View all features'}
          </Trans>
        </Button>
      </CardBody>
      <CardFooter p={0}>
        <Collapse in={isOpen} animateOpacity>
          <Box p={4}>
            <UnorderedList>
              {features.map((feature) => (
                <ListItem key={feature.key} listStyleType='none' pb={1}>
                  <Flex align='center' gap={2}>
                    {typeof feature.value === 'boolean' && renderBooleanIcon(feature.value)}
                    <Trans i18nKey={feature.label} values={{ value: feature.value }} />
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
            {!isPlansPage && (
              <Button mt={4} onClick={() => navigate('/plans')} variant='outline' size='sm' width='full'>
                <Trans i18nKey='pricing_card.compare_plans'>Compare all plans</Trans>
              </Button>
            )}
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

export default PricingCard
