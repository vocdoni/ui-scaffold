import { Box, BoxProps, Flex } from '@chakra-ui/react'

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
  <Flex flexDirection={'column'} maxW={'1536px'} w='full' mx='auto' p={6} {...props} />
)
