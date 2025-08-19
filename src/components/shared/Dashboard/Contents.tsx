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
  useBreakpointValue,
} from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => (
  <Box
    borderRadius='md'
    boxShadow='sm'
    border='1px solid'
    _dark={{ borderColor: 'black.700' }}
    _light={{ borderColor: 'gray.200' }}
    p={4}
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
  <Box _light={{ bg: 'gray.50' }} _dark={{ bg: 'whiteAlpha.50' }} p={4} borderRadius='sm' {...props} />
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

export const Sidebar = ({ show, ...props }: SidebarProps) => {
  const width = useBreakpointValue({ base: '100%', md: '350px' })
  return (
    <Slide
      direction='right'
      in={show}
      style={{
        position: 'fixed',
        right: 0,
        top: 65,
        bottom: 0,
        width,
        zIndex: 10,
      }}
    >
      <Box
        height='100%'
        bg='chakra.body.bg'
        borderLeft='1px solid'
        borderColor='table.border'
        as='aside'
        display='flex'
        flexDirection='column'
        {...props}
      />
    </Slide>
  )
}

export const SidebarContents = (props: BoxProps) => <Box px={4} pb={4} {...props} />

export const SidebarTitle = (props: HeadingProps) => (
  <Heading as='h4' fontSize='lg' fontWeight='bold' variant='sidebar-title' {...props} />
)
export const SidebarSubtitle = (props: HeadingProps) => (
  <Heading as='h5' fontSize='sm' variant='sidebar-subtitle' {...props} />
)
