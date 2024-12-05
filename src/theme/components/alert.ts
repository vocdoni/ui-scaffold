// import { alertAnatomy } from '@chakra-ui/anatomy'
// import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

// const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

// const statusColor = {
//   info: 'account.info',
//   success: 'account.green',
//   error: 'account.error',
//   warning: 'account.warning',
// }

// const baseStyle = (props: any) => {
//   const { status } = props

//   return {
//     container: {
//       display: 'grid',
//       gridTemplateColumns: { base: '1fr', lg: 'fit-content(50px) 1fr' },
//       border: '1px solid',
//       borderColor: 'alert.border',
//       borderRadius: 'lg',
//       width: 'fit-content',
//       bgColor: 'alert.bg.light',

//       _dark: {
//         bgColor: 'alert.bg.dark',
//       },
//     },
//     title: {
//       gridColumn: { lg: 2 },
//     },
//     description: {
//       gridColumn: { lg: 2 },
//     },
//     icon: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gridColumn: 1,
//       color: statusColor[status],
//       boxShadow: `0 0 0px 1px white, 0 0 0px 3px ${statusColor[status]}, 0 0 0 4px white, 0 0 1px 5px ${statusColor[status]}`,
//       borderRadius: 'lg',
//       _dark: {
//         boxShadow: `0 0 0px 1px #1A202C, 0 0 0px 3px ${statusColor[status]}, 0 0 0 4px #1A202C, 0 0 1px 5px ${statusColor[status]}`,
//       },
//       w: 4,
//       h: 4,
//     },
//   }
// }

// export const Alert = defineMultiStyleConfig({ baseStyle })
import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, useToken } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = (props: any) => {
  const { status } = props

  const [infoColor, successColor, errorColor, warningColor] = useToken('colors', [
    'var(--chakra-colors-alert-info)',
    'var(--chakra-colors-alert-success)',
    'var(--chakra-colors-alert-error)',
    'var(--chakra-colors-alert-warning)',
  ])

  const statusColorMap = {
    info: infoColor,
    success: successColor,
    error: errorColor,
    warning: warningColor,
  }

  const color = statusColorMap[status]

  return {
    container: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', lg: 'fit-content(50px) 1fr' },
      border: '1px solid',
      borderColor: 'alert.border',
      borderRadius: 'lg',
      width: 'fit-content',
      bgColor: 'alert.bg.light',
      _dark: {
        bgColor: 'alert.bg.dark',
      },
    },
    title: {
      gridColumn: { lg: 2 },
    },
    description: {
      gridColumn: { lg: 2 },
    },
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gridColumn: 1,
      color,
      boxShadow: `0 0 0px 1px white, 0 0 0px 3px ${color}, 0 0 0 4px white, 0 0 1px 5px ${color}`,
      borderRadius: 'lg',
      _dark: {
        boxShadow: `0 0 0px 1px #1A202C, 0 0 0px 3px ${color}, 0 0 0 4px #1A202C, 0 0 1px 5px ${color}`,
      },
      w: 4,
      h: 4,
    },
  }
}

export const Alert = defineMultiStyleConfig({ baseStyle })
