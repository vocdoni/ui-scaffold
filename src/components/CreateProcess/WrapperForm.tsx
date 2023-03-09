import { Flex } from '@chakra-ui/layout'

interface Props {
  children: JSX.Element
  onSubmit: () => void
}

const WrapperForm = ({ children, onSubmit, ...props }: Props) => (
  <Flex
    as='form'
    direction='column'
    gap={4}
    m='16px auto'
    p={{ base: 0, sm: 4 }}
    borderRadius={12}
    width={{ base: '98%', md: '650px' }}
    border={{ sm: '2px solid' }}
    borderColor={{ sm: 'gray.100' }}
    _dark={{ borderColor: 'black.c90' }}
    onSubmit={onSubmit}
    {...props}
  >
    {children}
  </Flex>
)

export default WrapperForm
