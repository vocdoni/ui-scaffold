import { InfoIcon } from '@chakra-ui/icons'
import {
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

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  return (
    <Box>
      <Box mb={4}>
        <Text className='process-create-title'>{t('form.process_create.calendar.title')}</Text>
        <Text fontWeight='normal' fontSize='sm' color='process_create.description'>
          {t('form.process_create.calendar.title_description')}
        </Text>
      </Box>
      <Flex
        className='process-create-section'
        bgColor='process_create.section'
        flexDirection={{ base: 'column', xl2: 'row' }}
        justifyContent='space-between'
        gap={{ xl2: 20 }}
        p={4}
      >
        <Box w='full'>
          <FormControl variant='process-create-label'>
            <FormLabel>{t('form.process_create.calendar.start_date')}</FormLabel>
          </FormControl>
          <Text fontSize='sm' mb={2} color='process_create.description'>
            {t('form.process_create.calendar.start_date_description')}
          </Text>
          <RadioGroup {...useBooleanRadioRegister('electionType.autoStart')} mb={6} w='full'>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              gap={5}
              alignItems='start'
              justifyContent='start'
              maxW='min-content'
              minW='full'
            >
              <FormControl
                variant='process-create-radio'
                flex='1 1 50%'
                maxW={70}
                p={0}
                border='1px solid'
                borderColor={autoStart ? 'process_create.calendar_start_date_selected' : 'lightgray'}
                sx={{
                  '& > label': {
                    display: 'flex',
                    p: 2,
                  },
                }}
              >
                <Radio value='1' w='full' onClick={() => clearErrors('startDate')}>
                  <Text fontSize='sm'>{t('form.process_create.calendar.now')}</Text>
                </Radio>
              </FormControl>

              <Box flex='1 1 50%' maxW={70}>
                <FormControl
                  variant='process-create-radio'
                  border='1px solid'
                  borderColor={!autoStart ? 'process_create.calendar_start_date_selected' : 'lightgray'}
                  mb={2}
                  sx={{
                    '& > label': {
                      display: 'flex',
                      p: 2,
                    },
                  }}
                >
                  <Radio value='0'>
                    <Text
                      fontSize='sm'
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
                  </FormControl>
                )}
              </Box>
            </Stack>
          </RadioGroup>

          <FormControl variant='process-create-label' isInvalid={!!errors.endDate} maxW={70}>
            <FormLabel>{t('form.process_create.calendar.end_date')}</FormLabel>
            <Text whiteSpace='nowrap' fontSize='sm' mb={2} color='process_create.description'>
              {t('form.process_create.calendar.end_date_title_helper')}
            </Text>
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
        </Box>

        {end && (
          <Box position='relative' maxW={{ xl2: 76 }} border='1px solid lightgray' mt={{ base: 5, xl2: 0 }}>
            <InfoIcon color='process_create.alert_info.color' position='absolute' top={4} left={4} />
            <Text color='process_create.description' p={5} pt={{ base: 10, xl2: 10 }}>
              {t('form.process_create.calendar.end_date_description', {
                date: {
                  begin: begin && !autoStart ? new Date(begin) : new Date(),
                  end: end && new Date(end),
                },
                format: datef,
              })}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default Calendar
