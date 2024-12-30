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
    isActive={hasChildren ? (isOpen ? true : false) : false} // Set active state
    justifyContent='start'
    variant='transparent'
    w='full'
    colorScheme='gray'
    leftIcon={icon ? <Icon as={icon} /> : undefined}
    rightIcon={hasChildren ? isOpen ? <ChevronUpIcon /> : <ChevronDownIcon /> : undefined}
    textDecoration={isActive && !hasChildren ? 'underline' : undefined}
    mb={hasChildren && 1}
  >
    {label}
  </Button>
)
