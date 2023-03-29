import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
  register: UseFormRegister<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const SettignsAutostart = ({ register, getValues }: Props) => {
  const { t } = useTranslation()
  return (
    <FormControl display='flex' alignItems='center'>
      <FormLabel htmlFor='autostart' mb='0'>
        {t('form.process_create.autostart')}
      </FormLabel>
      <Switch {...register('electionType.autoStart')} id='autostart' />
    </FormControl>
  )
}

export default SettignsAutostart
