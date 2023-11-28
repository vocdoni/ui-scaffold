import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import FooterOnVote from '~components/Footer/FooterOnVote'
import Navbar from '~components/Navbar/indexOnVote'

const Layout = () => {
  return (
    <Flex bgColor='#f2f2f2' position='relative' flexDirection='column' minH='100vh'>
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={10}>
        <Navbar />
      </HStack>
      <Box as='main' flexGrow={1}>
        <Outlet />
      </Box>
      <Box as='footer' mt='auto'>
        <FooterOnVote />
      </Box>
      <Text
        ml={2}
        top='calc(50vh - 90px)'
        position='fixed'
        sx={{
          '&': {
            'writing-mode': 'vertical-lr',
            'text-orientation': 'mixed',
            transform: 'rotate(180deg)',
          },
        }}
        color='white'
        mixBlendMode='difference'
        textTransform='uppercase'
        fontFamily='pixeloid'
        fontSize='16px'
        fontWeight='bold'
      >
        World wide voting
      </Text>
    </Flex>
  )
}

export default Layout
