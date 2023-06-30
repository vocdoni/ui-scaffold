import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <Flex direction='column' minH='100vh'>
    <Box as='header' position='relative' boxShadow='3px 3px 10px lightgray' zIndex={10}>
      <Navbar maxW={350} mx='auto' px={{ base: 4 }} />
    </Box>
    <Outlet />
    <Box as='footer' mt='auto'>
      <Footer mw={350} mx='auto' px={{ base: 4 }} />
    </Box>
  </Flex>
)

export default Layout
