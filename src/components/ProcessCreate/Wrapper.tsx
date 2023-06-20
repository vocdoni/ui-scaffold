import { Flex } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Flex
    flexDirection='column'
    w='full'
    py={14}
    px={24}
    minH='70vh'
    bgColor='process_create.bg'
    borderRadius='lg'
    border='1px solid'
    borderColor='process_create.border'
    {...props}
  />
)

export default Wrapper
