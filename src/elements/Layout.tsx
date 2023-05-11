import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <Flex direction='column' minH='100vh'>
    <HStack
      as='header'
      position='sticky'
      top={0}
      zIndex={10}
      h={18}
      bgColor='navbar.bg'
      boxShadow='var(--box-shadow-navbar)'
    >
      <Navbar w='full' maxW={480} mx='auto' px={{ base: 2, sm: 4 }} />
    </HStack>
    <Box as='main' pt={8} pb={20}>
      <Box maxWidth={350} m='0 auto' px={{ base: 2, sm: 4 }}>
        <Outlet />
      </Box>
    </Box>
    <Box as='footer' mt='auto'>
      <Footer maxWidth={480} mx='auto' px={{ base: 2, sm: 4 }} />
    </Box>
  </Flex>
)

export default Layout
