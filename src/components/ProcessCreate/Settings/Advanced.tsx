import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

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
              <Text fontFamily='pixeloidsans' textTransform='uppercase'>
                {t('form.process_create.behavior.anonymous.title')}
              </Text>
            </Box>
            <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
          </Checkbox>
        )}
        {import.meta.env.features.vote.secret && (
          <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={HiKey} />
              <Text fontFamily='pixeloidsans' textTransform='uppercase'>
                {t('form.process_create.behavior.secret.title')}
              </Text>
            </Box>
            <Text>{t('form.process_create.behavior.secret.description')}</Text>
          </Checkbox>
        )}
        {import.meta.env.features.vote.overwrite && (
          <Checkbox {...register('maxVoteOverwrites')} variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
              <Text fontFamily='pixeloidsans' textTransform='uppercase'>
                {t('form.process_create.behavior.overwrite.title')}
              </Text>
            </Box>
            <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
          </Checkbox>
        )}
      </Flex>
    </Box>
  )
}
export default SettingsAdvanced
