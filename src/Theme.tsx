import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { RainbowKitChain } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext'
import { PropsWithChildren } from 'react'
import Fonts from '~shared/Layout/Fonts'
// Note these imports are dynamic aliases. Check vite.config.ts for more details
import { rainbowStyles, theme } from '~theme'

export const Theme = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Fonts />
      {children}
    </ChakraProvider>
  )
}

export const RainbowKitTheme = ({ chains, children }: PropsWithChildren<{ chains: RainbowKitChain[] }>) => {
  const { colorMode } = useColorMode()
  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles(colorMode)}>
      {children}
    </RainbowKitProvider>
  )
}
