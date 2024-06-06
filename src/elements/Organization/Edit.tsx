import { Heading } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { EditProfile } from '~components/Account/EditProfile'
import { ContentsBox } from '~components/Organization/Dashboard/Box'

const OrganizationEdit = () => {
  const { account } = useClient()

  return (
    <>
      <ContentsBox>
        <Heading>
          <Trans>My entity</Trans>
        </Heading>
      </ContentsBox>
      <ContentsBox>
        <EditProfile />
      </ContentsBox>
    </>
  )
}

export default OrganizationEdit
