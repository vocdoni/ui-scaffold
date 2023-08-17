import { Box, HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <>
    <Box minH='100vh'>
      <HStack
        as='header'
        position='sticky'
        top={0}
        zIndex={20}
        h={18}
        bgColor='navbar.bg'
        boxShadow='var(--box-shadow-navbar)'
      >
        <Navbar w='full' maxW={480} mx='auto' px={{ base: 2, sm: 4 }} />
      </HStack>
      <Box as='main' pt={8} pb={40}>
        <Box maxWidth={440} m='0 auto' px={{ base: 2, sm: 4, lg: 10, xl5: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    <Box as='footer' mt='auto'>
      <Footer maxWidth={480} mx='auto' px={{ base: 2, sm: 4 }} />
    </Box>
  </>
)

export default Layout
