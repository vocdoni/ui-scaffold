import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import FooterOnVote from '~components/Footer/FooterOnVote'
import Navbar from '~components/Navbar'

const Layout = () => {
  const location = useLocation()

  return (
    <>
      <Box bgColor='#f2f2f2'>
        <Flex
          flexDirection='column'
          minH='100vh'
          bgImage={
            !location.pathname.includes('processes') && !location.pathname.includes('organization')
              ? '/public/assets/home-bg.jpg'
              : ''
          }
          bgSize='cover'
          bgPosition='center'
        >
          <HStack
            w='100%'
            as='header'
            position='sticky'
            top={0}
            justifyContent='space-between'
            gap={4}
            zIndex={20}
            maxW={360}
            mx='auto'
            h={18}
            px={{ base: 2, sm: 4 }}
            backdropFilter='blur(40px)'
          >
            <Navbar />
          </HStack>
          <Box
            flexGrow={1}
            maxW={360}
            mx='auto'
            w='100%'
            as='main'
            pt={6}
            m='0 auto'
            px={{
              base: !location.pathname.includes('processes') ? 2 : 0,
              sm: !location.pathname.includes('processes') ? 4 : 0,
            }}
          >
            <Outlet />
          </Box>

          <Box bgImage={'/public/assets/footer-bg.jpg'} bgSize='cover' bgPosition='center' mt={20}>
            <Box as='footer' w='100%' mt='auto' maxW={360} mx='auto' px={{ base: 2, sm: 4 }}>
              <FooterOnVote />
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Layout
