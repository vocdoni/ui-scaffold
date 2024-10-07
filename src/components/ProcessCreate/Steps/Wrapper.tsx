import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    pb={5}
    display='flex'
    justifyContent='start'
    gap={6}
    fontFamily='"Archivo", sans-serif'
    maxW={980}
    mx='auto'
    flexGrow={1}
    {...props}
  />
)

export default Wrapper
