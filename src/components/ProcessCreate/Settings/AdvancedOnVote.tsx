import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const anonymous = watch('electionType.anonymous')
  const voteOverwrite = watch('maxVoteOverwrites')

  const handleAnonymousChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setValue('electionType.anonymous', isChecked)

    if (isChecked) {
      setValue('maxVoteOverwrites', false)
    }
  }

  const handleVoteOverwriteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setValue('maxVoteOverwrites', isChecked)

    if (isChecked) {
      setValue('electionType.anonymous', false)
    }
  }

  return (
    <Box>
      <Box mb={4}>
        <Text fontWeight='bold' fontFamily='pixeloid' textTransform='uppercase' mb={1}>
          {t('form.process_create.behavior.title')}
        </Text>
      </Box>
      <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <Checkbox isChecked={anonymous} onChange={handleAnonymousChange} variant='radiobox' flex='0 0 30%'>
          <Box>
            <Icon as={FaUserSecret} />
            <Text fontFamily='pixeloid' textTransform='uppercase'>
              {t('form.process_create.behavior.anonymous.title')}
            </Text>
          </Box>
          <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
        </Checkbox>
        <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox' flex='0 0 30%'>
          <Box>
            <Icon as={HiKey} />
            <Text fontFamily='pixeloid' textTransform='uppercase'>
              {t('form.process_create.behavior.secret.title')}
            </Text>
          </Box>
          <Text>{t('form.process_create.behavior.secret.description')}</Text>
        </Checkbox>
        <Checkbox isChecked={voteOverwrite} onChange={handleVoteOverwriteChange} variant='radiobox' flex='0 0 30%'>
          <Box>
            <Icon as={BiCheckDouble} />
            <Text fontFamily='pixeloid' textTransform='uppercase'>
              {t('form.process_create.behavior.overwrite.title')}
            </Text>
          </Box>
          <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
        </Checkbox>
      </Flex>
    </Box>
  )
}

export default SettingsAdvanced
