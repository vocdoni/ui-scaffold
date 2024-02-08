declare module '~theme' {
  export const rainbowStyles: (
    colorMode: import('@chakra-ui/react').ColorMode
  ) => import('@rainbow-me/rainbowkit').Theme
  export const theme: Record<string, any>
  export const sizes: Record<string, string>
}

declare module '~theme/components/Confirm' {
  export const confirmTheme: Record<string, any>
}

declare module '~theme/tokenSelectStyles' {
  export const customStylesSelect: import('chakra-react-select').ChakraStylesConfig
  export const customStylesTokensSelect: import('chakra-react-select').ChakraStylesConfig
}

declare module '~theme/icons' {
  export const Check: import('react').FC
  export const Close: import('react').FC
  export const Logo: import('react').FC
  export const GoBack: import('react').FC
}

declare module '~theme/Fonts' {
  export default import('react').FC
}

declare module '~theme/components/Navbar' {
  export default import('react').FC
}
declare module '~theme/components/Footer' {
  export default import('react').FC
}

declare module '~theme/components/Home' {
  export default import('react').FC
}
