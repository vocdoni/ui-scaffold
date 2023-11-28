import { Flex, Img } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import icon from '/assets/vocdoni_icon.png'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={2}>
      <Img src={icon} alt='vocdoni icon' maxWidth={10} />
    </Flex>
  </NavLink>
)

export default Logo
