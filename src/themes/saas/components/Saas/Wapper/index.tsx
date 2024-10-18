import { Box, Flex } from '@chakra-ui/react'
import useDarkMode from '../../../hooks/useDarkMode'

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
        maxW={444}
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
