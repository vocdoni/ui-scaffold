import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

export type ContactLinkProps = {
  children: ReactNode
  leftIcon?: ReactNode
} & Omit<ButtonProps, 'onClick' | 'as'>

const ContactButton = ({ children, leftIcon, ...buttonProps }: ContactLinkProps) => {
  const { isAuthenticated } = useAuth()

  return (
    <Button
      leftIcon={leftIcon}
      {...buttonProps}
      as={RouterLink}
      to={isAuthenticated ? Routes.dashboard.settings.support : 'https://vocdoni.io/contact'}
      target={isAuthenticated ? undefined : '_blank'}
    >
      {children}
    </Button>
  )
}

export default ContactButton
