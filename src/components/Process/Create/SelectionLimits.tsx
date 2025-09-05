import { Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { DashboardSection } from '~components/shared/Dashboard/Contents'
import { Select } from '~components/shared/Form/Select'
import { SelectorTypes } from '.'

const SelectionLimits = ({ index }) => {
  const { control, setValue, watch } = useFormContext()
  const { t } = useTranslation()
  const questionType = watch('questionType')
  const fields = watch(`questions.${index}.options`)
  const min = watch(`questions.${index}.minSelections`)
  const max = watch(`questions.${index}.maxSelections`)
  const options = [{ value: 0, label: '0' }, ...fields.map((_, i) => ({ value: i + 1, label: `${i + 1}` }))]

  // Ensure max is not less than min
  useEffect(() => {
    if (min && max && max < min) {
      setValue(`questions.${index}.maxSelections`, min)
    }
  }, [min, max, index, setValue])

  if (questionType === SelectorTypes.Single) return null

  return (
    <DashboardSection p={4} mb={4}>
      <Text fontWeight='medium' mb={1}>
        <Trans i18nKey='process.create.selectionLimits.title'>Selection limits:</Trans>
      </Text>
      <Text as='span' fontSize='sm'>
        <Trans
          i18nKey='process.create.selectionLimits.full'
          defaults='Voters must select at least  <min />  and at most  <max />  options.'
          components={{
            min: (
              <Controller
                name={`questions.${index}.minSelections`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => {
                  const selectedOption = options.find((opt) => opt.value === field.value)

                  return (
                    <Box display='inline-block'>
                      <Select
                        {...field}
                        value={selectedOption}
                        options={options}
                        isInvalid={!!fieldState.invalid}
                        isClearable={false}
                        onChange={(option) => field.onChange(option?.value)}
                        size='sm'
                      />
                    </Box>
                  )
                }}
              />
            ),
            max: (
              <Controller
                name={`questions.${index}.maxSelections`}
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    value >= min || t('form.error.max_greater_than_min', 'Max must be greater than or equal to Min'),
                }}
                render={({ field, fieldState }) => {
                  const maxOptions = options.filter((opt) => !min || opt.value >= min)
                  const selectedOption = maxOptions.find((opt) => opt.value === field.value) ?? maxOptions[0]

                  return (
                    <Box display='inline-block'>
                      <Select
                        {...field}
                        value={selectedOption}
                        options={maxOptions}
                        isInvalid={!!fieldState.invalid}
                        isClearable={false}
                        onChange={(option) => field.onChange(option?.value)}
                        size='sm'
                      />
                    </Box>
                  )
                }}
              />
            ),
          }}
        />
      </Text>
    </DashboardSection>
  )
}

export default SelectionLimits
