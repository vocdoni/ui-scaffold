import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SettignsAutostart = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

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
