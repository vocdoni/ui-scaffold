import { Button } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { AccountCreate } from '~components/Account/Create'
import { ContentsBox } from './Box'

const CreateOrganization = () => {
  const {
    loading: { create },
  } = useClient()

  return (
    <ContentsBox>
      <AccountCreate />
      <Button form='process-create-form' type='submit' isLoading={create} mx='auto'>
        Create org
      </Button>
    </ContentsBox>
  )
}

export default CreateOrganization
