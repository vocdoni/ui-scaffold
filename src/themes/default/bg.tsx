import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import navbg from '/assets/bg-home.png'

export const NavBg = ({ children }: { children: ReactNode }) => (
  <>
    <Box
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgImage={`url(${navbg})`}
      bgSize='cover'
      zIndex={-1}
      filter='blur(20px)'
      opacity={0.7}
      backgroundSize='100%'
    />
    {children}
  </>
)
