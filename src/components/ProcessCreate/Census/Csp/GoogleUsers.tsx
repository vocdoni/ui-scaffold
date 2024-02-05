import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AddressManager } from '~components/ProcessCreate/AddressManager'

type GoogleObject = {
  address: string
}

const isGoogleObject = (obj: any): obj is GoogleObject => {
  return typeof obj.address === 'string'
}

export const GoogleUsers = ({ ...props }) => {
  const { t } = useTranslation()

  let iUsers = props.initialUsers || []
  for (let obj of iUsers) {
    if (!isGoogleObject(obj)) {
      iUsers = []
    }
  }

  return (
    <>
      <Text mb={3} className='brand-theme' textTransform='uppercase' color='process_create.census.title'>
        {t('census.google_address_title')}
      </Text>

      <AddressManager
        formField={props.formField}
        onUpdateSelection={props.onUpdateSelection}
        type='email'
        initialUsers={iUsers}
      />
    </>
  )
}
