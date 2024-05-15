import { Button } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type NavbarLink = {
  name: ReactNode
  to: string
  icon: ReactElement
  private?: boolean
}

const NavbarLink = ({ name, to, icon }: NavbarLink) => {
  const location = useLocation()
  const isActive = to === location.pathname

  return (
    <Button
      as={Link}
      to={to}
      isActive={isActive}
      justifyContent='start'
      variant='ghost'
      colorScheme='teal'
      w='full'
      leftIcon={icon}
    >
      {name}
    </Button>
  )
}

export default NavbarLink
