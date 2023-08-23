import { Box, HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => (
  <>
    <Box bgColor='main_bg' maxW={360} mx='auto'>
      <Box minH='100vh'>
        <HStack
          as='header'
          position='sticky'
          top={0}
          zIndex={20}
          h={18}
          boxShadow='var(--box-shadow-navbar)'
          bgColor='main_bg'
        >
          <Navbar w='full' px={{ base: 2, sm: 4 }} />
        </HStack>
        <Box as='main' pt={8} pb={40}>
          <Box px={{ base: 2, sm: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Box as='footer' mt='auto'>
        <Footer px={{ base: 2, sm: 4 }} />
      </Box>
    </Box>
  </>
)

export default Layout
