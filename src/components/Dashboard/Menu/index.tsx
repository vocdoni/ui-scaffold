import { Box, Button, CloseButton, Drawer, DrawerContent, DrawerOverlay, Flex, Text } from '@chakra-ui/react'
import { Calendar, Plus } from '@untitled-ui/icons-react'
import { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink, Link as RouterLink } from 'react-router-dom'
import { DashboardBox } from '~components/Layout/Dashboard'
import { VocdoniLogo } from '~components/Layout/Logo'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'
import { LogoMbl } from '~theme/icons'
import { DashboardMenuOptions } from './Options'
import UserProfile from './UserProfile'

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { reduced } = useContext(DashboardLayoutContext)

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        bgColor='dashboard.aside_bg'
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
        <DrawerContent p={2}>
          <DashboardMenuContent />
        </DrawerContent>
      </Drawer>
    </>
  )
}

// Common menu contents
const DashboardMenuContent = () => {
  const { t } = useTranslation()
  const { reduced } = useContext(DashboardLayoutContext)
  const [closeScheduleACall, setCloseScheduleACall] = useState(false)

  return (
    <>
      <Flex
        as={ReactRouterLink}
        to={Routes.dashboard.base}
        justifyContent={'center'}
        alignItems={'center'}
        h='47px'
        mb={2}
      >
        {reduced ? <LogoMbl maxW='32px' /> : <VocdoniLogo width={'148px'} />}
      </Flex>
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

      <Box mt='auto'>
        {!closeScheduleACall && (
          <DashboardBox
            position={'relative'}
            flexDirection={'column'}
            display={reduced ? 'none' : 'flex'}
            gap={2}
            p={4}
            borderRadius='lg'
            bgColor={'dashboard.schedule_call.bg'}
          >
            <CloseButton
              onClick={() => setCloseScheduleACall(true)}
              position={'absolute'}
              top={1}
              right={1}
              color='gray'
            />
            <Text fontSize={'sm'} fontWeight={'bold'}>
              {t('need_help.title', { defaultValue: 'First steps' })}
            </Text>
            <Text fontSize={'xs'} lineHeight={'16px'} color='dashboard.schedule_call.description'>
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
      </Box>
    </>
  )
}

export default DashboardMenu
