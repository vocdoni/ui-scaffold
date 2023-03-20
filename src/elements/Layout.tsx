import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Flex flexDirection='column' minHeight='100vh'>
      <Box as='header'>
        <Navbar
          maxWidth='1400px'
          margin='0 auto'
          paddingX={{ base: 0, sm: 4 }}
        />
      </Box>
      <Outlet />
      <Box as='footer' mt='auto'>
        <Footer
          maxWidth='1400px'
          marginX='auto'
          paddingX={{ base: 0, sm: 4 }}
        />
      </Box>
    </Flex>
  )
}

export default Layout
