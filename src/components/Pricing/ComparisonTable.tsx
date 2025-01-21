import { Box, Flex, Progress, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { forwardRef } from 'react'
import { Trans } from 'react-i18next'
import Clients from '~components/Home/Clients'
import Faqs from '~components/Home/Faqs'
import { BooleanIcon } from '~components/Layout/BooleanIcon'
import { CategorizedFeatureKeys, CategoryTitleKeys, PlanTableFeaturesTranslationKeys } from './Features'
import { Plan, usePlans, usePlanTranslations } from './Plans'

type ComparisonTableProps = {}

type ComparisonSectionTableProps = {
  titleKey: string
  plans: Plan[]
  features: string[]
  category: string
}

const ComparisonSectionTable = ({ titleKey, plans, features, category }: ComparisonSectionTableProps) => {
  const translations = usePlanTranslations()
  return (
    <Box mb={8}>
      <Text fontSize='xl' mb={4} color='comparsions_table_title'>
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
                {translations[plan.id].title || plan.name}
              </Th>
            ))}
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
    </Box>
  )
}

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>((props, ref) => {
  const { data: plans, isLoading } = usePlans()

  if (isLoading) {
    return <Progress size='sm' isIndeterminate colorScheme='brand' />
  }

  return (
    <Box ref={ref} overflowX='auto' mt={8} maxW={'1000px'} mx='auto' border='1px solid red'>
      <Text fontSize='2xl' mb={4} textAlign='center'>
        <Trans i18nKey='pricing.compare_features'>Compare all features</Trans>
      </Text>
      <Flex justifyContent={'end'} border='1px solid blue' gap={4} my={6}>
        <Box flex={'1 0 15%'}>
          <Text fontWeight='bold' textAlign={'center'} mb={2}>
            Essential Plan
          </Text>
          <Text textAlign={'center'} mb={2}>
            <Text as={'span'} fontSize={'24px'} fontWeight={'bold'}>
              $10
            </Text>
            /month
          </Text>
          <Text textAlign={'center'} fontSize={'sm'}>
            Basic features for up to 10 users with everything you need
          </Text>
        </Box>
        <Box flex={'1 0 15%'}>
          <Text fontWeight='bold' textAlign={'center'} mb={2}>
            Essential Plan
          </Text>
          <Text textAlign={'center'} mb={2}>
            <Text as={'span'} fontSize={'24px'} fontWeight={'bold'}>
              $10
            </Text>
            /month
          </Text>
          <Text textAlign={'center'} fontSize={'sm'}>
            Basic features for up to 10 users with everything you need
          </Text>
        </Box>{' '}
        <Box flex={'1 0 15%'}>
          <Text fontWeight='bold' textAlign={'center'} mb={2}>
            Essential Plan
          </Text>
          <Text textAlign={'center'} mb={2}>
            <Text as={'span'} fontSize={'24px'} fontWeight={'bold'}>
              $10
            </Text>
            /month
          </Text>
          <Text textAlign={'center'} fontSize={'sm'}>
            Basic features for up to 10 users with everything you need
          </Text>
        </Box>{' '}
        <Box flex={'1 0 15%'}>
          <Text fontWeight='bold' textAlign={'center'} mb={2}>
            Essential Plan
          </Text>
          <Text textAlign={'center'} mb={2}>
            <Text as={'span'} fontSize={'24px'} fontWeight={'bold'}>
              $10
            </Text>
            /month
          </Text>
          <Text textAlign={'center'} fontSize={'sm'}>
            Basic features for up to 10 users with everything you need
          </Text>
        </Box>
      </Flex>

      {Object.entries(CategorizedFeatureKeys).map(([category, features]) => (
        <ComparisonSectionTable
          key={category}
          titleKey={CategoryTitleKeys[category]}
          plans={plans}
          features={features}
          category={category}
        />
      ))}

      <Clients />
      <Faqs />
    </Box>
  )
})
