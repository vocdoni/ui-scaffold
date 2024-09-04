import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Select, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiMiniPencil, HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const OrganizationDashboardMenu = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { organization } = useOrganization()
  const { textColorSecondary } = useDarkMode()
  console.log(organization?.account.name)

  const [menuVotings, setMenuVotings] = useState(false)
  const [menuSettings, setMenuSettings] = useState(false)

  return (
    <Box>
      <Text color={textColorSecondary} mb='10px'>
        {organization?.account.name.default}
      </Text>
      <Select placeholder='Select option' borderRadius='full' mb='20px'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <Button
        as={Link}
        to='/organization'
        isActive={location.pathname === '/organization'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={FaHouse} />}
      >
        {t('organization.dashboard')}
      </Button>
      <Button
        onClick={() => setMenuVotings((prev) => !prev)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiSquares2X2} />}
        rightIcon={menuVotings ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />}
      >
        {t('voting_processes')}
      </Button>
      {menuVotings && (
        <Box pl='25px'>
          <Button
            as={Link}
            to={'/organization/votings'}
            isActive={location.pathname.includes('/organization/votings')}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            {t('all')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('active')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('finished')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('draft')}
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={GiHamburgerMenu} />}>
        {t('organization.census')}
      </Button>
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={HiMiniPencil} />}>
        {t('user_managment')}
      </Button>
      <Button
        onClick={() => setMenuSettings((prev) => !prev)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={IoIosSettings} />}
        rightIcon={menuSettings ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />}
      >
        {t('settings')}
      </Button>
      {menuSettings && (
        <Box pl='25px'>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('organization.organization')}
          </Button>
          <Button
            as={Link}
            to={'/organization/team'}
            isActive={location.pathname.includes('/organizaton/team')}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            {t('team')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('billing')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('subscription')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('profile')}
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={FaPhoneAlt} />}>
        {t('help_and_support')}
      </Button>
    </Box>
  )
}

export default OrganizationDashboardMenu
