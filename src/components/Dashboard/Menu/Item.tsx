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
  variant,
  ...props
}: {
  label: string
  route?: string
  icon?: any
  isOpen?: boolean
  isActive?: boolean
  onToggle?: () => void
  hasChildren?: boolean
  variant?: string
  [key: string]: any
}) => (
  <Button
    as={route ? ReactRouterLink : undefined}
    to={route ? generatePath(route) : undefined}
    onClick={hasChildren ? onToggle : undefined}
    isActive={hasChildren ? (isOpen ? true : false) : false} // Set active state
    justifyContent='start'
    variant={variant ? variant : isActive && !hasChildren ? 'underline' : 'transparent'}
    w='full'
    colorScheme='gray'
    leftIcon={icon ? <Icon as={icon} mt='0px' /> : undefined}
    rightIcon={hasChildren ? isOpen ? <ChevronUpIcon /> : <ChevronDownIcon /> : undefined}
    mb={hasChildren && 1}
    fontWeight={isActive ? '600' : '100'}
    fontSize='md'
    fontFamily='basier'
    {...props}
  >
    {label}
  </Button>
)
