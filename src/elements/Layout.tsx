import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from '~components/Navbar'
import Footer from '~theme/components/Footer'

const Layout = () => {
  return (
    <Flex position='relative' flexDirection='column' minH='100vh' maxW='site-width'>
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={20}>
        <Navbar />
      </HStack>
      <Box as='main' flexGrow={1}>
        <Outlet />
      </Box>
      <Box as='footer' mt='auto'>
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
          display={{ base: 'none', sm: 'block' }}
        >
          World wide voting
        </Text>
      )}
    </Flex>
  )
}

export default Layout
