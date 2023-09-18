import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    px={{ base: 4, sm: 10, md: 12, lg: 24 }}
    display='flex'
    justifyContent='start'
    minH={{ md: '85vh' }}
    {...props}
  />
)

export default Wrapper
