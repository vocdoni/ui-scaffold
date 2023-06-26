import { PhoneIcon } from '@chakra-ui/icons'
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 10 }}>
      <Box flexBasis='30%'>
        <Text fontWeight='bold' mb={1}>
          {t('form.process_create.behaivor.title')}
        </Text>
        <Text color='process_create.meta_description' fontSize='sm' mb={3}>
          {t('form.process_create.behaivor.description_secret')}
        </Text>
        <Text color='process_create.meta_description' fontSize='sm'>
          {t('form.process_create.behaivor.description_overwrite')}
        </Text>
      </Box>
      <Flex flexGrow={1} justifyContent={{ base: 'center', sm: 'start' }} gap={10}>
        <Checkbox
          {...register('electionType.secretUntilTheEnd')}
          display='flex'
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          sx={{ 'span:nth-of-type(1)': { borderRadius: '50%', ml: 'auto' } }}
          width={32}
          height={24}
          p={2}
          boxShadow='2px 4px 8px gray'
          borderRadius='md'
        >
          <Flex flexDirection='column' alignItems='center' gap={3} mt={1}>
            <PhoneIcon />
            <Text fontSize='sm'>Secret</Text>
          </Flex>
        </Checkbox>
        <Checkbox
          {...register('maxVoteOverwrites')}
          display='flex'
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          sx={{ 'span:nth-of-type(1)': { borderRadius: '50%', ml: 'auto' } }}
          width={32}
          height={24}
          p={2}
          boxShadow='2px 4px 8px gray'
          borderRadius='md'
        >
          <Flex flexDirection='column' alignItems='center' gap={3} mt={1}>
            <PhoneIcon />
            <Text fontSize='sm'>Vote overwrite</Text>
          </Flex>
        </Checkbox>
      </Flex>
      {/* <RadioGroup mb={3} {...useBooleanRadioRegister('electionType.secretUntilTheEnd')}>
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
      </FormControl> */}
    </Flex>
  )
}
export default SettingsAdvanced
