import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <Flex direction='column' minH='100vh'>
    <Box
      as='header'
      position='sticky'
      top={0}
      height={18}
      bgColor='navbar.bg'
      boxShadow='var(--box-shadow-navbar)'
      zIndex={10}
      py={4}
    >
      <Navbar maxW={480} mx='auto' px={{ base: 1, sm: 4 }} />
    </Box>
    <Box as='main' py={8}>
      <Box maxWidth={350} margin='0 auto' paddingX={{ base: 1, sm: 4 }}>
        <Outlet />
      </Box>
    </Box>
    <Box as='footer' mt='auto'>
      <Footer mw={480} mx='auto' px={{ base: 1, sm: 4 }} />
    </Box>
  </Flex>
)

export default Layout
