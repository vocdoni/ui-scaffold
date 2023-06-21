import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { MutableRefObject, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBooleanRadioRegister } from '../../../constants'

const DateFormatHtml = 'yyyy-MM-dd'

const Calendar = () => {
  const { t } = useTranslation()
  const {
    register,
    getValues,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext()

  useWatch({
    name: ['electionType'],
  })

  const { ref: startRef } = register('startDate')
  const { ref: endRef } = register('endDate')
  const startDateRef = useRef<HTMLInputElement | null>()
  const endDateRef = useRef<HTMLInputElement | null>()
  const [min, setMin] = useState<Date>(new Date())

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  const begin = watch('startDate')
  const end = watch('endDate')
  // translations parser can't take an "inception" of translations, that's why we define it here
  const datef = t('form.process_create.calendar.date_format')
  const today = format(new Date(), DateFormatHtml)

  return (
    <Flex flexDirection='column' gap={2}>
      <Box>
        <Text as='legend' fontSize='xl' fontWeight='bold'>
          {t('form.process_create.calendar.title')}
        </Text>
        <Text fontWeight='normal' fontSize='xs' color='process_create.description'>
          {t('form.process_create.calendar.start_date_description')}
        </Text>
      </Box>
      <RadioGroup {...useBooleanRadioRegister('electionType.autoStart')}>
        <Stack direction='row' alignItems='start' gap={40}>
          <FormControl isInvalid={!!errors.startDate} display='flex' flexDirection='column' gap={2} width='180px'>
            <Radio value='0' alignItems='center'>
              <Text
                whiteSpace='nowrap'
                m={0}
                fontWeight='bold'
                onClick={() =>
                  // we need to use a timeout cos' triggering it immediately would not work, since this input is still disabled
                  setTimeout(() => {
                    startDateRef.current?.focus()
                    startDateRef.current?.click()
                  }, 75)
                }
              >
                {t('form.process_create.calendar.start_on_a_date')}
              </Text>
            </Radio>
            <Box>
              <Input
                disabled={getValues().electionType.autoStart}
                type='date'
                {...register(`startDate`, {
                  onChange: (e) => setMin(new Date(e.target.value)),
                  required: {
                    value: !getValues().electionType.autoStart,
                    message: t('form.error.field_is_required'),
                  },
                })}
                ref={(e) => {
                  startRef(e)
                  startDateRef.current = e
                }}
                min={today}
                onClick={() => showPicker(startDateRef)}
              />

              <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
            </Box>
          </FormControl>
          <Flex flexDirection='column' gap={2}>
            <Radio value='1' onClick={() => clearErrors('startDate')}>
              <Text fontWeight='bold'>{t('form.process_create.calendar.now')}</Text>
            </Radio>
          </Flex>
        </Stack>
      </RadioGroup>
      <Box>
        <FormControl isInvalid={!!errors.endDate} width='180px' mb={3}>
          <FormLabel fontWeight='bold'> {t('form.process_create.calendar.end_date')}</FormLabel>
          <Input
            type='date'
            {...register(`endDate`, { required })}
            ref={(e) => {
              endRef(e)
              endDateRef.current = e
            }}
            min={format(min, DateFormatHtml)}
            onClick={() => showPicker(endDateRef)}
          />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>

        {end && (
          <Alert variant='clarification' status='info'>
            <AlertIcon />
            <AlertTitle>
              {t('form.process_create.calendar.end_date_description', {
                date: {
                  begin: begin ? new Date(begin) : new Date(),
                  end: end && new Date(end),
                },
                format: datef,
              })}
            </AlertTitle>
          </Alert>
        )}
      </Box>
    </Flex>
  )
}

export default Calendar
