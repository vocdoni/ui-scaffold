import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <Flex direction='column' minH='100vh'>
    <Box as='header' position='relative' boxShadow='3px 3px 10px gray' zIndex={10}>
      <Navbar maxW={350} mx='auto' px={{ base: 0, sm: 4 }} />
    </Box>
    <Box as='main' py={8}>
      <Box maxWidth={350} margin='0 auto' paddingX={{ base: 1, sm: 4 }}>
        <Outlet />
      </Box>
    </Box>
    <Box as='footer' mt='auto'>
      <Footer maxW={350} mx='auto' px={{ base: 0, sm: 4 }} />
    </Box>
  </Flex>
)

export default Layout
