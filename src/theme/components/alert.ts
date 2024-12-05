import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = (props: any) => {
  const { status } = props

  let iconBorderRadius = 'lg'
  let iconColor = '#718096'
  let iconBoxShadow = '0 0 0px 1px white, 0 0 0px 3px #9EABB9, 0 0 0 4px white, 0 0 1px 5px #9EABB9'
  let iconBoxShadowDark = '0 0 0px 1px #1A202C, 0 0 0px 3px #9EABB9, 0 0 0 4px #1A202C, 0 0 1px 5px #9EABB9'

  if (status === 'success') {
    iconBorderRadius = 'full'
    iconColor = '#00FF00'
    iconBoxShadow = '0 0 0px 1px white, 0 0 0px 3px #32F032, 0 0 0 4px white, 0 0 2px 5px #32F032'
    iconBoxShadowDark = '0 0 0px 1px #1A202C, 0 0 0px 3px #32F032, 0 0 0 4px #1A202C, 0 0 0px 5px #32F032'
  } else if (status === 'error') {
    iconBorderRadius = 'full'
    iconColor = '#FF0000'
    iconBoxShadow = '0 0 0px 1px white, 0 0 0px 3px #F03232, 0 0 0 4px white, 0 0 2px 5px #F03232'
    iconBoxShadowDark = '0 0 0px 1px #1A202C, 0 0 0px 3px #F03232, 0 0 0 5px #1A202C, 0 0 0px 5px #F03232'
  } else if (status === 'warning') {
    iconBorderRadius = 'full'
    iconColor = '#FFA500'
    iconBoxShadow = '0 0 0px 1px white, 0 0 0px 3px #F0B432, 0 0 0 4px white, 0 0 2px 5px #F0B432'
    iconBoxShadow = '0 0 0px 1px #1A202C, 0 0 0px 3px #F0B432, 0 0 0 4px #1A202C, 0 0 0px 5px #F0B432'
  }

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
      color: iconColor,
      boxShadow: iconBoxShadow,
      borderRadius: iconBorderRadius,
      _dark: {
        boxShadow: iconBoxShadowDark,
      },
      w: 4,
      h: 4,
    },
  }
}

export const Alert = defineMultiStyleConfig({ baseStyle })
