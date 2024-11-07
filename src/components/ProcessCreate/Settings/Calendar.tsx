import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MutableRefObject, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBooleanRadioRegister } from '~constants'
import { useDateFns } from '~i18n/use-date-fns'

const DateFormatHtml = 'yyyy-MM-dd HH:mm'

const Calendar = () => {
  const { t } = useTranslation()

  const {
    register,
    getValues,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext()
  const { format } = useDateFns()
  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  const [min, setMin] = useState<Date>(new Date())
  const startDateRef = useRef<HTMLInputElement | null>()
  const endDateRef = useRef<HTMLInputElement | null>()
  const startDate = register('startDate', {
    onChange: (e) => setMin(new Date(e.target.value)),
    required: {
      value: !getValues().electionType.autoStart,
      message: t('form.error.field_is_required'),
    },
  })
  const endDate = register('endDate', { required })
  const begin = watch('startDate')
  const end = watch('endDate')
  const autoStart = watch('electionType.autoStart')

  // translations parser can't take an "inception" of translations, that's why we define it here
  const datef = t('form.process_create.calendar.date_format')
  const today = format(new Date(), DateFormatHtml)

  useWatch({
    name: ['electionType'],
  })

  const isEndDate = watch('endDate')
  const isStartDate = watch('startDate')

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }
  return (
    <Flex flexDirection='column' gap={6}>
      <Box>
        <Text variant='process-create-title-sm'>{t('calendar.title', { defaultValue: 'Calendar' })}</Text>
        <Text variant='process-create-subtitle-sm'>
          {t('calendar.subtitle', { defaultValue: 'Specify the active period for receiving votes' })}
        </Text>
      </Box>
      <Flex flexDirection='column' pl={6}>
        <Box>
          <Text variant='process-create-title-sm'>{t('calendar.start_date', { defaultValue: 'Start date' })}</Text>
          <Text variant='process-create-subtitle-sm' mb={2}>
            {t('calendar.define_active_period', { defaultValue: 'Define the active period for receiving votes' })}
          </Text>
          <RadioGroup {...useBooleanRadioRegister('electionType.autoStart')} mb={6}>
            <Stack direction={{ base: 'column', lg: 'row' }} gap={5} alignItems='start' justifyContent='start'>
              <FormControl variant='calendar'>
                <Radio value='1' onClick={() => clearErrors('startDate')}>
                  <Text as='span'>{t('form.process_create.calendar.now')}</Text>
                </Radio>
              </FormControl>

              <Box>
                <FormControl variant='calendar' mb={3}>
                  <Radio value='0'>
                    <Text
                      as='span'
                      onClick={() =>
                        // we need to use a timeout cos' triggering it immediately would not work, since this input is still disabled
                        setTimeout(() => {
                          startDateRef.current?.focus()
                        }, 100)
                      }
                    >
                      {t('form.process_create.calendar.start_on_a_date')}
                    </Text>
                  </Radio>
                </FormControl>
                {!autoStart && (
                  <FormControl isInvalid={!!errors.startDate}>
                    <Input
                      variant='calendar'
                      disabled={getValues().electionType.autoStart}
                      type='datetime-local'
                      {...startDate}
                      ref={(e) => {
                        startDate.ref(e)
                        startDateRef.current = e
                      }}
                      min={today}
                      onFocus={() => showPicker(startDateRef)}
                      color={!isStartDate && 'input.placeholder'}
                    />
                    <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Box>
            </Stack>
          </RadioGroup>
        </Box>

        <FormControl isInvalid={!!errors.endDate}>
          <Text variant='process-create-title-sm'>{t('calendar.end_date', { defaultValue: 'End date' })}</Text>
          <Text variant='process-create-subtitle-sm' mb={1}>
            {t('calendar.end_date_description', { defaultValue: 'Define the exact date and time of completion' })}
          </Text>
          <Input
            variant='calendar'
            type='datetime-local'
            placeholder='hello'
            {...endDate}
            ref={(e) => {
              endDate.ref(e)
              endDateRef.current = e
            }}
            min={format(min, DateFormatHtml)}
            onFocus={() => showPicker(endDateRef)}
            color={!isEndDate && 'input.placeholder'}
          />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Flex>

      {end && (
        <Card variant='calendar'>
          <CardHeader>
            <InfoIcon />
          </CardHeader>
          <CardBody>
            <Text>
              {t('form.process_create.calendar.end_date_description', {
                date: {
                  begin: begin && !autoStart ? new Date(begin) : new Date(),
                  end: end && new Date(end),
                },
                format: datef,
              })}
            </Text>
          </CardBody>
        </Card>
      )}
    </Flex>
  )
}

export default Calendar
