import { Box, Button, Card, CardBody, Flex, Img, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Routes } from '~src/router/routes'
import empty from '/assets/illustrations/9.png'

export const NoOrganizations = ({ ...props }) => {
  return (
    <Card variant='no-elections' minH='100%' maxW='650' m='80px auto' {...props}>
      <CardBody>
        <Flex justifyContent={'center'}>
          <Img src={empty} />
        </Flex>
        <Box>
          <Text fontWeight='600' fontSize='lg' m='20px 0px'>
            <Trans i18nKey='organization.no_organization_title'>You don't belong to any organization yet!</Trans>
          </Text>
          <Text mb='20px'>
            <Trans i18nKey='new_organization.description1' components={{ span: <Text as='span' fontWeight='600' /> }}>
              Set up your{' '}
              <Text as='span' fontWeight='bold'>
                organization for free
              </Text>{' '}
              and start creating voting processes to engage with your community.
            </Trans>
          </Text>
          <Text mb='20px'>
            <Trans i18nKey='create_org.already_profile'>
              If your organization already have a profile, ask the admin to invite you to your organization.
            </Trans>
          </Text>
        </Box>
        <Button
          mt='40px'
          w='100%'
          variant='primary'
          as={ReactRouterLink}
          to={Routes.dashboard.organizationCreate}
          colorScheme='gradient'
        >
          <Trans i18nKey='create_org.title'>Create your organization</Trans>
        </Button>
      </CardBody>
    </Card>
  )
}

export const NoOrganizationsPage = () => (
  <DashboardContents>
    <NoOrganizations />
  </DashboardContents>
)
