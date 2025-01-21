import { Box, Button, Flex, Card, CardBody, Img, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Routes } from '~src/router/routes'
import { Trans } from 'react-i18next'
import empty from '/assets/illustrations/9.png'

export const NoOrganizations = () => {
  return (
    <Card variant='no-elections' minH='100%' maxW='650' m='80px auto'>
      <CardBody>
        <Box align='center'>
          <Img src={empty} />
        </Box>
        <Box>
          <Text fontWeight='600' fontSize='lg' m='20px 0px'>
            <Trans i18nKey='organization.no_organization_title'>You don't belong to any organization yet!</Trans>
          </Text>
          <Text mb='20px'><Trans i18nKey='new_organization.description1' components={{ span: <Text as='span' fontWeight='600' color='#000' /> }}></Trans></Text>
          <Text mb='20px'><Trans i18nKey='create_org.already_profile'></Trans></Text>
        </Box>
        <Button mt='40px' w='100%' variant='primary' as={ReactRouterLink} to={Routes.dashboard.organizationCreate} colorScheme='gradient'>
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
