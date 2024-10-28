import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => {
  const bg = useColorModeValue('wrapper.bg_light', 'wrapper.bg_dark')

  return (
    <Box bg={bg}>
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
}

export default Wrapper
