import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AddressManager } from '~components/ProcessCreate/AddressManager'

export const GoogleUsers = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <>
      <Text mb={3} className='brand-theme' textTransform='uppercase' color='process_create.census.title'>
        {t('census.google_address_title')}
      </Text>

      <AddressManager type='email' initialUsers={props.initialUsers} onUpdateSelection={props.onUpdateSelection} />
    </>
  )
}
