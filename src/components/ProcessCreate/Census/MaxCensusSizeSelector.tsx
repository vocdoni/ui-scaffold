import {
  Alert,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Census3Token } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'

export const MaxCensusSizeSelector = ({ token, strategySize }: { token?: Census3Token; strategySize: number }) => {
  const {
    getValues,
    formState: { errors },
    control,
    setValue,
  } = useFormContext()
  const {
    form: {
      electionType: { anonymous },
    },
  } = useProcessCreationSteps()

  const formMaxCensusSize = getValues('maxCensusSize')

  const [delayedInputNumber, setDelayedInputNumber] = useState(formMaxCensusSize)
  const timeout = useRef<number>()
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const { t } = useTranslation()

  // Use effect that delays the render when the user is adding numbers on the NumberInput element
  // If not delayed, the ui updates every time a number is added and the focus is lost from the input
  useEffect(() => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }
    timeout.current = window.setTimeout(() => setValue('maxCensusSize', Number(delayedInputNumber)), 500)
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current)
      }
    }
  }, [delayedInputNumber])

  if (!token || !strategySize) return null

  const percentButtonValues = [0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 1]

  return (
    <>
      <FormControl isInvalid={!!errors.maxCensusSize} mb={3}>
        <Controller
          name={'maxCensusSize'}
          control={control}
          defaultValue={formMaxCensusSize}
          rules={{
            validate: (value) => value > 0 || t('process_create.census.mandatory_max_census_size'),
            required: t('process_create.census.mandatory_max_census_size'),
          }}
          render={({ field: { ref, onChange, onBlur, value, ...restField } }) => {
            const percent = Math.round((value / strategySize) * 100)
            return (
              <>
                <Flex gap={5} flexDirection={{ base: 'column', xl: 'row' }}>
                  <NumberInput
                    my={3}
                    min={1}
                    max={strategySize}
                    value={delayedInputNumber}
                    defaultValue={delayedInputNumber}
                    {...restField}
                    onChange={(v) => {
                      setDelayedInputNumber(Number(v))
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Slider
                    aria-label={t('form.process_create.census.max_census_slider_arialabel')}
                    value={value}
                    defaultValue={value}
                    min={1}
                    max={strategySize}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={(v) => {
                      onChange(Number(v))
                      setDelayedInputNumber(Number(v))
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderMark value={strategySize * 0.25} mt='1' ml='-2.5' fontSize='sm'>
                      25%
                    </SliderMark>
                    <SliderMark value={strategySize * 0.5} mt='1' ml='-2.5' fontSize='sm'>
                      50%
                    </SliderMark>
                    <SliderMark value={strategySize * 0.75} mt='1' ml='-2.5' fontSize='sm'>
                      75%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg='primary.600' />
                    </SliderTrack>

                    <Tooltip
                      hasArrow
                      bg='primary.600'
                      color='white'
                      placement='top'
                      isOpen={showTooltip}
                      label={t('form.process_create.census.max_census_slider_tooltip', {
                        percent,
                        voters: Math.round(value),
                      })}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                </Flex>
                <FormErrorMessage>{errors.maxCensusSize && errors.maxCensusSize.message?.toString()}</FormErrorMessage>

                <Wrap spacing={2} mt={3} mb={5} justify='center' w={'100%'}>
                  {percentButtonValues.map((v) => (
                    <WrapItem key={v}>
                      <Button
                        onClick={() => {
                          let val = Math.round(strategySize * v)
                          if (val === 0) {
                            val = 1
                          }
                          setDelayedInputNumber(Number(val))
                          onChange(Number(val))
                        }}
                        fontSize='xs'
                        variant={'secondary'}
                        height={'var(--chakra-sizes-8)'}
                      >
                        {v * 100}%
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
                <Text>
                  <Trans
                    i18nKey={'form.process_create.census.max_census_resum'}
                    values={{
                      symbol: token.symbol,
                      uniTokenHolders: strategySize,
                      holders: delayedInputNumber,
                      percent,
                    }}
                  />
                </Text>
              </>
            )
          }}
        ></Controller>
      </FormControl>

      {anonymous && (
        <Alert status='info'>
          <Text>
            <Text as='span' fontWeight='bold'>
              {t('process_create.anonymous.legal_note')}
            </Text>
            <Text as='span'>{t('process_create.anonymous.legal_disclaimer')}</Text>
          </Text>
        </Alert>
      )}
    </>
  )
}
