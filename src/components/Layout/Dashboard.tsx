import { Box, BoxProps, Heading as CHeading, Flex, HeadingProps, Slide } from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => (
  <Box
    borderRadius='md'
    boxShadow='sm'
    border='var(--border)'
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

export const Heading = (props: HeadingProps) => (
  <CHeading size='sm' fontSize='2xl' fontWeight={600} as='h3' display='flex' alignItems='center' {...props} />
)

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
      overflowY='auto'
      as='aside'
      gap={6}
      display='flex'
      flexDirection='column'
      {...props}
    />
  </Slide>
)

export const SidebarContents = (props: BoxProps) => <Box px={4} pb={4} {...props} />
