import { Box, Checkbox, Flex, Icon, Text, Tooltip } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Box>
      <Box mb={4}>
        <Text fontWeight='bold' mb={1}>
          {t('form.process_create.behavior.title')}
        </Text>
      </Box>
      <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <Tooltip label='We are upgrading the anonymous voting protocol, it remains temporary disabled.'>
          <Checkbox {...register('electionType.anonymous')} variant='radiobox' flex='0 0 30%' isDisabled>
            <Box>
              <Icon as={FaUserSecret} />
              <Text>{t('form.process_create.behavior.anonymous.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
          </Checkbox>
        </Tooltip>
        <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox' flex='0 0 30%'>
          <Box>
            <Icon as={HiKey} />
            <Text>{t('form.process_create.behavior.secret.title')}</Text>
          </Box>
          <Text>{t('form.process_create.behavior.secret.description')}</Text>
        </Checkbox>
        <Checkbox {...register('maxVoteOverwrites')} variant='radiobox' flex='0 0 30%'>
          <Box>
            <Icon as={BiCheckDouble} />
            <Text>{t('form.process_create.behavior.overwrite.title')}</Text>
          </Box>
          <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
        </Checkbox>
      </Flex>
    </Box>
  )
}
export default SettingsAdvanced
