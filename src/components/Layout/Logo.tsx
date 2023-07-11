import { Flex, Img, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
      <Img src={`${process.env.PUBLIC_URL}/assets/vocdoni_icon.png`} alt='vocdoni icon' maxWidth={12} />
      <Text
        display={{ base: 'none', lg: 'flex' }}
        flexDirection='row'
        gap={1}
        fontSize='sm'
        fontWeight='bold'
        lineHeight={1.1}
        {...props}
      >
        Public voting protocol
      </Text>
    </Flex>
  </NavLink>
)

export default Logo
