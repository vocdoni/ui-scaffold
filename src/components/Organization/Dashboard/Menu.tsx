import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Select } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiMiniPencil, HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { generatePath, Link, useLocation } from 'react-router-dom'
import useDarkMode from '~components/Layout/useDarkMode'
import { Routes } from '~src/router/routes'

const OrganizationDashboardMenu = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { textColorSecondary } = useDarkMode()
  const [menuVotings, setMenuVotings] = useState(false)
  const [menuSettings, setMenuSettings] = useState(false)

  return (
    <Box>
      <OrganizationName color={textColorSecondary} mb={2.5} />
      <Select placeholder='Select option' borderRadius='full' mb={5}>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <Button
        as={Link}
        to={generatePath(Routes.dashboard.base)}
        isActive={location.pathname === Routes.dashboard.base}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={FaHouse} />}
      >
        {t('organization.dashboard')}
      </Button>
      <Button
        onClick={() => setMenuVotings((prev) => !prev)}
        isActive={location.pathname.includes(generatePath(Routes.dashboard.votings))}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiSquares2X2} />}
        rightIcon={menuVotings ? <ChevronUpIcon mt={1} /> : <ChevronDownIcon mt={1} />}
      >
        {t('voting_processes')}
      </Button>
      {menuVotings && (
        <Box pl={6}>
          <Button
            as={Link}
            to={generatePath(Routes.dashboard.votings)}
            isActive={location.pathname.includes(generatePath(Routes.dashboard.votings))}
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
        isActive={location.pathname.includes(Routes.dashboard.team)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={IoIosSettings} />}
        rightIcon={menuSettings ? <ChevronUpIcon mt={1} /> : <ChevronDownIcon mt={1} />}
      >
        {t('settings')}
      </Button>
      {menuSettings && (
        <Box pl={6}>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('organization.organization')}
          </Button>
          <Button
            as={Link}
            to={Routes.dashboard.team}
            isActive={location.pathname.includes(Routes.dashboard.team)}
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
          <Button
            as={Link}
            to={Routes.dashboard.profile}
            isActive={location.pathname.includes(Routes.dashboard.profile)}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
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
