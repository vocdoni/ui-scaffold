import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import FooterOnVote from '~components/Footer/FooterOnVote'
import Navbar from '~components/Navbar'

const Layout = () => {
  const location = useLocation()

  return (
    <Flex flexDirection='column' minH='100vh'>
      <Box
        bgImage={
          !location.pathname.includes('processes') && !location.pathname.includes('organization')
            ? '/public/assets/home-bg.jpg'
            : ''
        }
        bgSize='cover'
        bgPosition='center'
        bgColor='#f2f2f2'
      >
        <Box bgColor='rgba(255,255,255, 0.4)'>
          <Flex flexDirection='column' position='relative' maxW={360} mx='auto'>
            <HStack
              w='100%'
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
              sx={{
                '& p': {
                  'writing-mode': 'vertical-rl',
                  'text-orientation': 'upright',
                },
              }}
              position='absolute'
              top='calc(50vh - 148px)'
              left={0}
            >
              <Text fontFamily='pixeloid' textTransform='uppercase'>
                World wide voting
              </Text>
            </Box>
            <Box
              flexGrow={1}
              w='100%'
              as='main'
              pt={6}
              m='0 auto'
              px={{
                base: !location.pathname.includes('processes') ? 10 : 2,
                sm: !location.pathname.includes('processes') ? 16 : 3,
              }}
            >
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box bgImage={'/public/assets/footer-bg.jpg'} bgSize='cover' bgPosition='center'>
        <Box as='footer' w='100%' maxW={360} mx='auto' mt='auto' px={{ base: 2, sm: 4 }}>
          <FooterOnVote />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
