import { Box, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
      setIsScrolled(false)
    } else {
      setIsScrolled(true)
    }
  })

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
            bgColor='main_bg'
            boxShadow={`${isScrolled ? '0px 0px 8px -3px gray' : 'none'}`}
          >
            <Navbar />
          </HStack>
          <Box as='main' pt={8} pb={40} m='0 auto' px={{ base: 2, sm: 4 }}>
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
