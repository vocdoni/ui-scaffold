import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Flex flexDirection='column' minHeight='100vh'>
      <Box as='header' boxShadow='3px 3px 10px gray' position='relative' zIndex={10}>
        <Navbar maxWidth={350} marginY={0} marginX='auto' paddingX={{ base: 0, sm: 4 }} />
      </Box>
      <Outlet />
      <Box as='footer' mt='auto'>
        <Footer maxWidth={350} mx='auto' paddingX={{ base: 0, sm: 4 }} />
      </Box>
    </Flex>
  )
}

export default Layout
