import { Box, BoxProps, Heading as CHeading, Flex, forwardRef, HeadingProps, Slide } from '@chakra-ui/react'

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
    flexWrap={'wrap'}
    justifyContent={'space-between'}
    gap={4}
    {...props}
  />
)

export const DashboardContents = (props: BoxProps) => (
  <Flex flexDirection={'column'} maxW='1536px' w='full' mx='auto' p={6} {...props} />
)

export const Heading = forwardRef<HeadingProps, 'h2'>((props, ref) => (
  <CHeading size='sm' fontSize='2xl' fontWeight={600} display='flex' gap={2} alignItems='center' ref={ref} {...props} />
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
      top: 65,
      bottom: 0,
      width: '350px',
      zIndex: 10,
    }}
  >
    <Box
      height='100%'
      bg='white'
      borderLeft='1px solid'
      borderColor='gray.200'
      as='aside'
      display='flex'
      flexDirection='column'
      {...props}
    />
  </Slide>
)

export const SidebarContents = (props: BoxProps) => <Box px={4} pb={4} {...props} />
