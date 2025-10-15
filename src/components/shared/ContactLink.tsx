import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'

export type ContactLinkProps = {
  children: ReactNode
  leftIcon?: ReactNode
} & Omit<ButtonProps, 'onClick' | 'as'>

const ContactButton = ({ children, leftIcon, ...buttonProps }: ContactLinkProps) => (
  <Button leftIcon={leftIcon} {...buttonProps} as={RouterLink} to={Routes.dashboard.settings.support}>
    {children}
  </Button>
)

export default ContactButton
