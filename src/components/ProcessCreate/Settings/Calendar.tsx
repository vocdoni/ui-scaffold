import { InfoOutlineIcon } from '@chakra-ui/icons'
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
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Calendar = () => {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  useWatch({
    name: ['electionType'],
  })

  const { ref: startRef } = register('startDate')
  const { ref: endRef } = register('endDate')
  const startDateRef = useRef<HTMLInputElement | null>()
  const endDateRef = useRef<HTMLInputElement | null>()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const showPicker = (ref: MutableRefObject<HTMLInputElement | null | undefined>) => {
    if (ref.current && 'showPicker' in ref.current) ref.current.showPicker()
  }

  const [valueRadio, setValueRadio] = useState('1')

  useEffect(() => {
    if (valueRadio === '1') setValue('electionType.autoStart', true)
    else setValue('electionType.autoStart', false)
  }, [valueRadio, setValue])

  return (
    <Flex flexDirection='column' gap={2}>
      <Box>
        <Text as='legend' fontSize='xl' fontWeight={700}>
          {t('form.process_create.calendar.title')}
        </Text>
        <Text as='legend' fontWeight={500}>
          {t('form.process_create.calendar.start_date')}
        </Text>
        <Text fontWeight={400} fontSize='xs' color='process_create.description'>
          {t('form.process_create.calendar.start_date_description')}
        </Text>
      </Box>

      <RadioGroup onChange={setValueRadio} value={valueRadio}>
        <Stack direction='row' alignItems='start' gap={40}>
          <Flex flexDirection='column' gap={2}>
            <Radio value='1' onClick={() => clearErrors('startDate')}>
              <Text fontWeight={700}>{t('form.process_create.calendar.now')}</Text>
            </Radio>
          </Flex>

          <FormControl isInvalid={!!errors.startDate} display='flex' flexDirection='column' gap={2} width='180px'>
            <Radio value='2' alignItems='center'>
              <FormLabel whiteSpace='nowrap' m={0} fontWeight='bold'>
                {t('form.process_create.calendar.start_on_a_date')}
              </FormLabel>
            </Radio>
            <Box>
              <Input
                disabled={getValues().electionType.autoStart}
                type='date'
                {...register(`startDate`, {
                  required: {
                    value: !getValues().electionType.autoStart,
                    message: t('form.error.field_is_required'),
                  },
                })}
                ref={(e) => {
                  startRef(e)
                  startDateRef.current = e
                }}
                onClick={() => showPicker(startDateRef)}
                bgColor='white'
              />

              <FormErrorMessage fontWeight={400} fontSize='xs'>
                {errors.startDate?.message?.toString()}
              </FormErrorMessage>
            </Box>
          </FormControl>
        </Stack>
      </RadioGroup>
      <Box>
        <FormControl isInvalid={!!errors.endDate} width='180px' mb={3}>
          <FormLabel fontWeight={500}> {t('form.process_create.calendar.end_date')}</FormLabel>
          <Input
            type='date'
            {...register(`endDate`, { required })}
            ref={(e) => {
              endRef(e)
              endDateRef.current = e
            }}
            onClick={() => showPicker(endDateRef)}
            bgColor='white'
          />
          <FormErrorMessage fontWeight={400} fontSize='xs'>
            {errors.endDate?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Flex alignItems='center' gap={1} border='1px solid' p={2} color='process_create.account_name_note_logo'>
          <InfoOutlineIcon boxSize={3} />
          <Text fontWeight={400} fontSize='xs' color='process_create.description'>
            {t('form.process_create.calendar.end_date_description')}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Calendar
