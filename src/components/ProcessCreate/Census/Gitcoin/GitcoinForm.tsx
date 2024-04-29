import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
    <Flex gap={6} direction={'column'}>
      <Controller
        name={'passportScore'}
        control={control}
        defaultValue={15}
        rules={{
          required,
        }}
        render={({ field: { ref, onChange, value, ...restField } }) => (
          <Box>
            <Flex gap={8} alignItems='center'>
              <Box>
                <FormLabel mb={4} fontWeight='bold' whiteSpace='nowrap'>
                  {t('form.process_create.census.gitcoin_passport_score')}
                </FormLabel>
                <NumberInput
                  defaultValue={15}
                  min={1}
                  max={100}
                  maxW={40}
                  value={value}
                  {...restField}
                  onChange={(_, num) => {
                    onChange(num)
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              <Flex justifyContent='center' alignItems='center' flexDirection='column' w='full' fontWeight='bold'>
                <Text className='brand-theme' ml='-50px' color='process_create.gitcoin_sybil'>
                  {t('gitcoin.sybil')}
                </Text>
                <Flex flexDirection='row'>
                  <Button onClick={() => onChange(20)} variant='transparent'>
                    {t('gitcoin.effective')}
                  </Button>
                  <Button onClick={() => onChange(25)} variant='transparent'>
                    {t('gitcoin.more_effective')}
                  </Button>
                  <Button onClick={() => onChange(30)} variant='transparent'>
                    {t('gitcoin.most_effective')}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        )}
      ></Controller>
      <Controller
        name={'gpsWeighted'}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Flex
            alignItems={{ base: 'start', md: 'center' }}
            gap={2}
            flexDirection={{ base: 'column', md: 'row' }}
            mb={8}
          >
            <Checkbox isChecked={value} onChange={(e) => onChange(e.target.checked as boolean)}>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' whiteSpace='nowrap' mr={4}>
                {t('form.process_create.census.weighted_voting_title')}
              </Text>
            </Checkbox>
            <Text fontSize='13.5px' lineHeight='20px'>
              {t('form.process_create.census.weighted_voting_description')}
            </Text>
          </Flex>
        )}
      ></Controller>
      <>
        <Flex justifyContent={'space-between'} gap={5} flexDirection={{ base: 'column', md: 'row' }}>
          <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_stamps')}</FormLabel>
          <StampsUnionType />
        </Flex>
        <Grid
          gap={5}
          templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' }}
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
