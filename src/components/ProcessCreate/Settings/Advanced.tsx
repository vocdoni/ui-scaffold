import { Checkbox, Flex, FormControl, FormLabel, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const [valueRadio, setValueRadio] = useState('1')

  console.log(watch())

  useEffect(() => {
    if (valueRadio === '1') setValue('electionType.secretUntilTheEnd', false)
    else setValue('electionType.secretUntilTheEnd', true)
  }, [valueRadio, setValue])

  return (
    <Flex flexDirection='column' gap={2}>
      <Flex alignItems='center' gap={1}>
        <Text as='span' fontWeight={700} fontSize='xl'>
          {t('form.process_create.settings.settings')}
        </Text>
        <Text as='span' color='process_create.description' fontSize='xs'>
          ({t('form.process_create.settings.settings_description')})
        </Text>
      </Flex>
      <RadioGroup onChange={setValueRadio} value={valueRadio} mb={3}>
        <Stack direction='column'>
          <Flex flexDirection='column'>
            <Radio value='1'>
              <Text as='span' ml={1} fontSize='sm' fontWeight={700}>
                {t('form.process_create.settings.real_time')}:
              </Text>{' '}
              <Text as='span' ml={1} fontSize='xs' color='process_create.description'>
                {t('form.process_create.settings.real_time_description')}
              </Text>
            </Radio>
          </Flex>
          <Flex flexDirection='column'>
            <Radio value='2'>
              <Text as='span' ml={1} fontSize='sm' fontWeight={700}>
                {t('form.process_create.settings.secret')}
              </Text>{' '}
              <Text as='span' ml={1} fontSize='xs' color='process_create.description'>
                {t('form.process_create.settings.secret_description')}
              </Text>
            </Radio>
          </Flex>
        </Stack>
      </RadioGroup>
      <FormControl display='flex' alignItems='center'>
        <Checkbox {...register('voteOverwrites')} />
        <FormLabel whiteSpace='nowrap' mb='0' ml={3}>
          <Text as='span' fontSize='xs' fontWeight={700}>
            {t('form.process_create.settings.vote_overwrites')}:{' '}
            <Text as='span' fontSize='xs' fontWeight={400} color='process_create.description'>
              {t('form.process_create.settings.vote_overwrites_descripton')}
            </Text>
          </Text>
        </FormLabel>
      </FormControl>
      <FormControl display='flex' alignItems='center'>
        <Checkbox {...register('electionType.interruptible')} />
        <FormLabel whiteSpace='nowrap' mb='0' ml={3}>
          <Text as='span' fontSize='xs' fontWeight={700}>
            {t('form.process_create.settings.interruptible')}:{' '}
            <Text as='span' fontSize='xs' fontWeight={400} color='process_create.description'>
              {t('form.process_create.settings.interruptible_description')}
            </Text>
          </Text>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}
export default SettingsAdvanced
