import { Box } from '@chakra-ui/react'
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
      <Box>
        <Button form='process-create-form' type='submit' isLoading={create}>
          Create org
        </Button>
      </Box>
    </ContentsBox>
  )
}

export default CreateOrganization
