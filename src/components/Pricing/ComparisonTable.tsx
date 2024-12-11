import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { Trans, useTranslation } from 'react-i18next'
import { PlanFeaturesTranslationKeys } from './Features'
import { Plan } from './Plans'

type ComparisonTableProps = {
  plans: Plan[]
}

export const ComparisonTable = ({ plans }: ComparisonTableProps) => {
  const { t } = useTranslation()
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const headerBg = useColorModeValue('gray.50', 'gray.800')

  // Get all features from PlanFeaturesTranslationKeys
  const features = Object.entries(PlanFeaturesTranslationKeys).map(([key, translationKey]) => ({
    key,
    translationKey,
  }))

  return (
    <Box overflowX='auto' mt={8}>
      <Text fontSize='2xl' mb={4} textAlign='center'>
        <Trans i18nKey='pricing.compare_features'>Compare all features</Trans>
      </Text>
      <Table variant='simple' borderWidth={1} borderColor={borderColor}>
        <Thead bg={headerBg}>
          <Tr>
            <Th borderColor={borderColor}>
              <Trans i18nKey='pricing.features'>Features</Trans>
            </Th>
            {plans.map((plan) => (
              <Th key={plan.id} borderColor={borderColor} textAlign='center'>
                {plan.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {features.map(({ key, translationKey }) => (
            <Tr key={key}>
              <Td borderColor={borderColor} fontWeight='medium'>
                <Trans i18nKey={translationKey} />
              </Td>
              {plans.map((plan) => {
                const value = dotobject(plan, key)
                return (
                  <Td key={plan.id} borderColor={borderColor} textAlign='center'>
                    {typeof value === 'boolean' ? (
                      <Icon as={value ? CheckIcon : CloseIcon} color={value ? 'green.500' : 'red.500'} />
                    ) : typeof value === 'number' ? (
                      value
                    ) : (
                      '-'
                    )}
                  </Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
