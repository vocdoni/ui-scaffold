import { AlertIconProps, Box, chakra, useAlertContext, useAlertStyles } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { cloneElement } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RiErrorWarningLine } from 'react-icons/ri'

const icons = {
  info: <FaRegCheckCircle />,
  warning: <RiErrorWarningLine />,
  success: <RiErrorWarningLine />,
  error: <RiErrorWarningLine />,
}

export const AlertIcon = (props: AlertIconProps) => {
  const styles = useAlertStyles()
  const { status } = useAlertContext()
  const css = status === 'loading' ? styles.spinner : styles.icon

  const icon = icons[status] || <RiErrorWarningLine />

  return (
    <Box gridRowStart={1} gridRowEnd={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <chakra.span
        display='inherit'
        data-status={status}
        {...props}
        className={cx('chakra-alert__icon', props.className)}
        __css={css}
        {...props}
      >
        {cloneElement(icon, {
          color: css.color,
        })}
      </chakra.span>
    </Box>
  )
}
