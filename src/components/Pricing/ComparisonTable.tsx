import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { forwardRef } from 'react'
import { Trans } from 'react-i18next'
import { renderBooleanIcon } from '../../utils/icons'
import { CategorizedFeatureKeys, CategoryTitleKeys, PlanFeaturesTranslationKeys } from './Features'
import { Plan } from './Plans'

type ComparisonTableProps = {
  plans: Plan[]
}

type ComparisonSectionTableProps = {
  titleKey: string
  plans: Plan[]
  features: string[]
  category: string
}

const ComparisonSectionTable = ({ titleKey, plans, features, category }: ComparisonSectionTableProps) => (
  <Box mb={8}>
    <Text fontSize='xl' mb={4}>
      <Trans i18nKey={titleKey} />
    </Text>
    <Table variant='striped' borderWidth={1}>
      <Thead>
        <Tr>
          <Th>
            <Trans i18nKey='pricing.features'>Features</Trans>
          </Th>
          {plans.map((plan) => (
            <Th key={plan.id} textAlign='center'>
              {plan.name}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {features.map((key) => {
          const featurePath = `${category}.${key}`
          const translationKey = PlanFeaturesTranslationKeys[featurePath]
          return (
            <Tr key={key}>
              <Td fontWeight='medium'>
                <Trans i18nKey={translationKey} />
              </Td>
              {plans.map((plan) => {
                const value = dotobject(plan, featurePath)
                return (
                  <Td key={plan.id} textAlign='center'>
                    {typeof value === 'boolean' ? renderBooleanIcon(value) : typeof value === 'number' ? value : '-'}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  </Box>
)

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(({ plans }, ref) => {
  // Sort plans by price
  const sortedPlans = [...plans].sort((a, b) => a.startingPrice - b.startingPrice)

  return (
    <Box ref={ref} overflowX='auto' mt={8}>
      <Text fontSize='2xl' mb={4} textAlign='center'>
        <Trans i18nKey='pricing.compare_features'>Compare all features</Trans>
      </Text>

      {Object.entries(CategorizedFeatureKeys).map(([category, features]) => (
        <ComparisonSectionTable
          key={category}
          titleKey={CategoryTitleKeys[category]}
          plans={sortedPlans}
          features={features}
          category={category}
        />
      ))}
    </Box>
  )
})
