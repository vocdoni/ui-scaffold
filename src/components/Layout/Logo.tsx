import { Flex } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Logo as LogoImage, LogoMbl } from '~theme/icons'

const Logo = ({ ...props }) => (
  <NavLink to='/'>
    <Flex alignItems='center' gap={2} display={{ base: 'none', lg: 'flex' }}>
      <LogoImage />
    </Flex>
    <Flex alignItems='center' gap={2} display={{ base: 'flex', lg: 'none' }}>
      <LogoMbl />
    </Flex>
  </NavLink>
)

export default Logo
