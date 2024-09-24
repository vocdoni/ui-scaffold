import { Box, Flex } from '@chakra-ui/react'
import useDarkMode from '../../hooks/useDarkMode'

const Wrapper = ({ ...props }) => {
  const { bg } = useDarkMode()

  return (
    <Box bg={bg}>
      <Flex
        minH='100vh'
        position='relative'
        flexDirection='column'
        width='full'
        m='0 auto'
        maxW={1800}
        px={{
          base: 2.5,
          sm: 5,
        }}
        {...props}
      ></Flex>
    </Box>
  )
}

export default Wrapper
