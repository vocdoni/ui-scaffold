import { Box, BoxProps, forwardRef } from '@chakra-ui/react'

export type LayoutContainerProps = BoxProps & {
  variant?: 'page' | 'content' | 'full'
}

const variantStyles: Record<NonNullable<LayoutContainerProps['variant']>, BoxProps> = {
  page: { maxW: 'page' },
  content: { maxW: 'content' },
  full: { maxW: '100%' },
}

const LayoutContainer = forwardRef<HTMLDivElement, LayoutContainerProps>(({ variant = 'content', ...props }, ref) => (
  <Box
    ref={ref}
    w='full'
    mx='auto'
    px={{
      base: 4,
      md: 6,
      xl: 10,
    }}
    {...variantStyles[variant]}
    {...props}
  />
))

LayoutContainer.displayName = 'LayoutContainer'

export default LayoutContainer
