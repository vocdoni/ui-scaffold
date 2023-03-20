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
import { FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import SettignsAutostart from './Autostart'
import SettingCheckbox from './Checkbox'

interface Props {
  register: UseFormRegister<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const SettingsAdvanced = ({ register, getValues }: Props) => (
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
          <SettignsAutostart register={register} getValues={getValues} />
          <SettingCheckbox
            register={register}
            label='Weighted vote'
            field='weightedVote'
          />
          <SettingCheckbox
            register={register}
            label='Interruptible'
            field='electionType.interruptible'
          />
          <SettingCheckbox
            register={register}
            label='Secret until the end'
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

export default SettingsAdvanced
