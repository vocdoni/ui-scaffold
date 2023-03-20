import { Flex } from '@chakra-ui/react'
import { FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import SettingCheckbox from './Checkbox'

interface Props {
  register: UseFormRegister<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const SettignsAutostart = ({ register, getValues }: Props) => (
  <Flex
    gap={{ base: 3, md: 8 }}
    justifyContent='start'
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'start', md: 'end' }}
  >
    <SettingCheckbox
      register={register}
      label='Autostart'
      field='electionType.autoStart'
      width='auto'
    />
  </Flex>
)

export default SettignsAutostart
