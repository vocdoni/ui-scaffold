import { Flex, Img } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import icon from '/assets/onvote-icon.svg'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={2}>
      <Img src={icon} alt='vocdoni icon' maxWidth={12} />
    </Flex>
  </NavLink>
)

export default Logo
