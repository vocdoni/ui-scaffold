import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Navbar from '~components/Navbar'
import Footer from '~theme/components/Footer'
import SaasNavbar from '~components/Navbar/SaasNavbar'

const Layout = () => {
  const location = useLocation()

  return (
    <Flex position='relative' flexDirection='column' minH='100vh' mx='auto' bgColor='bg'>
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={30}>
        {import.meta.env.SAAS_URL ? <SaasNavbar /> : <Navbar />}
      </HStack>
      <ScrollRestoration />
      <Flex flexDirection='column' as='main' flexGrow={1}>
        <Outlet />
      </Flex>
      <Box
        as='footer'
        mt='auto'
        bgColor={`${location.pathname.startsWith('/organization') ? 'footer.gray' : 'footer.white'}`}
      >
        <Footer />
      </Box>
      {import.meta.env.theme === 'onvote' && (
        <Text
          ml={2}
          top='calc(50vh - 90px)'
          position='fixed'
          sx={{
            '&': {
              writingMode: 'vertical-lr',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            },
          }}
          color='white'
          mixBlendMode='difference'
          textTransform='uppercase'
          fontFamily='pixeloidsans'
          fontSize='16px'
          display={{ base: 'none', md: 'block' }}
        >
          World wide voting
        </Text>
      )}
    </Flex>
  )
}

export default Layout
