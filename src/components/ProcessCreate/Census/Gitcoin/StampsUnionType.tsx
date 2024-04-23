import { Flex, FormLabel, Switch, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
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
        let description = t('form.process_create.census.gitcoin_strategy_description_OR')
        if (isChecked) {
          description = t('form.process_create.census.gitcoin_strategy_description_AND')
        }
        return (
          <Flex
            gap={5}
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={{ base: 'start', md: 'space-between' }}
            alignItems={{ base: 'start', md: 'center' }}
            maxW={600}
          >
            <Flex flexDirection={'row'} gap={4} alignItems={'center'}>
              <Switch
                {...field}
                size={'lg'}
                id='stampsUnionType'
                isChecked={isChecked}
                onChange={(e) => switchOnChange(e.target.value)}
              />
              <FormLabel minWidth='40px' fontWeight='bold' m={0}>
                {field.value}
              </FormLabel>
            </Flex>
            <Text fontSize='xs' color='process_create.description' flex={1} textAlign={'left'}>
              {description}
            </Text>
          </Flex>
        )
      }}
    />
  )
}
