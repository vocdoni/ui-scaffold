import { Box, Flex } from '@chakra-ui/react'

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
  </Box>
)

export default Wrapper
