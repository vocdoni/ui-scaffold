import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    display='flex'
    justifyContent='start'
    gap={6}
    fontFamily='"Archivo", sans-serif'
    mx='auto'
    flexGrow={1}
    {...props}
  />
)

export default Wrapper
