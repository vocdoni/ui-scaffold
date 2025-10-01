import {
  Box,
  chakra,
  Divider,
  Flex,
  Icon,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { forwardRef, isValidElement } from 'react'
import { Trans } from 'react-i18next'
import {
  LuChartColumn,
  LuFileCheck,
  LuHeadset,
  LuInfo,
  LuPalette,
  LuShield,
  LuUsers,
  LuVote,
  LuZap,
} from 'react-icons/lu'
import { PlanId } from '~constants'
import { BooleanIcon } from '~shared/Layout/BooleanIcon'
import { CategorizedSpecs, CategoryTitleKeys, FeatureSpec } from './Features'
import { Plan, usePlans, usePlanTranslations } from './Plans'

type ComparisonTableProps = {}

type ComparisonSectionTableProps = {
  titleKey: string
  plans: Plan[]
  specs: FeatureSpec[]
  category: string
}

const renderValue = (value: React.ReactNode | number | boolean) => {
  if (typeof value === 'boolean') return <BooleanIcon value={value} />
  if (isValidElement(value) || typeof value === 'number') return value
  return '-'
}

const SubcategoryIcon: Record<string, React.ElementType> = {
  generalLimits: LuChartColumn,
  votingTypes: LuVote,
  memberbaseManagement: LuUsers,
  authenticationSecurity: LuShield,
  customization: LuPalette,
  extraFeatures: LuZap,
  analyticsAndReporting: LuChartColumn,
  support: LuHeadset,
  complianceAndSecurity: LuFileCheck,
}

const ComparisonSectionTable = ({ titleKey, plans, category, specs }: ComparisonSectionTableProps) => {
  return (
    <>
      <Thead id='section-header'>
        <Tr>
          <Th colSpan={4}>
            <Flex alignItems='center' gap={2}>
              <Icon boxSize={4} as={SubcategoryIcon[category]} />
              <Text as={'span'} textTransform='uppercase' fontSize='sm'>
                <Trans i18nKey={titleKey} />
              </Text>
            </Flex>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {specs.map((spec) => {
          const rowKey = spec.kind === 'plan' ? spec.path : spec.id
          return (
            <Tr key={rowKey}>
              <Td fontWeight='medium'>
                <Trans i18nKey={spec.labelKey} />
                {spec.tooltip && (
                  <Tooltip label={<Trans i18nKey={spec.tooltip} />} placement='auto'>
                    <chakra.span verticalAlign='middle'>
                      <Icon as={LuInfo} ml={1} />
                    </chakra.span>
                  </Tooltip>
                )}
              </Td>

              {plans.map((plan) => {
                let cell: React.ReactNode = '-'

                if (spec.kind === 'plan') {
                  const v = dotobject(plan, spec.path)
                  cell = renderValue(v)
                } else {
                  // static
                  if (spec.render) {
                    cell = renderValue(spec.render(plan))
                  } else if (spec.available) {
                    cell = renderValue(Boolean(spec.available(plan)))
                  } else {
                    cell = '-'
                  }
                }

                return (
                  <Td key={plan.id} textAlign='center' w={40}>
                    <Flex alignItems='center' justifyContent='center'>
                      {cell}
                    </Flex>
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </>
  )
}

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>((props, ref) => {
  const { data: plans, isLoading } = usePlans()
  const translations = usePlanTranslations()

  if (isLoading) {
    return <Progress size='sm' isIndeterminate />
  }

  const filteredPlans = plans.filter((plan) => !(plan?.organization?.customPlan || plan.id === PlanId.Custom))

  return (
    <Flex ref={ref} justifyContent='center' w='full' display='column'>
      <TableContainer>
        <Table borderWidth={1} variant='simple'>
          <Thead>
            <Tr>
              <Th>
                <Text as={'span'}>
                  <Trans i18nKey='features.section.features'>Features</Trans>
                </Text>
              </Th>

              {filteredPlans.map((plan) => {
                return (
                  <Th key={plan.id} textAlign='center'>
                    <Flex flexDirection={'column'} justifyContent={'center'}>
                      <Text as={'span'} textAlign={'center'}>
                        {translations[plan.id].title}
                      </Text>
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          {Object.entries(CategorizedSpecs).map(([category, specs]) => (
            <ComparisonSectionTable
              key={category}
              titleKey={CategoryTitleKeys[category]}
              category={category}
              plans={filteredPlans}
              specs={specs}
            />
          ))}
        </Table>
      </TableContainer>
      <Divider mt={6} />
      <Flex textAlign='left' color='texts.subtle' fontSize='xs' flexDirection='column' gap={2}>
        <Box>
          <Trans i18nKey='pricing.comparison_table.footnote_1'>
            ¹ Votes with fewer than 10 participants are treated as test runs and don't count towards your plan limits.
          </Trans>
        </Box>
      </Flex>
    </Flex>
  )
})
