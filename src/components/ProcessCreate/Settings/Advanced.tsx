import { Checkbox, Flex, FormControl, FormLabel, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBooleanRadioRegister } from '../../../constants'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Flex flexDirection='column' gap={2}>
      <Flex alignItems='center' gap={1}>
        <Text as='span' fontWeight='bold' fontSize='xl'>
          {t('form.process_create.settings.settings')}
        </Text>
        <Text as='span' color='process_create.description' fontSize='xs'>
          ({t('form.process_create.settings.settings_description')})
        </Text>
      </Flex>
      <RadioGroup mb={3} {...useBooleanRadioRegister('electionType.secretUntilTheEnd')}>
        <Stack direction='column'>
          <Flex flexDirection='column'>
            <Radio value='0'>
              <Text as='span' ml={1} fontWeight='bold' fontSize='sm'>
                {t('form.process_create.settings.real_time')}
              </Text>
              <Text as='span' ml={1} fontSize='xs' color='process_create.description'>
                {t('form.process_create.settings.real_time_description')}
              </Text>
            </Radio>
          </Flex>
          <Flex flexDirection='column'>
            <Radio value='1'>
              <Text as='span' ml={1} fontWeight='bold' fontSize='sm'>
                {t('form.process_create.settings.secret')}
              </Text>
              <Text as='span' ml={1} fontSize='xs' color='process_create.description'>
                {t('form.process_create.settings.secret_description')}
              </Text>
            </Radio>
          </Flex>
        </Stack>
      </RadioGroup>
      <FormControl display='flex' alignItems='center'>
        <Checkbox {...register('maxVoteOverwrites')} />
        <FormLabel whiteSpace='nowrap' mb='0' ml={3}>
          <Text as='span' fontSize='xs' fontWeight='bold'>
            {t('form.process_create.settings.vote_overwrites')}
            <Text as='span' ml={1} fontSize='xs' fontWeight='normal' color='process_create.description'>
              {t('form.process_create.settings.vote_overwrites_descripton')}
            </Text>
          </Text>
        </FormLabel>
      </FormControl>
      <FormControl display='flex' alignItems='center'>
        <Checkbox {...register('electionType.interruptible')} />
        <FormLabel whiteSpace='nowrap' mb='0' ml={3}>
          <Text as='span' fontSize='xs' fontWeight='bold'>
            {t('form.process_create.settings.interruptible')}
            <Text as='span' ml={1} fontSize='xs' fontWeight='normal' color='process_create.description'>
              {t('form.process_create.settings.interruptible_description')}
            </Text>
          </Text>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}
export default SettingsAdvanced
