import { AlertIconProps, chakra, useAlertContext, useAlertStyles } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RiErrorWarningLine } from 'react-icons/ri'

const icons = {
  info: <RiErrorWarningLine />,
  warning: <RiErrorWarningLine />,
  success: <RiErrorWarningLine />,
  error: <FaRegCheckCircle />,
}

export const AlertIcon = (props: AlertIconProps) => {
  const styles = useAlertStyles()
  const { status } = useAlertContext()
  const css = status === 'loading' ? styles.spinner : styles.icon

  const icon = icons[status] || <RiErrorWarningLine />

  return (
    <chakra.span
      display='inherit'
      data-status={status}
      {...props}
      className={cx('chakra-alert__icon', props.className)}
      __css={css}
      {...props}
    >
      {icon}
    </chakra.span>
  )
}
