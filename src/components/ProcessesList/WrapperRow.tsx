import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

const WrapperListRow = ({ children, ...props }: { children: ReactNode }) => (
  <Flex
    mx='auto'
    py={3}
    px={5}
    alignItems='center'
    width='100%'
    borderRadius={12}
    border='2px solid'
    borderColor='gray.100'
    _dark={{ borderColor: 'black.c90' }}
    {...props}
  >
    {children}
  </Flex>
)

export default WrapperListRow
