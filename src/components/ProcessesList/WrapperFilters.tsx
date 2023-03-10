import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

const WrapperFiltersList = ({
  children,
  ...props
}: {
  children: ReactNode
}) => (
  <Flex
    as='fieldset'
    direction={{ base: 'column', md: 'row' }}
    gap={4}
    m='16px auto'
    p={{ base: 1, sm: 2, md: 4 }}
    borderRadius={12}
    border='2px solid'
    borderColor='gray.100'
    _dark={{ borderColor: 'black.c90' }}
    {...props}
  >
    {children}
  </Flex>
)
export default WrapperFiltersList
