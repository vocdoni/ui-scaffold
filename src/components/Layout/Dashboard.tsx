import { Box, BoxProps, Flex } from '@chakra-ui/react'

export const DashboardBox = (props: BoxProps) => (
  <Box borderRadius='md' boxShadow='0 1px 2px 0 rgb(0 0 0/0.05)' border='var(--border)' p={4} {...props} />
)

export const DashboardContents = (props: BoxProps) => (
  <Flex flexDirection={'column'} maxW={'1536px'} w='full' mx='auto' p={6} {...props} />
)
