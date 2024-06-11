import { Button, Flex, Heading } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { EditProfile } from '~components/Account/EditProfile'
import { ContentsBox } from '~components/Organization/Dashboard/Box'

const OrganizationEdit = () => {
  return (
    <>
      <EditHeader />
      <ContentsBox>
        <EditProfile />
      </ContentsBox>
    </>
  )
}

const EditHeader = () => {
  const { address } = useAccount()

  return (
    <ContentsBox>
      <Flex
        flexDirection={{ base: 'column', xl2: 'row' }}
        justifyContent='space-between'
        alignItems={{ base: 'start', xl2: 'center' }}
        gap={2}
      >
        <Heading fontSize='heading-sm'>
          <Trans i18nKey='organization.my_entity'>My entity</Trans>
        </Heading>
        <Button as={ReactRouterLink} to={`/organization/${address}`} variant='transparent' ml='auto'>
          View public profile
        </Button>
      </Flex>
    </ContentsBox>
  )
}

export default OrganizationEdit
