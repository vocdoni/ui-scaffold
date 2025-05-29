import { Box, Button, CloseButton, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, Text } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus } from 'react-icons/lu'
import { generatePath, Link as ReactRouterLink, Link as RouterLink } from 'react-router-dom'
import { DashboardBox } from '~components/Layout/Dashboard'
import { VocdoniLogo } from '~components/Layout/Logo'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'
import { BookerModalButton } from '../Booker'
import { DashboardMenuOptions } from './Options'
import UserProfile from './UserProfile'

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { reduced } = useContext(DashboardLayoutContext)

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        borderRight='1px solid'
        _light={{ bgColor: 'dashboard.menu.light', borderRightColor: 'gray.200' }}
        _dark={{ bgColor: 'dashboard.menu.dark', borderRightColor: 'black.700' }}
        display={{ base: 'none', md: 'flex' }}
        flexDirection={'column'}
        position={'sticky'}
        top={0}
        minW={reduced ? '48px' : '255px'}
        maxW={reduced ? '48px' : '255px'}
        w={reduced ? '48px' : '255px'}
        h='100vh'
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
        <VocdoniLogo width={reduced ? '32px' : '148px'} minimal={reduced} />
      </Flex>
      <Button
        as={RouterLink}
        to={generatePath(Routes.processes.create)}
        w='full'
        minW={0}
        colorScheme='black'
        mt={'8px'}
        mb={'32px'}
        size={'xs'}
      >
        <Icon as={LuPlus} boxSize={4} />
        {!reduced && (
          <Text as='span' ml={2}>
            <Trans i18nKey='new_vote'>New vote</Trans>
          </Text>
        )}
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
            _dark={{ borderColor: 'black.600', bgColor: 'black.650' }}
            _light={{ borderColor: 'gray.200', bgColor: 'white' }}
          >
            <CloseButton
              onClick={() => setCloseScheduleACall(true)}
              position={'absolute'}
              top={1}
              right={1}
              colorScheme='gray'
              size='sm'
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
            <BookerModalButton variant='solid' colorScheme='gray' w='full' size={'sm'} fontSize={'12px'} />
          </DashboardBox>
        )}
        <UserProfile />
      </Box>
    </>
  )
}

export default DashboardMenu
