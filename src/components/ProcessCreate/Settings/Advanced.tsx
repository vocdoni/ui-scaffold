import { Box, Checkbox, Grid, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'
import CustomizationModal from '~components/ProcessCreate/Settings/CustomizationModal'
import { useProcessCreationSteps } from '~components/ProcessCreate/Steps/use-steps'
import { InfoValues } from '~components/ProcessCreate/StepForm/Info'

const SettingsAdvanced = () => {
  const { form } = useProcessCreationSteps()
  const { t } = useTranslation()
  const { register, watch } = useFormContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Pass election info to customization modal for the preview
  const electionInfo = watch() as InfoValues

  const features =
    import.meta.env.features.vote.anonymous ||
    import.meta.env.features.vote.overwrite ||
    import.meta.env.features.vote.secret ||
    import.meta.env.features.vote.customization

  if (!features) return null

  return (
    <>
      <CustomizationModal isOpen={isOpen} onClose={onClose} electionInfo={electionInfo} />
      <Box>
        <Box mb={4}>
          <Text className='process-create-title'>{t('form.process_create.behavior.title')}</Text>
        </Box>

        <Grid gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))' gap={5}>
          {import.meta.env.features.vote.anonymous && (
            <Checkbox {...register('electionType.anonymous')} variant='radiobox'>
              <Box>
                <Icon as={FaUserSecret} />
                <Text>{t('form.process_create.behavior.anonymous.title')}</Text>
              </Box>
              <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
            </Checkbox>
          )}
          {import.meta.env.features.vote.secret && (
            <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox'>
              <Box>
                <Icon as={HiKey} />
                <Text>{t('form.process_create.behavior.secret.title')}</Text>
              </Box>
              <Text>{t('form.process_create.behavior.secret.description')}</Text>
            </Checkbox>
          )}
          {import.meta.env.features.vote.overwrite && (
            <Checkbox {...register('maxVoteOverwrites')} variant='radiobox'>
              <Box>
                <Icon as={BiCheckDouble} />
                <Text>{t('form.process_create.behavior.overwrite.title')}</Text>
              </Box>
              <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
            </Checkbox>
          )}
          {import.meta.env.features.vote.customization && (
            <Checkbox variant='radiobox' isChecked={form.isCustomizationSet} onChange={() => {}}>
              <Box>
                <Icon as={BiCheckDouble} />
                <Text>{t('form.process_create.behavior.customization.title')}</Text>
              </Box>
              <Text>{t('form.process_create.behavior.customization.description')}</Text>
              <Box onClick={onOpen} />
            </Checkbox>
          )}
        </Grid>
      </Box>
    </>
  )
}
export default SettingsAdvanced
