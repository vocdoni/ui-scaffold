import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'
import { Link as ReactRouterLink, generatePath } from 'react-router-dom'

export const DashboardMenuItem = ({
  label,
  route,
  icon,
  isOpen = false,
  isActive = false,
  onToggle,
  hasChildren = false,
}: {
  label: string
  route?: string
  icon?: any
  isOpen?: boolean
  isActive?: boolean
  onToggle?: () => void
  hasChildren?: boolean
}) => (
  <Button
    as={route ? ReactRouterLink : undefined}
    to={route ? generatePath(route) : undefined}
    onClick={hasChildren ? onToggle : undefined}
    isActive={isActive} // Set active state
    justifyContent='start'
    variant='menu'
    w='full'
    leftIcon={icon ? <Icon as={icon} /> : undefined}
    rightIcon={hasChildren ? isOpen ? <ChevronUpIcon /> : <ChevronDownIcon /> : undefined}
  >
    {label}
  </Button>
)
