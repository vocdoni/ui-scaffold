import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Switch,
  VStack,
} from '@chakra-ui/react'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useSubscription } from '~components/Auth/Subscription'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { SubscriptionPermission } from '~constants'
import { useDateFns } from '~i18n/use-date-fns'

const DateFormatHtml = 'yyyy-MM-dd'

export const BasicConfig = () => {
  const { t } = useTranslation()
  const { permission } = useSubscription()
  const { openModal } = usePricingModal()
  const { format } = useDateFns()
  const maxDuration = permission(SubscriptionPermission.MaxDuration)
  const [durationExceeded, setDurationExceeded] = useState(false)
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext()
  const startDateRef = useRef<HTMLInputElement | null>()
  const endDateRef = useRef<HTMLInputElement | null>()
  const [min, setMin] = useState<Date>(new Date())

  const autoStart = watch('autoStart')
  const startDate = watch('startDate')
  const startTime = watch('startTime')
  const endDate = watch('endDate')
  const today = new Date().toISOString().split('T')[0]

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const validateDuration = (value: string) => {
    if (!value || !maxDuration) return true

    const start = startDate && !autoStart ? new Date(startDate) : new Date()
    const end = new Date(value)
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    const maxDurationDays = parseInt(maxDuration)

    return (
      durationDays <= maxDurationDays ||
      t('form.create_process.error.max_duration_exceeded', {
        defaultValue: 'Exceeds max duration.',
        days: maxDuration,
      })
    )
  }

  const validateEndDateAfterStart = (value: string) => {
    if (!value || !startDate || autoStart) return true
    const start = startDate && !autoStart ? new Date(startDate) : new Date()
    const end = new Date(value)

    return (
      end >= start ||
      t('form.create_process.error.end_date_greater_than_start', {
        defaultValue: 'End date must be greater than start date.',
      })
    )
  }

  const startDateRegister = register('startDate', {
    onChange: (e) => setMin(new Date(e.target.value)),
    required: {
      value: !autoStart,
      message: t('form.error.field_is_required'),
    },
  })

  const endDateRegister = register('endDate', {
    required,
    validate: { validateDuration, validateEndDateAfterStart },
  })

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  useEffect(() => {
    if (!endDate || !maxDuration) return

    const start = startDate && !autoStart ? new Date(startDate) : new Date()
    const end = new Date(endDate)
    const maxDurationDays = parseInt(maxDuration)
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    setDurationExceeded(durationDays > maxDurationDays)
  }, [startDate, endDate, autoStart, maxDuration])

  const handleAutoStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('autoStart', e.target.checked)
    if (e.target.checked) {
      setValue('startDate', '')
      setValue('startTime', '')
      setMin(new Date())
      clearErrors(['startDate', 'startTime'])
    }
  }

  return (
    <VStack align='stretch'>
      <Box>
        <FormControl display='flex' alignItems='center' mb={4}>
          <FormLabel htmlFor='autoStart' mb='0'>
            <Trans i18nKey='process_create.auto_start'>Start immediately</Trans>
          </FormLabel>
          <Switch
            id='autoStart'
            {...register('autoStart')}
            colorScheme='black'
            isChecked={autoStart}
            onChange={handleAutoStartChange}
          />
        </FormControl>

        {!autoStart && (
          <>
            <FormControl isInvalid={!!errors.startDate || !!errors.startTime} mb={2}>
              <FormLabel htmlFor='startDate'>
                <Trans i18nKey='process_create.start_datetime'>Start date and time</Trans>
              </FormLabel>
              <HStack>
                <Box flex='1'>
                  <Input
                    id='startDate'
                    {...startDateRegister}
                    ref={(e) => {
                      startDateRegister.ref(e)
                      startDateRef.current = e
                    }}
                    type='date'
                    min={today}
                    onFocus={() => showPicker(startDateRef)}
                  />
                </Box>
                <Box flex='1'>
                  <Input
                    type='time'
                    {...register('startTime', {
                      required,
                    })}
                  />
                </Box>
              </HStack>
              <FormErrorMessage>
                {errors.startDate?.message?.toString() || errors.startTime?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </>
        )}
      </Box>

      {/* End date and time */}
      <Box>
        <FormControl isInvalid={!!errors.endDate || !!errors.endTime} mb={2}>
          <FormLabel htmlFor='endDate'>
            <Trans i18nKey='process_create.end_datetime'>End date and time</Trans>
          </FormLabel>
          <HStack spacing={4} align='start'>
            <Box flex='1'>
              <Input
                id='endDate'
                {...endDateRegister}
                ref={(e) => {
                  endDateRegister.ref(e)
                  endDateRef.current = e
                }}
                type='date'
                min={format(min, DateFormatHtml)}
                onFocus={() => showPicker(endDateRef)}
              />
            </Box>
            <Box flex='1'>
              <Input
                type='time'
                {...register('endTime', {
                  required,
                  validate: (value: string) => {
                    if (!value || !endDate) return true
                    const end = new Date(`${endDate}T${value}`)
                    const start = startDate && !autoStart ? new Date(`${startDate}T${startTime}`) : new Date()
                    return (
                      end >= start ||
                      t('form.create_process.error.end_time_greater_than_start', {
                        defaultValue: 'End time must be greater than start time.',
                      })
                    )
                  },
                })}
              />
            </Box>
          </HStack>
          <FormErrorMessage>
            {errors.endDate?.message?.toString() || errors.endTime?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
      </Box>

      {durationExceeded && (
        <Alert status='error'>
          <AlertIcon />
          <AlertDescription fontSize='sm'>
            <Trans i18nKey='calendar.max_duration_exceeded'>
              The selected duration exceeds the maximum allowed duration of {{ maxDuration }} days for your plan. Reduce
              the voting length or{' '}
              <Button variant='link' onClick={() => openModal('subscription')}>
                upgrade your plan
              </Button>
              .
            </Trans>
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  )
}
