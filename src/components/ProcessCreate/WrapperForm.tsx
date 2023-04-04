import { Flex } from '@chakra-ui/layout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onSubmit: () => void
}

const WrapperForm = ({ children, onSubmit, ...props }: Props) => (
  <Flex
    as='form'
    direction='column'
    gap={4}
    mt={1}
    mx='auto'
    p={{ base: 0, sm: 4 }}
    borderRadius='md'
    width={{ base: '98%', md: 160 }}
    borderWidth={{ sm: 2 }}
    borderStyle={{ sm: 'solid' }}
    borderColor={{ sm: 'gray.100' }}
    _dark={{ borderColor: 'black.c90' }}
    onSubmit={onSubmit}
    {...props}
  >
    {children}
  </Flex>
)

export default WrapperForm
