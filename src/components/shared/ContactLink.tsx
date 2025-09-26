import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

export type ContactLinkProps = {
  children: ReactNode
  leftIcon?: ReactNode
} & Omit<ButtonProps, 'onClick' | 'as'>

const ContactLink = ({ children, leftIcon, ...buttonProps }: ContactLinkProps) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleContact = () => {
    if (isAuthenticated) {
      navigate(Routes.dashboard.settings.support)
    } else {
      window.location.href = `mailto:${import.meta.env.VOCDONI_CONTACT_EMAIL}`
    }
  }

  return (
    <Button onClick={handleContact} leftIcon={leftIcon} {...buttonProps}>
      {children}
    </Button>
  )
}

export default ContactLink
