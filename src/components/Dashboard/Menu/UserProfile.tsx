import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronSelectorVertical, LogOut01 } from '@untitled-ui/icons-react'
import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LanguageListDashboard } from '~components/Navbar/LanguagesList'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { useProfile } from '~src/queries/account'

const UserProfile = () => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  const { reduced } = useContext(DashboardLayoutContext)
  const variant = useBreakpointValue({
    base: false,
    md: true,
  })

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
          aria-label='User menu'
          size='xl'
          display={'flex'}
          alignItems={'center'}
          gap={2}
          rightIcon={
            !reduced && (
              <ChevronSelectorVertical width='16' height='16' color='(--chakra-colors-dashboard-profile-icon)' />
            )
          }
          justifyContent={'start'}
          variant={'unstyled'}
          colorScheme='white'
          mt={reduced ? 'auto' : 2}
          p={reduced ? 0 : 2}
          minW={0}
          sx={{ '& span:nth-of-type(2)': { marginLeft: 'auto' } }}
        >
          {!reduced && (
            <Flex flexDirection={'column'} justifyContent={'start'} gap={0.5} ml={0}>
              <Text fontWeight='light' size='md' lineHeight={'14px'} textAlign={'start'} maxW={'165px'} isTruncated>
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
      <PopoverContent zIndex={100} maxW='239px'>
        <PopoverHeader>
          <Box display={'flex'} gap={2} alignItems={'center'} justifyContent={'start'}>
            <Avatar
              name={`${profile.firstName} ${profile.lastName}`}
              src={profile.organizations[0]?.organization.logo || ''}
              size='sm'
              borderRadius={'8px'}
            />
            <Flex flexDirection={'column'} justifyContent={'start'} gap={0.5}>
              <Text size='md' lineHeight={'14px'} textAlign={'start'} fontWeight={500} maxW={'170px'} isTruncated>
                {profile.firstName}
              </Text>
              <Text
                fontWeight='light'
                size='xs'
                lineHeight={'14px'}
                color='dashboard.profile_email'
                maxW={'170px'}
                isTruncated
              >
                {profile.email}
              </Text>
            </Flex>
          </Box>
        </PopoverHeader>
        <PopoverBody>
          <Text fontWeight={600} size={'sm'} py={1.5}>
            {t('preferences', { defaultValue: 'Preferences' })}
          </Text>

          <LanguageListDashboard px={2} py={1.5} />
        </PopoverBody>
        <PopoverFooter>
          <Button
            variant={'unstyled'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'start'}
            gap={4}
            leftIcon={<LogOut01 width={'16px'} />}
            w='full'
          >
            <Trans i18nKey={'logout'} />
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfile
