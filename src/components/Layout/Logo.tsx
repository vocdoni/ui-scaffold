import { Flex, Img, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import icon from '/assets/vocdoni_icon.png'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={2}>
      <Img src={icon} alt='vocdoni icon' maxWidth={10} />
      <Text
        display={{ base: 'none', lg: 'flex' }}
        flexDirection='row'
        gap={1}
        fontSize='xs'
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
