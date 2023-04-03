import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { useRef } from 'react'
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

  const { ref: startRef } = register('startDate')
  const { ref: endRef } = register('endDate')

  const startDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)

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
              ref={(e) => {
                startRef(e)
                startDateRef.current = e
              }}
              onClick={() => {
                try {
                  startDateRef.current?.showPicker()
                } catch (err) {
                  console.log(err)
                }
              }}
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
            onClick={() => {
              try {
                endDateRef.current?.showPicker()
              } catch (err) {
                console.log(err)
              }
            }}
          />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Advanced register={register} getValues={getValues} />
      </Flex>
    </WrapperFormSection>
  )
}

export default CreateProcessSettings
