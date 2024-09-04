import { Box, Flex, Icon, Link, List, ListItem, Text } from '@chakra-ui/react'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import DarkModeToggle from '~src/themes/saas/components/Saas/DarkMode'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const LayoutAuth = () => {
  const { bg } = useDarkMode()

  return (
    <Flex bgColor={bg} minH='100vh' position='relative'>
      <Flex
        flex={{ base: '1 1 100%', lg: '0 0 50%' }}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        maxW='980px'
        mx='auto'
      >
        <Box minW={{ base: '90%', md: '420px' }} mt='40px' mb='20px'>
          <NavLink to='/'>
            <Flex align='center' ps={{ base: '25px', lg: '0px' }} pt={{ lg: '0px', xl: '0px' }} w='fit-content'>
              <Icon as={FaChevronLeft} me='12px' h='13px' w='8px' color='secondaryGray.600' />
              <Text ms='0px' fontSize='sm' color='secondaryGray.600'>
                Back
              </Text>
            </Flex>
          </NavLink>
        </Box>
        <Flex minW='100%' flexGrow={1} flexDirection='column' justifyContent='center' alignItems='center'>
          <Box maxW={{ base: '90%', md: '420px' }} minW={{ base: '90%', md: '420px' }} mx='auto'>
            <Outlet />
          </Box>
        </Flex>
        <Text minW='100%' maxW={{ base: '90%', md: '420px' }} mt='auto' py='20px' textAlign='center'>
          © 2024 Vocdoni Association. All Rights Reserved.
        </Text>
      </Flex>
      <Box
        position='relative'
        display={{ base: 'none', lg: 'block' }}
        flex='0 0 50%'
        background='linear-gradient(to bottom, #B5F492, #338B93)'
        borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
      >
        <DarkModeToggle position='absolute' ml='auto' top='10px' right='10px' />
        <Flex
          flexDirection='column'
          px={{
            base: '10px',
            sm: '20px',
          }}
          textAlign='center'
          h='100%'
          pb='20px'
        >
          <Flex flexGrow={1} alignItems='end' justifyContent='center'>
            <Box mb='100px'>
              <Text fontSize='50px' color='white'>
                The global voting platform
              </Text>
              <Text fontSize='19px' color='white'>
                Cut cost, Save Time: Secure, Private, and GDPR Compliant Voting
              </Text>
            </Box>
          </Flex>

          <Flex flexDirection='column' alignItems='center' justifyContent='center' color='white'>
            <List display='flex' gap='20px'>
              <ListItem>
                <Link fontWeight='500' href='mailto:hello@simmmple.com'>
                  Support
                </Link>
              </ListItem>
              <ListItem>
                <Link fontWeight='500' href='https://simmmple.com/terms-of-service'>
                  Terms of Use
                </Link>
              </ListItem>
              <ListItem>
                <Link fontWeight='500' href='https://www.blog.simmmple.com/'>
                  Blog
                </Link>
              </ListItem>
            </List>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default LayoutAuth
