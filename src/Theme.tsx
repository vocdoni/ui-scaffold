import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { RainbowKitChain } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext'
import { lazy, PropsWithChildren } from 'react'
// Note these imports are dynamic aliases. Check vite.config.ts for more details
import { rainbowStyles, theme } from '~theme'

const Fonts = lazy(() => {
  const loc = import.meta.env.theme.length ? `${import.meta.env.theme}` : 'default'
  return import(`./themes/${loc}/Fonts.tsx`)
})

export const Theme = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      {/* not using suspense loader because we don't really care about the fonts loading status */}
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
