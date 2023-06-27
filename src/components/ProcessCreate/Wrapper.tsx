import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    py={{ base: 6, md: 9, lg: 14 }}
    px={{ base: 4, sm: 10, md: 12, lg: 24 }}
    minH={{ md: '70vh' }}
    bgColor='process_create.bg'
    borderRadius='lg'
    border='1px solid'
    borderColor='process_create.border'
    {...props}
  />
)

export default Wrapper
