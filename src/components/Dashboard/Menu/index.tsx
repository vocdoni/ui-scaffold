import { Box, Button, CloseButton, Drawer, DrawerContent, DrawerOverlay, Text } from '@chakra-ui/react'
import { Calendar, Plus } from '@untitled-ui/icons-react'
import { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink, Link as RouterLink } from 'react-router-dom'
import { DashboardBox } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'
import { DashboardMenuOptions } from './Options'
import { OrganizationSwitcher } from './OrganizationSwitcher'
import UserProfile from './UserProfile'

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { reduced } = useContext(DashboardLayoutContext)

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        display={{ base: 'none', md: 'flex' }}
        flexDirection={'column'}
        position={'sticky'}
        top={0}
        minW={reduced ? '48px' : '255px'}
        maxW={reduced ? '48px' : '255px'}
        w={reduced ? '48px' : '255px'}
        h='100vh'
        borderRight='var(--border)'
        p={2}
        zIndex={100}
        transition='width .3s ease, min-width .3s ease, max-width .3s ease'
      >
        <DashboardMenuContent />
      </Box>

      {/* Sidebar for small screens */}
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box p={4} display='flex' flexDirection='column' gap={4}>
            <DashboardMenuContent />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  )
}

// Common menu contents
const DashboardMenuContent = () => {
  const { t } = useTranslation()
  const { reduced } = useContext(DashboardLayoutContext)
  const [closeScheudleACall, setCloseScheudleACall] = useState(false)

  return (
    <>
      <OrganizationSwitcher h={'47px'} p={2} mb={2} />
      <Button
        as={RouterLink}
        to={generatePath(Routes.processes.create)}
        w='full'
        minW={0}
        leftIcon={<Plus width={'16px'} />}
        variant='primary'
        colorScheme='black'
        mt={'8px'}
        mb={'32px'}
        size={'xs'}
      >
        {!reduced && <Trans i18nKey='new_voting'>New vote</Trans>}
      </Button>

      <DashboardMenuOptions />

      {!closeScheudleACall && (
        <DashboardBox
          position={'relative'}
          flexDirection={'column'}
          display={reduced ? 'none' : 'flex'}
          mt='auto'
          gap={2}
          p={4}
          borderRadius='lg'
        >
          <CloseButton
            onClick={() => setCloseScheudleACall(true)}
            position={'absolute'}
            top={1}
            right={1}
            color='gray'
          />
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {t('need_help.title', { defaultValue: 'First steps' })}
          </Text>
          <Text fontSize={'xs'} lineHeight={'16px'} color='dashboard.schedule_call_description'>
            {t('need_help.description', {
              defaultValue:
                'Do you need some help with your first voting process? Watch this tutorial or schedule a call.',
            })}
          </Text>
          <Button
            as={ReactRouterLink}
            to={generatePath(Routes.processes.create)}
            leftIcon={<Calendar />}
            colorScheme='gray'
            w='full'
            size={'sm'}
            fontSize={'12px'}
          >
            {t('schedule_a_call', { defaultValue: ' Schedule a call' })}
          </Button>
        </DashboardBox>
      )}
      <UserProfile />
    </>
  )
}

export default DashboardMenu
