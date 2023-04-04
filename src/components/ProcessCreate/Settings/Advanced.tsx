import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SettingCheckbox from './Checkbox'

const SettingsAdvanced = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box as='span' flex='1' textAlign='left'>
            Advanced settings
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <Flex
            gap={{ base: 6, sm: 3 }}
            justifyContent='space-between'
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'start', md: 'end' }}
            mb={3}
          >
            <SettingCheckbox label={t('form.process_create.weighted_vote')} field='weightedVote' />
            <SettingCheckbox label={t('form.process_create.interruptible')} field='electionType.interruptible' />
            <SettingCheckbox
              label={t('form.process_create.secret_until_the_end')}
              field='electionType.secretUntilTheEnd'
            />
          </Flex>
          <FormControl>
            <FormLabel pt={2} whiteSpace='nowrap'>
              Max Vote Overwrites
            </FormLabel>
            <Input w='full' type='number' {...register(`maxVoteOverwrites`)} />
          </FormControl>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
export default SettingsAdvanced
