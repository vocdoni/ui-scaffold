import { Controller, useFormContext } from 'react-hook-form'
import { Box, Flex, FormLabel, Switch, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'

export type StampsUnionTypes = 'AND' | 'OR'

export const StampsUnionType = () => {
  const { control, setValue } = useFormContext<CensusGitcoinValues>()
  const { t } = useTranslation()
  const switchOnChange = (value: string) => {
    const newValue = value === 'OR' ? 'AND' : 'OR'
    setValue('stampsUnionType', newValue)
  }

  return (
    <Controller
      name='stampsUnionType'
      control={control}
      defaultValue={'OR'}
      render={({ field }) => {
        const isChecked = field.value === 'AND'
        return (
          <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }} justifyContent='flex-start' alignItems={'center'}>
            <Switch
              {...field}
              size={'lg'}
              id='stampsUnionType'
              isChecked={isChecked}
              onChange={(e) => switchOnChange(e.target.value)}
            />
            <Box>
              <FormLabel fontWeight='bold'>{field.value}</FormLabel>
              <Text fontSize='sm' color='process_create.description'>
                {t('form.process_create.census.gitcoin_strategy_description_OR')}
                <br />
                {t('form.process_create.census.gitcoin_strategy_description_AND')}
              </Text>
            </Box>
          </Flex>
        )
      }}
    />
  )
}
