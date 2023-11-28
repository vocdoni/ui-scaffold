import { Box, HStack } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '~components/Footer'
import Navbar from '~components/Navbar/indexOnVote'

const Layout = () => {
  const location = useLocation()

  return (
    <>
      <Box bgColor='main_bg'>
        <Box minH='100vh' maxW={360} mx='auto'>
          <HStack
            as='header'
            position='sticky'
            top={0}
            justifyContent='space-between'
            gap={4}
            zIndex={20}
            h={18}
            px={{ base: 2, sm: 4 }}
            backdropFilter='blur(40px)'
          >
            <Navbar />
          </HStack>
          <Box
            as='main'
            pt={6}
            pb={40}
            m='0 auto'
            px={{
              base: !location.pathname.includes('processes') ? 2 : 0,
              sm: !location.pathname.includes('processes') ? 4 : 0,
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Box as='footer' mt='auto' maxW={360} mx='auto' px={{ base: 2, sm: 4 }}>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Layout
