import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Select, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiMiniPencil, HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const OrganizationDashboardMenu = () => {
  const location = useLocation()
  const { textColorSecondary } = useDarkMode()

  const [menuVotings, setMenuVotings] = useState(false)
  const [menuSettings, setMenuSettings] = useState(false)

  return (
    <Box>
      <Text color={textColorSecondary} mb='10px'>
        Organization
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
        Dashboard
      </Button>
      <Button
        onClick={() => setMenuVotings((prev) => !prev)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiSquares2X2} />}
        rightIcon={menuVotings ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />}
      >
        Voting Processes
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
            All
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Active
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Finished
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Draft
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={GiHamburgerMenu} />}>
        Census
      </Button>
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={HiMiniPencil} />}>
        User Managment
      </Button>
      <Button
        onClick={() => setMenuSettings((prev) => !prev)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={IoIosSettings} />}
        rightIcon={menuSettings ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />}
      >
        Settings
      </Button>
      {menuSettings && (
        <Box pl='25px'>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Organization
          </Button>
          <Button
            as={Link}
            to={'/organization/team'}
            isActive={location.pathname.includes('/organizaton/team')}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Team
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Billing
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Subscription
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            Profile
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={FaPhoneAlt} />}>
        Help and Support
      </Button>
    </Box>
  )
}

export default OrganizationDashboardMenu
