import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Flex
      paddingX={4}
      flexDirection='column'
      minHeight='100vh'
      maxWidth='1250px'
      margin='0 auto'
    >
      <Navbar />
      <Box mb={8}>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default Layout
