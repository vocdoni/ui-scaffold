import { Flex, Img, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const Logo = () => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
      <Img src={`${process.env.PUBLIC_URL}/assets/vocdoni_icon.png`} maxWidth={12} alt='vocdoni icon' />
      <Text fontSize={12} whiteSpace='nowrap'>
        Public voting protocol
      </Text>
    </Flex>
  </NavLink>
)

export default Logo
