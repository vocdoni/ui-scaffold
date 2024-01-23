import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    pb={5}
    display='flex'
    justifyContent='start'
    gap={5}
    fontFamily='"Archivo", sans-serif'
    {...props}
  />
)

export default Wrapper
