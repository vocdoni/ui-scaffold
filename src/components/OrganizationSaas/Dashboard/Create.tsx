import { Button } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { AccountCreate } from '~components/Account/Create'
import { ContentsBox } from './Box'

const CreateOrganization = () => {
  const { t } = useTranslation()

  const {
    loading: { create },
  } = useClient()

  return (
    <ContentsBox>
      <AccountCreate />
      <Button form='process-create-form' type='submit' isLoading={create} mx='auto'>
        {t('organization.create_org')}
      </Button>
    </ContentsBox>
  )
}

export default CreateOrganization
