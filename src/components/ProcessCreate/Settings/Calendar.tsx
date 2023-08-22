import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { useBooleanRadioRegister } from '@constants'
import { useDateFns } from '@i18n/use-date-fns'
import { MutableRefObject, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 10 }}>
      <Box flexBasis='30%' flexShrink={0}>
        <Text as='legend' fontWeight='bold' mb={2}>
          {t('form.process_create.calendar.title')}
        </Text>
        <Text fontWeight='normal' fontSize='sm' color='process_create.description'>
          {t('form.process_create.calendar.start_date_description')}
        </Text>
      </Box>
      <Box flexGrow={1}>
        <RadioGroup {...useBooleanRadioRegister('electionType.autoStart')} mb={6}>
          <Stack direction={{ base: 'column', md: 'row' }} gap={2}>
            <FormControl
              isInvalid={!!errors.startDate}
              display='flex'
              flexDirection='column'
              gap={2}
              order={{ base: 2, md: 1 }}
              flexGrow={0}
            >
              <Radio value='0' alignItems='center'>
                <Text
                  id='start-on-date'
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
              <Box w={64}>
                <Input
                  aria-labelledby='start-on-date'
                  disabled={getValues().electionType.autoStart}
                  type='datetime-local'
                  {...startDate}
                  ref={(e) => {
                    startDate.ref(e)
                    startDateRef.current = e
                  }}
                  min={today}
                  onFocus={() => showPicker(startDateRef)}
                />
                <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
              </Box>
            </FormControl>
            <Flex order={{ base: 1, md: 2 }} flexBasis={{ md: 124 }} flexDirection='column' gap={2}>
              <Radio value='1' onClick={() => clearErrors('startDate')}>
                <Text fontWeight='bold'>{t('form.process_create.calendar.now')}</Text>
              </Radio>
            </Flex>
          </Stack>
        </RadioGroup>

        <FormControl isInvalid={!!errors.endDate} w={64} mb={3}>
          <FormLabel fontWeight='bold'> {t('form.process_create.calendar.end_date')}</FormLabel>
          <Input
            type='datetime-local'
            {...endDate}
            ref={(e) => {
              endDate.ref(e)
              endDateRef.current = e
            }}
            min={format(min, DateFormatHtml)}
            onFocus={() => showPicker(endDateRef)}
          />
          <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
        </FormControl>

        {end && (
          <Alert status='info'>
            <AlertIcon />
            <AlertDescription>
              {t('form.process_create.calendar.end_date_description', {
                date: {
                  begin: begin && !autoStart ? new Date(begin) : new Date(),
                  end: end && new Date(end),
                },
                format: datef,
              })}
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </Flex>
  )
}

export default Calendar
