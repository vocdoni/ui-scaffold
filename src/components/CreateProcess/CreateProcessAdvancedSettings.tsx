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
} from '@chakra-ui/react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import AdvancedSettingCheckbox from './AdvancedSettingCheckbox';
import AdvancesSettignsAutostart from './AdvancedSettingsAutostart';

interface Props {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const CreateProcessAdvancedSettings = ({ register, getValues }: Props) => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          Advanced settings
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <AdvancesSettignsAutostart register={register} getValues={getValues} />
        <Flex
          gap={{ base: 6, sm: 3 }}
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'end' }}
          mb={3}
        >
          <AdvancedSettingCheckbox
            register={register}
            label="Weighted vote"
            field="weightedVote"
          />
          <AdvancedSettingCheckbox
            register={register}
            label="Interruptible"
            field="electionType.interruptible"
          />
          <AdvancedSettingCheckbox
            register={register}
            label="Secret until the end"
            field="electionType.secretUntilTheEnd"
          />
        </Flex>
        <FormControl
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
        >
          <FormLabel pt={2} whiteSpace="nowrap">
            Max Vote Overwrites
          </FormLabel>
          <Input type="number" {...register(`maxVoteOverwrites`)} width={20} />
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default CreateProcessAdvancedSettings;
