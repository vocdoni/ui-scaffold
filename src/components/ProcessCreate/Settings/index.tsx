import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from '../WrapperFormSection'
import Advanced from './Advanced'
import SettignsAutostart from './Autostart'

const CreateProcessSettings = () => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  watch('weightedVote')

  useWatch({
    name: ['electionType'],
  })

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <WrapperFormSection>
      <Flex direction='column' gap={4}>
        <Text as='legend' fontSize='1.3em'>
          {t('form.process_create.settings')}
        </Text>
        <SettignsAutostart register={register} getValues={getValues} />
        {!getValues().electionType.autoStart && (
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel whiteSpace='nowrap'>{t('form.process_create.date_start')}</FormLabel>
            <Input
              type='date'
              {...register(`startDate`, {
                required,
              })}
            />
            <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.endDate}>
          <FormLabel>{t('form.process_create.date_end')}</FormLabel>
          <Input type='date' {...register(`endDate`, { required })} />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Advanced register={register} getValues={getValues} />
      </Flex>
    </WrapperFormSection>
  )
}

export default CreateProcessSettings
