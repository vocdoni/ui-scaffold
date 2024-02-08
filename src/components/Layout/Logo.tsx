import { Flex } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Logo as LogoImage } from '~theme/icons'

const Logo = ({ logo: Logo, ...props }: { logo?: any }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={2}>
      <LogoImage />
    </Flex>
  </NavLink>
)

export default Logo
