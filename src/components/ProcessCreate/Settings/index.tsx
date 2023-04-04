import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { MutableRefObject, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from '../WrapperFormSection'
import Advanced from './Advanced'
import Autostart from './Autostart'

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

  const { ref: startRef } = register('startDate')
  const { ref: endRef } = register('endDate')
  const startDateRef = useRef<HTMLInputElement | null>()
  const endDateRef = useRef<HTMLInputElement | null>()

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  return (
    <WrapperFormSection>
      <Flex direction='column' gap={4}>
        <Text as='legend' fontSize='1.3em'>
          {t('form.process_create.settings')}
        </Text>
        <Autostart />
        {!getValues().electionType.autoStart && (
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel whiteSpace='nowrap'>{t('form.process_create.date_start')}</FormLabel>
            <Input
              type='date'
              {...register(`startDate`, {
                required,
              })}
              ref={(e) => {
                startRef(e)
                startDateRef.current = e
              }}
              onClick={() => showPicker(startDateRef)}
            />

            <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.endDate}>
          <FormLabel>{t('form.process_create.date_end')}</FormLabel>
          <Input
            type='date'
            {...register(`endDate`, { required })}
            ref={(e) => {
              endRef(e)
              endDateRef.current = e
            }}
            onClick={() => showPicker(endDateRef)}
          />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Advanced />
      </Flex>
    </WrapperFormSection>
  )
}

export default CreateProcessSettings
