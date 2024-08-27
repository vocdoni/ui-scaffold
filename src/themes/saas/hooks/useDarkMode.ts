import { useColorModeValue } from '@chakra-ui/react'

const useDarkMode = () => {
  const bg = useColorModeValue('bg.light', 'bg.dark')
  const bgSecondary = useColorModeValue('bg.secondary.light', 'bg.secondary.dark')
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const textColorBrand = 'brand.500'
  const googleBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const googleHover = useColorModeValue({ bg: 'gray.300' }, { bg: 'whiteAlpha.300' })
  const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' })

  return {
    bg,
    bgSecondary,
    textColor,
    textColorSecondary,
    textColorBrand,
    googleBg,
    googleHover,
    googleActive,
  }
}

export default useDarkMode
