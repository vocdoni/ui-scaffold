import {
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GitcoinStampToken } from '~components/ProcessCreate/Census/Gitcoin/index'
import { StampCard } from '~components/ProcessCreate/Census/Gitcoin/StampCard'
import { StampsUnionType } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'

interface IGitcoinFormProps {
  gitcoinTokens: GitcoinStampToken[]
}

export const GitcoinForm: FC<IGitcoinFormProps> = ({ gitcoinTokens }) => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <Flex gap={8} direction={'column'}>
      <Controller
        name={'gpsWeighted'}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }}>
            <Checkbox isChecked={value} onChange={(e) => onChange(e.target.checked as boolean)}>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px'>
                {t('form.process_create.census.weighted_voting_title')}
              </Text>
            </Checkbox>
            <Text fontSize='16px' lineHeight='20px'>
              {t('form.process_create.census.weighted_voting_description')}
            </Text>
          </Flex>
        )}
      ></Controller>
      <Controller
        name={'passportScore'}
        control={control}
        defaultValue={10}
        rules={{
          required,
        }}
        render={({ field: { ref, onChange, value, ...restField } }) => (
          <>
            <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_passport_score')}</FormLabel>
            <Flex gap={8}>
              <NumberInput
                defaultValue={10}
                min={1}
                max={100}
                maxW={40}
                value={value}
                {...restField}
                onChange={(e) => {
                  onChange(Number(e))
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex='1'
                focusThumbOnChange={false}
                value={value}
                onChange={(e) => {
                  onChange(Number(e))
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px' children={value} />
              </Slider>
            </Flex>
          </>
        )}
      ></Controller>
      <>
        <Flex justifyContent={'space-between'} gap={5} flexDirection={{ base: 'column', md: 'row' }}>
          <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_stamps')}</FormLabel>
          <StampsUnionType />
        </Flex>
        <Grid
          gap={5}
          templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
          justifyContent='space-between'
        >
          {gitcoinTokens.map((token, i) => (
            <StampCard key={i} token={token} />
          ))}
        </Grid>
      </>
    </Flex>
  )
}
