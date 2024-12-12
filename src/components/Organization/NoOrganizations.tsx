import { Box, Button, Flex } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Routes } from '~src/router/routes'

export const NoOrganizations = () => {
  return (
    <Flex direction={'column'}>
      <Box>You don't belong to any organization yet!</Box>
      <Button as={ReactRouterLink} to={Routes.dashboard.organizationCreate} mt={4}>
        Create organization
      </Button>
    </Flex>
  )
}

export const NoOrganizationsPage = () => (
  <DashboardContents>
    <NoOrganizations />
  </DashboardContents>
)
