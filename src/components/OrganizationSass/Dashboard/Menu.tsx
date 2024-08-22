import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
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

  const [subMenu, setSubMenu] = useState('')

  useEffect(() => {
    if (subMenu === '') {
      setSubMenu('all')
    }
  }, [subMenu])

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
        as={Link}
        to='/organization/votings'
        isActive={location.pathname === '/organization/votings'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiSquares2X2} />}
        rightIcon={
          location.pathname === '/organization/votings' ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />
        }
      >
        Voting Processes
      </Button>
      {location.pathname === '/organization/votings' && (
        <Box pl='25px'>
          <Button
            onClick={() => setSubMenu('all')}
            isActive={subMenu === 'all'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            All
          </Button>
          <Button
            onClick={() => setSubMenu('active')}
            isActive={subMenu === 'active'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Active
          </Button>
          <Button
            onClick={() => setSubMenu('finished')}
            isActive={subMenu === 'finished'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Finished
          </Button>
          <Button
            onClick={() => setSubMenu('draft')}
            isActive={subMenu === 'draft'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Draft
          </Button>
        </Box>
      )}
      <Button
        as={Link}
        to={'/census'}
        isActive={location.pathname === '/census'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={GiHamburgerMenu} />}
      >
        Census
      </Button>
      <Button
        as={Link}
        to={'/usermanagment'}
        isActive={location.pathname === '/usermanagment'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiMiniPencil} />}
      >
        User Managment
      </Button>
      <Button
        as={Link}
        to='/organization/edit'
        isActive={location.pathname === '/organization/edit'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={IoIosSettings} />}
        rightIcon={
          location.pathname === '/organization/edit' ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />
        }
      >
        Settings
      </Button>
      {location.pathname === '/organization/edit' && (
        <Box pl='25px'>
          <Button
            onClick={() => setSubMenu('organization')}
            isActive={subMenu === 'organization'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Organization
          </Button>
          <Button
            onClick={() => setSubMenu('team')}
            isActive={subMenu === 'team'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Team
          </Button>
          <Button
            onClick={() => setSubMenu('billing')}
            isActive={subMenu === 'billing'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Billing
          </Button>
          <Button
            onClick={() => setSubMenu('subscription')}
            isActive={subMenu === 'subscription'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Subscription
          </Button>
          <Button
            onClick={() => setSubMenu('profile')}
            isActive={subMenu === 'profile'}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            Profile
          </Button>
        </Box>
      )}
      <Button
        as={Link}
        to={'/help'}
        isActive={location.pathname === '/help'}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={FaPhoneAlt} />}
      >
        Help and Support
      </Button>
    </Box>
  )
}

export default OrganizationDashboardMenu
