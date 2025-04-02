import { Box, BoxProps, Flex } from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => <Box {...props} />

export const DashboardContents = (props: BoxProps) => (
  <Flex flexDirection={'column'} maxW={'1536px'} w='full' mx='auto' position={'static'}>
    <DashboardBox p={6} {...props} />
  </Flex>
)
