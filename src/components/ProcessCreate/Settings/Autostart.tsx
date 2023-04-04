import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Autostart = () => {
  const { t } = useTranslation()
  const { register, unregister, getValues } = useFormContext()

  useEffect(() => {
    if (getValues().electionType.autoStart) {
      unregister('startDate')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues().electionType.autoStart, unregister])

  return (
    <FormControl display='flex' alignItems='center'>
      <FormLabel htmlFor='autostart' mb='0'>
        {t('form.process_create.autostart')}
      </FormLabel>
      <Switch {...register('electionType.autoStart')} id='autostart' />
    </FormControl>
  )
}

export default Autostart
