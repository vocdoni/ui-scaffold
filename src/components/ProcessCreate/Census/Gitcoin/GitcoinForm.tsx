import {
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { StampCard } from '~components/ProcessCreate/Census/Gitcoin/StampCard'
import { GitcoinStampToken } from '~components/ProcessCreate/Census/Gitcoin/index'

interface IGitcoinFormProps {
  gitcoinTokens: GitcoinStampToken[]
}

export const GitcoinForm: FC<IGitcoinFormProps> = ({ gitcoinTokens }) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <>
      <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_passport_score')}</FormLabel>
      <Controller
        name={'passportScore'}
        control={control}
        defaultValue={50}
        rules={{
          required,
        }}
        render={({ field: { ref, ...restField } }) => (
          <NumberInput defaultValue={50} min={1} max={100} maxW={40} {...restField}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      ></Controller>
      <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_stamps')}</FormLabel>
      <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        {gitcoinTokens.map((token) => (
          <StampCard key={token.ID} name={token.name} stampId={token.externalID} />
        ))}
      </Flex>
    </>
  )
}
