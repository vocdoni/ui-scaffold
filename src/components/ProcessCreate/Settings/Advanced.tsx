import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { HiKey } from 'react-icons/hi2'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 10 }}>
      <Box flexBasis='30%' flexShrink={0}>
        <Text fontWeight='bold' mb={1}>
          {t('form.process_create.behavior.title')}
        </Text>
        <Text color='process_create.description' fontSize='sm' mb={3}>
          {t('form.process_create.behavior.secret.description')}
        </Text>
        <Text color='process_create.description' fontSize='sm'>
          {t('form.process_create.behavior.overwrite.description')}
        </Text>
      </Box>
      <Flex flexGrow={1} justifyContent={{ base: 'center', sm: 'start' }} gap={10}>
        <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox'>
          <Flex flexDirection='column' alignItems='center' gap={3} mt={1}>
            <Icon as={HiKey} />
            <Text fontSize='sm'>{t('form.process_create.behavior.secret.title')}</Text>
          </Flex>
        </Checkbox>
        <Checkbox {...register('maxVoteOverwrites')} variant='radiobox'>
          <Flex flexDirection='column' alignItems='center' gap={3} mt={1}>
            <Icon as={BiCheckDouble} />
            <Text fontSize='sm'>{t('form.process_create.behavior.overwrite.title')}</Text>
          </Flex>
        </Checkbox>
      </Flex>
    </Flex>
  )
}
export default SettingsAdvanced
