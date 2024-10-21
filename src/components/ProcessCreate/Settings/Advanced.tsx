import { Box, Checkbox, Grid, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi2'
import ModalPro from '../ModalPro'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ModalPro isOpen={isOpen} onClose={onClose} reason='customization' />
      <Box>
        <Box mb={4}>
          <Text fontWeight='bold'>{t('form.process_create.behavior.title')}</Text>
        </Box>

        <Grid gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))' gap={5}>
          <Checkbox {...register('electionType.anonymous')} variant='radiobox'>
            <Box>
              <Icon as={FaUserSecret} />
              <Text>{t('form.process_create.behavior.anonymous.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.anonymous.description')}</Text>
          </Checkbox>
          <Checkbox {...register('electionType.secretUntilTheEnd')} variant='radiobox'>
            <Box>
              <Icon as={HiKey} />
              <Text>{t('form.process_create.behavior.secret.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.secret.description')}</Text>
          </Checkbox>
          <Checkbox {...register('maxVoteOverwrites')} variant='radiobox'>
            <Box>
              <Icon as={BiCheckDouble} />
              <Text>{t('form.process_create.behavior.overwrite.title')}</Text>
            </Box>
            <Text>{t('form.process_create.behavior.overwrite.description')}</Text>
          </Checkbox>
          <Checkbox variant='radiobox'>
            <Box>
              <Icon as={BiCheckDouble} />
              <Text>{t('form.process_create.behavior.customization.title')}</Text>
            </Box>
            <Text as='span'>Pro</Text>
            <Text>{t('form.process_create.behavior.customization.description')}</Text>
            <Box onClick={onOpen} />
          </Checkbox>
        </Grid>
      </Box>
    </>
  )
}
export default SettingsAdvanced
