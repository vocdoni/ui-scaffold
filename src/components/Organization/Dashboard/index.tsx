import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { ArrowUpRight, Calendar, Mail04, Plus, Users01 } from '@untitled-ui/icons-react'
import { useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { Trans } from 'react-i18next'
import { generatePath, Link as ReactRouterLink, useLoaderData, useOutletContext } from 'react-router-dom'
import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { useProfile } from '~src/queries/account'
import ProcessesList from './ProcessesList'

const OrganizationDashboard = () => {
  const { organization } = useOrganization()
  const { data: profile } = useProfile()
  const { elections } = useLoaderData() as ElectionListWithPagination
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  if (!organization) return null

  useEffect(() => {
    setBreadcrumb([])
  }, [setBreadcrumb])

  return (
    <DashboardContents>
      <Heading size={'xs'} fontWeight={'extrabold'} mb={1}>
        Welcome to Vocdoni Coop
      </Heading>
      <Text mb={6}>Here's an overview of your organization's voting activities</Text>
      <DashboardBox p={6} mb={8} display={'flex'} gap={10}>
        <Box flex='1 1 60%'>
          <Text fontWeight={'extrabold'} mb={2} size='2xl'>
            <Text as={'span'} fontSize={'24px'}>
              👋
            </Text>{' '}
            Hello{' '}
            <Text as={'span'} size='2xl'>
              {profile.firstName}
            </Text>
            !
          </Text>
          <Text color='rgb(115, 115, 115)' mb={4}>
            You're currently on the Free plan, which gives you access to almost everything for up to 50 members.
          </Text>
          <Text color='rgb(115, 115, 115)' mb={4}>
            So go ahead, explore the platform, create your first vote, and see just how easy secure digital governance
            can be! But if you need help, just schedule a call with our experts!
          </Text>
          <Flex gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
            <Button
              as={ReactRouterLink}
              to={generatePath(Routes.processes.create)}
              leftIcon={<Plus />}
              colorScheme='black'
              size={'md'}
            >
              <Trans i18nKey='new_voting'>New vote</Trans>
            </Button>
            <Button
              as={ReactRouterLink}
              to={generatePath(Routes.processes.create)}
              leftIcon={<Calendar />}
              colorScheme='gray'
              variant={'outline'}
              size={'md'}
            >
              <Trans i18nKey='home.support.btn_watch'></Trans>
            </Button>
          </Flex>
        </Box>
        <Flex display={{ base: 'none', lg: 'flex' }} flex={'1 1 33%'} flexDirection={'column'}>
          <Text size={'lg'} fontWeight={'bold'} textAlign={'center'} mb={2}>
            How to create your first vote
          </Text>
          <Box
            flexGrow={1}
            as='iframe'
            width='full'
            src='https://www.youtube.com/embed/arZZw8NyPq8'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            border='0'
            borderRadius={'md'}
          />
        </Flex>
      </DashboardBox>
      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
        <DashboardBox p={6} minH={'324px'} flex='1 1 66%' display={'flex'} flexDirection={'column'}>
          <Box>
            <Text fontWeight={'extrabold'} mb={1.5} size='2xl'>
              Recent Voting Processes
            </Text>
            <Text color='rgb(115, 115, 115)' mb={4} size={'sm'}>
              Your organization's latest voting activities
            </Text>
          </Box>
          <Flex
            flexGrow={1}
            flexDirection={'column'}
            justifyContent={!elections ? 'center' : 'start'}
            alignItems={'center'}
            gap={4}
          >
            {!elections ? (
              <>
                <Text color='rgb(115, 115, 115)'>No voting processes found</Text>
                <Button
                  as={ReactRouterLink}
                  to={generatePath(Routes.processes.create)}
                  colorScheme='gray'
                  variant={'outline'}
                >
                  Create your first vote
                </Button>
              </>
            ) : (
              <ProcessesList processes={elections} />
            )}
          </Flex>
          <Button
            as={ReactRouterLink}
            to={generatePath(Routes.dashboard.processes)}
            rightIcon={<ArrowUpRight />}
            variant={'transparent'}
            alignSelf={'end'}
          >
            View all processes
          </Button>
        </DashboardBox>
        <DashboardBox p={6} flex='1 1 33%'>
          <Text fontWeight={'extrabold'} mb={1.5} size='2xl'>
            Quick Actions
          </Text>
          <Text color='rgb(115, 115, 115)' size={'sm'} mb={6}>
            Common tasks and actions{' '}
          </Text>
          <Flex flexDirection={'column'} gap={4}>
            <Button
              as={ReactRouterLink}
              to={generatePath(Routes.processes.create)}
              colorScheme='gray'
              variant={'outline'}
              justifyContent={'start'}
              leftIcon={<Plus />}
              size='lg'
              fontWeight={'bold'}
            >
              Create new vote
            </Button>
            <Button
              as={ReactRouterLink}
              to={generatePath(Routes.dashboard.processes)}
              colorScheme='gray'
              variant={'outline'}
              justifyContent={'start'}
              leftIcon={<Mail04 />}
              size='lg'
              fontWeight={'bold'}
            >
              View active votes
            </Button>
            <Button
              as={ReactRouterLink}
              to={generatePath(Routes.dashboard.settings)}
              colorScheme='gray'
              variant={'outline'}
              justifyContent={'start'}
              leftIcon={<Users01 />}
              size='lg'
              fontWeight={'bold'}
            >
              Manage team
            </Button>
          </Flex>
        </DashboardBox>
      </Flex>
    </DashboardContents>
  )
}

export default OrganizationDashboard
