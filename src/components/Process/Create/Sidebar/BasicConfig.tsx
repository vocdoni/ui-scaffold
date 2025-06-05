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

const DateFormatHtml = 'yyyy-MM-dd HH:mm'

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
  const watchedStartDate = watch('startDate')
  const endDate = watch('endDate')
  const today = new Date().toISOString().split('T')[0]

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const validateDuration = (value: string) => {
    if (!value || !maxDuration) return true

    const start = watchedStartDate && !autoStart ? new Date(watchedStartDate) : new Date()
    const end = new Date(value)
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    const maxDurationDays = parseInt(maxDuration)

    return (
      durationDays <= maxDurationDays ||
      t('form.error.max_duration_exceeded', {
        defaultValue: 'Exceeds max duration.',
        days: maxDuration,
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
    required: {
      value: true,
      message: t('form.error.field_is_required'),
    },
    validate: validateDuration,
  })

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  useEffect(() => {
    if (!endDate || !maxDuration) return

    const start = watchedStartDate && !autoStart ? new Date(watchedStartDate) : new Date()
    const end = new Date(endDate)
    const maxDurationDays = parseInt(maxDuration)
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    setDurationExceeded(durationDays > maxDurationDays)
  }, [watchedStartDate, endDate, autoStart, maxDuration])

  const handleAutoStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('autoStart', e.target.checked)
    if (e.target.checked) {
      clearErrors('startDate')
      clearErrors('startTime')
    }
  }

  return (
    <VStack align='stretch'>
      <Box>
        <FormControl display='flex' alignItems='center' mb={4}>
          <FormLabel htmlFor='autoStart' mb='0'>
            <Trans i18nKey='process_create.auto_start'>Start immediately</Trans>
          </FormLabel>
          <Switch id='autoStart' {...register('autoStart')} isChecked={autoStart} onChange={handleAutoStartChange} />
        </FormControl>

        {!autoStart && (
          <>
            <FormLabel htmlFor='startDate'>
              <Trans i18nKey='process_create.start_datetime'>Start date and time</Trans>
            </FormLabel>
            <HStack>
              <FormControl isInvalid={!!errors.startDate} mb={2}>
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
                <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.startTime} mb={2}>
                <Input
                  type='time'
                  {...register('startTime', {
                    required,
                  })}
                />
                <FormErrorMessage>{errors.startTime?.message?.toString()}</FormErrorMessage>
              </FormControl>
            </HStack>
          </>
        )}
      </Box>

      {/* End date and time */}
      <Box>
        <FormLabel htmlFor='endDate'>
          <Trans i18nKey='process_create.end_datetime'>End date and time</Trans>
        </FormLabel>
        <HStack>
          <FormControl isInvalid={!!errors.endDate} mb={2}>
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
            <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.endTime} mb={2}>
            <Input
              type='time'
              {...register('endTime', {
                required: t('form.error.field_is_required', 'This field is required'),
              })}
            />
            <FormErrorMessage>{errors.endTime?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </HStack>
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
