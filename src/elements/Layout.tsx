import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '~components/Footer'
import Navbar from '~components/Navbar'

const Layout = () => {
  return (
    <Flex position='relative' flexDirection='column' minH='100vh'>
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={10}>
        <Navbar />
      </HStack>
      <Box as='main' flexGrow={1}>
        <Outlet />
      </Box>
      <Box as='footer' mt='auto'>
        <Footer />
      </Box>
    </Flex>
  )
}

export default Layout
