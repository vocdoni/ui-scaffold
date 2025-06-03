import { Box, Flex, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { forwardRef } from 'react'
import { Trans } from 'react-i18next'
import { BooleanIcon } from '~components/shared/Layout/BooleanIcon'
import { currency } from '~utils/numbers'
import { CategorizedFeatureKeys, CategoryTitleKeys, PlanTableFeaturesTranslationKeys } from './Features'
import { Plan, usePlans, usePlanTranslations } from './Plans'

type ComparisonTableProps = {}

type ComparisonSectionTableProps = {
  titleKey: string
  plans: Plan[]
  features: string[]
  category: string
  idx: number
}

const ComparisonSectionTable = ({ titleKey, plans, features, category, idx }: ComparisonSectionTableProps) => {
  const translations = usePlanTranslations()

  return (
    <Box mb={8}>
      <TableContainer>
        <Table variant='striped' borderWidth={1}>
          <Thead>
            <Tr>
              <Th>
                <Text as={'span'} color='comparsions_table_title'>
                  <Trans i18nKey={titleKey} />
                </Text>
              </Th>

              <>
                {plans.map((plan) => (
                  <Th key={plan.id} textAlign='center'>
                    {!idx && (
                      <Flex flexDirection={'column'} justifyContent={'center'}>
                        <Text as={'span'} textAlign={'center'}>
                          {translations[plan.id].title}
                        </Text>
                        <Text as={'span'} textAlign={'center'} fontWeight={'normal'}>
                          <Trans
                            i18nKey='pricing_card.comparison_table_from'
                            values={{ price: currency(plan.startingPrice) }}
                          >
                            From {{ price: plan.startingPrice }}/year
                          </Trans>
                        </Text>
                      </Flex>
                    )}
                  </Th>
                ))}
              </>
            </Tr>
          </Thead>
          <Tbody>
            {features.map((key) => {
              const featurePath = `${category}.${key}`
              const translationKey = PlanTableFeaturesTranslationKeys[featurePath]
              return (
                <Tr key={key}>
                  <Td fontWeight='medium'>
                    <Trans i18nKey={translationKey} />
                  </Td>
                  {plans.map((plan) => {
                    const value = dotobject(plan, featurePath)
                    return (
                      <Td key={plan.id} textAlign='center' w={40}>
                        {typeof value === 'boolean' ? (
                          <BooleanIcon value={value} />
                        ) : typeof value === 'number' ? (
                          value
                        ) : (
                          '-'
                        )}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>((props, ref) => {
  const { data: plans, isLoading } = usePlans()

  if (isLoading) {
    return <Progress size='sm' isIndeterminate />
  }

  return (
    <Flex ref={ref} justifyContent={'center'}>
      <Box maxW='950px' overflowX={'scroll'}>
        <Box width={'full'} overflowX='auto'>
          <Text fontSize='2xl' mb={4} textAlign='center'>
            <Trans i18nKey='pricing.compare_features'>Compare all features</Trans>
          </Text>

          {Object.entries(CategorizedFeatureKeys).map(([category, features], idx) => (
            <ComparisonSectionTable
              key={category}
              titleKey={CategoryTitleKeys[category]}
              plans={plans}
              features={features}
              category={category}
              idx={idx}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  )
})
