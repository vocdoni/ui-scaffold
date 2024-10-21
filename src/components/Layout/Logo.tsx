import { Flex, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Logo as LogoImage, LogoMbl } from '~theme/icons'

const Logo = ({ ...props }) => {
  const invert = useColorModeValue('invert(0%)', 'invert(100%)')

  return (
    <NavLink to='/'>
      <Flex alignItems='center' gap={2} display={{ base: 'none', lg: 'flex' }} filter={invert}>
        <LogoImage />
      </Flex>
      <Flex alignItems='center' gap={2} display={{ base: 'flex', lg: 'none' }} filter={invert}>
        <LogoMbl />
      </Flex>
    </NavLink>
  )
}

export default Logo
