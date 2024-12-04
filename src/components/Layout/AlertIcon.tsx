import { AlertIconProps, chakra, useAlertContext, useAlertStyles } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RiErrorWarningLine } from 'react-icons/ri'

interface AlertIconCustomProps extends AlertIconProps {
  status: string
}

const icons = {
  info: <RiErrorWarningLine />,
  warning: <RiErrorWarningLine />,
  success: <RiErrorWarningLine />,
  error: <FaRegCheckCircle />,
}

export const AlertIcon = ({ ...props }: AlertIconCustomProps) => {
  const styles = useAlertStyles()
  const { status } = useAlertContext()
  const css = status === 'loading' ? styles.spinner : styles.icon

  const IconComponent = icons[status] || <RiErrorWarningLine />

  return (
    <chakra.span
      display='inherit'
      data-status={status}
      {...props}
      className={cx('chakra-alert__icon', props.className)}
      __css={css}
      {...props}
    >
      {IconComponent}
    </chakra.span>
  )
}
