import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    px={{ base: 4, sm: 8, md: 10, lg: 16 }}
    pb={5}
    display='flex'
    justifyContent='start'
    gap={5}
    {...props}
  />
)

export default Wrapper
