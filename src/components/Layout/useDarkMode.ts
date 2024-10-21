import { useColorModeValue } from '@chakra-ui/react'
import { colorsBase } from '~theme/colors'

const useDarkMode = () => {
  const bg = useColorModeValue(colorsBase.white.dark, colorsBase.blue.dark)
  const bgSecondary = useColorModeValue(colorsBase.white.pure, colorsBase.blue.grayish)
  const textColor = useColorModeValue('black', 'white')
  const textColorSecondary = 'text.secondary'
  const textColorBrand = colorsBase.primary
  const googleBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const googleHover = useColorModeValue({ bg: 'gray.300' }, { bg: 'whiteAlpha.300' })
  const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' })
  const homeTextSecondary = useColorModeValue(colorsBase.gray.dark, colorsBase.white.pure)

  return {
    bg,
    bgSecondary,
    textColor,
    textColorSecondary,
    textColorBrand,
    googleBg,
    googleHover,
    googleActive,
    homeTextSecondary,
  }
}

export default useDarkMode
