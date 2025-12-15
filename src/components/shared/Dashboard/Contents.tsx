import {
  Box,
  BoxProps,
  Heading as CHeading,
  Flex,
  forwardRef,
  HeadingProps,
  Slide,
  Text,
  TextProps,
} from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => (
  <Box
    borderRadius='md'
    boxShadow='0 1px 3px rgba(0, 0, 0, 0.1)'
    _dark={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
    border='1px solid'
    borderColor='borders.default'
    p={6}
    display='flex'
    flexDirection='column'
    flexWrap='wrap'
    justifyContent='space-between'
    gap={4}
    {...props}
  />
)

export const DashboardContents = (props: BoxProps) => (
  <Flex flexDirection={'column'} maxW='1536px' w='full' mx='auto' p={6} {...props} />
)

export const DashboardSection = (props: BoxProps) => (
  <Box _light={{ bg: 'gray.100' }} _dark={{ bg: 'whiteAlpha.100' }} p={4} borderRadius='md' {...props} />
)

export const Heading = forwardRef<HeadingProps, 'h2'>((props, ref) => (
  <CHeading
    size='sm'
    fontSize='2xl'
    fontWeight='bold'
    display='flex'
    gap={2}
    alignItems='center'
    ref={ref}
    {...props}
  />
))

export const SubHeading = forwardRef<TextProps, 'p'>((props, ref) => (
  <Text
    mt={2}
    mb={4}
    fontSize='md'
    color='texts.subtle'
    display='flex'
    gap={2}
    alignItems='center'
    ref={ref}
    {...props}
  />
))

export type SidebarProps = BoxProps & {
  show: boolean
}

export const Sidebar = ({ show, ...props }: SidebarProps) => (
  <Slide
    direction='right'
    in={show}
    style={{
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      width: null,
      zIndex: 1200,
    }}
  >
    <Box
      height='100%'
      width={{ base: '100vw', md: 'sidebar' }}
      bg='chakra.body.bg'
      borderLeft='1px solid'
      borderColor='borders.default'
      as='aside'
      display='flex'
      flexDirection='column'
      {...props}
    />
  </Slide>
)

export const SidebarContents = (props: BoxProps) => <Box px={4} pb={4} {...props} />

export const SidebarTitle = (props: HeadingProps) => (
  <Heading as='h4' fontSize='lg' fontWeight='bold' variant='sidebar-title' {...props} />
)
export const SidebarSubtitle = (props: HeadingProps) => (
  <Heading as='h5' fontSize='sm' variant='sidebar-subtitle' {...props} />
)
