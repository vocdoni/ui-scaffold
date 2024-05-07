import { Box, Flex, HStack, Text, useRadio, useRadioGroup } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UseRadioProps } from '@chakra-ui/radio/dist/use-radio'
import { PropsWithChildren } from 'react'

export type StampsUnionTypes = 'AND' | 'OR'

const UnionTypeRadioCard = (props: UseRadioProps & PropsWithChildren) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'checkbox.selected',
          color: 'checkbox.selected_text',
          borderColor: 'primary.dark2',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const StampsUnionType = () => {
  const { t } = useTranslation()
  const options: StampsUnionTypes[] = ['OR', 'AND']
  const { setValue, getValues, watch } = useFormContext()

  const { getRadioProps } = useRadioGroup({
    name: 'stampsUnionType',
    defaultValue: getValues('stampsUnionType'),
    onChange: (value) => {
      setValue('stampsUnionType', value)
    },
  })

  let description = t('form.process_create.census.gitcoin_strategy_description_OR')
  if (watch('stampsUnionType') === 'AND') {
    description = t('form.process_create.census.gitcoin_strategy_description_AND')
  }

  return (
    <Flex
      gap={2}
      flexDirection={'column'}
      justifyContent={{ base: 'start', md: 'space-between' }}
      alignItems={{ base: 'start', md: 'end' }}
      maxW={600}
    >
      <HStack>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <UnionTypeRadioCard key={value} {...radio}>
              {value}
            </UnionTypeRadioCard>
          )
        })}
      </HStack>
      <Text fontSize='xs' color='process_create.description' flex={1} textAlign={'left'}>
        {description}
      </Text>
    </Flex>
  )
}
