import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LuBuilding, LuChevronLeft, LuChevronRight, LuChevronsUpDown, LuLogOut, LuUserPen } from 'react-icons/lu'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { LanguageListDashboard } from '~components/Navbar/LanguagesList'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { useProfile } from '~src/queries/account'
import { OrganizationSwitcher } from './OrganizationSwitcher'

const UserProfile = () => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const { data: profile } = useProfile()
  const { reduced } = useContext(DashboardLayoutContext)
  const variant = useBreakpointValue({
    base: false,
    md: true,
  })
  const [switchOrg, setSwitchOrg] = useState(false)

  const placement = variant ? 'right-end' : 'auto'

  if (!profile) return

  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Button
          leftIcon={
            <Avatar
              name={`${profile.firstName} ${profile.lastName}`}
              src={profile.organizations[0]?.organization.logo || ''}
              size='sm'
              borderRadius={'8px'}
            />
          }
          rightIcon={!reduced && <Icon as={LuChevronsUpDown} color='dashboard.chevron' />}
          aria-label='User menu'
          size='xl'
          display={'flex'}
          alignItems={'center'}
          gap={2}
          w='full'
          justifyContent='start'
          variant='unstyled'
          mt={2}
          p={reduced ? 0 : 2}
          minW={0}
          sx={{ '& span:nth-of-type(2)': { marginLeft: 'auto' } }}
        >
          {!reduced && (
            <Flex flexDirection={'column'} justifyContent={'start'} gap={0.5} ml={0}>
              <Text fontWeight='light' size='sm' lineHeight={'14px'} textAlign={'start'} maxW={'165px'} isTruncated>
                {profile.firstName}
              </Text>
              <Text
                fontWeight='light'
                size='xs'
                lineHeight={'14px'}
                color='dashboard.profile.email'
                maxW={'165px'}
                isTruncated
              >
                {profile.email}
              </Text>
            </Flex>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW='250px'>
        <PopoverHeader>
          <Box display={'flex'} gap={2} alignItems={'center'} justifyContent={'start'} px={1} py={1.5} mb={1}>
            <Avatar
              name={`${profile.firstName} ${profile.lastName}`}
              src={profile.organizations[0]?.organization.logo || ''}
              size='sm'
              borderRadius={'md'}
            />
            <Flex flexDirection={'column'} justifyContent={'start'} gap={0.5}>
              <Text size='sm' lineHeight={'14px'} textAlign={'start'} fontWeight={500} maxW={'170px'} isTruncated>
                {profile.firstName}
              </Text>
              {switchOrg ? (
                <Button
                  onClick={() => setSwitchOrg(false)}
                  leftIcon={<Icon as={LuChevronLeft} />}
                  variant={'link'}
                  display={'flex'}
                  alignItems={'center'}
                  fontSize={'xs'}
                  h={'unset'}
                  lineHeight={'14px'}
                  color='dashboard.back'
                >
                  {t('back')}
                </Button>
              ) : (
                <Text
                  fontWeight='light'
                  size='xs'
                  lineHeight={'14px'}
                  color='dashboard.profile.email'
                  maxW={'165px'}
                  isTruncated
                >
                  {profile.email}
                </Text>
              )}
            </Flex>
          </Box>
        </PopoverHeader>
        {switchOrg ? (
          <OrganizationSwitcher />
        ) : (
          <>
            <PopoverBody>
              <Box borderBottom='1px solid rgba(244, 244, 245, 0.8)' py={1}>
                <Button
                  onClick={() => setSwitchOrg(true)}
                  variant={'transparent'}
                  colorScheme='gray'
                  leftIcon={<LuBuilding />}
                  rightIcon={<LuChevronRight />}
                  w='full'
                  px={2}
                  py={1.5}
                  h={'unset'}
                  borderRadius={'xs'}
                  sx={{ '& span:nth-of-type(2)': { marginLeft: 'auto' } }}
                >
                  <Trans i18nKey={'switch_organization'} />
                </Button>
                <Button
                  as={ReactRouterLink}
                  to={Routes.dashboard.profile}
                  variant={'transparent'}
                  colorScheme='gray'
                  justifyContent={'start'}
                  leftIcon={<LuUserPen />}
                  w='full'
                  px={2}
                  py={1.5}
                  h={'unset'}
                  borderRadius={'xs'}
                >
                  <Trans i18nKey={'user_settings'} />
                </Button>
              </Box>
              <Box py={1}>
                <Text fontWeight={600} size={'sm'} px={2} py={1.5}>
                  {t('preferences', { defaultValue: 'Preferences' })}
                </Text>

                <LanguageListDashboard px={2} py={1.5} />
              </Box>
            </PopoverBody>
            <PopoverFooter pt={1}>
              <Button
                onClick={logout}
                variant={'transparent'}
                colorScheme='gray'
                justifyContent={'start'}
                leftIcon={<LuLogOut />}
                w='full'
                px={2}
                py={1.5}
                h={'unset'}
                borderRadius={'xs'}
              >
                <Trans i18nKey={'logout'} />
              </Button>
            </PopoverFooter>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default UserProfile
