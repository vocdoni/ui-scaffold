import { Box, Flex } from '@chakra-ui/react'
import CookieBanner from './CookieBanner'

const Wrapper = ({ ...props }) => (
  <Box bg={'wrapper.bg_light'} _dark={{ bgColor: 'wrapper.bg_dark' }}>
    <Flex
      minH='100vh'
      position='relative'
      flexDirection='column'
      width='full'
      m='0 auto'
      px={{
        base: '10px',
        sm: '20px',
      }}
      {...props}
    ></Flex>
    <CookieBanner />
  </Box>
)

export default Wrapper
