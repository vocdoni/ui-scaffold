import { Box, BoxProps } from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => (
  <Box
    borderRadius='xl'
    bg='dashboard.sidebar.bg.light'
    boxShadow='0 0 10px #e3e3e3'
    _dark={{ bg: 'dashboard.sidebar.bg.dark', boxShadow: '0 0 10px #101010' }}
    p={4}
    {...props}
  />
)

export const DashboardContents = (props: BoxProps) => (
  <DashboardBox
    borderRadius={0}
    borderTopRadius='lg'
    height='100%'
    py={{ base: 4, lg: 6 }}
    px={{ base: 4, lg: 10 }}
    {...props}
  />
)
