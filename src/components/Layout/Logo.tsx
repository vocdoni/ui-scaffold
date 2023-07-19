import { Flex, Img, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import icon from '/assets/vocdoni_icon.png'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
      <Img src={icon} alt='vocdoni icon' maxWidth={12} />
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
