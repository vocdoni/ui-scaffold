import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext()

  const anonymous = watch('electionType.anonymous')

  const features =
    import.meta.env.features.vote.anonymous ||
    import.meta.env.features.vote.overwrite ||
    import.meta.env.features.vote.secret

  if (!features) return null

  return (
    <Box>
      <Box mb={4}>
        <Text className='process-create-title'>{t('form.process_create.behavior.title')}</Text>
      </Box>
      <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        {import.meta.env.features.vote.anonymous && (
          <Checkbox {...register('electionType.anonymous')} variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={FaUserSecret} />
              <Text>{t('form.process_create.behavior.anonymous.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
            {anonymous && (
              <Box>
                <Text as='span' fontWeight='bold'>
                  {t('process_create.anonymous.legal_note')}
                </Text>
                <Text as='span'>{t('process_create.anonymous.legal_disclaimer')}</Text>
              </Box>
            )}
          </Checkbox>
        )}
        {import.meta.env.features.vote.secret && (
          <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={HiKey} />
              <Text>{t('form.process_create.behavior.secret.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.secret.description')}</Text>
          </Checkbox>
        )}
        {import.meta.env.features.vote.overwrite && (
          <Checkbox {...register('maxVoteOverwrites')} variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
              <Text>{t('form.process_create.behavior.overwrite.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
          </Checkbox>
        )}
      </Flex>
    </Box>
  )
}
export default SettingsAdvanced
