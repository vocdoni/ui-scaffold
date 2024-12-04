import { Flex, FlexProps } from '@chakra-ui/react'

export const FeaturesBox = (props: FlexProps) => (
  <Flex
    flexDirection='column'
    bg='gray.100'
    _dark={{ bg: 'gray.700' }}
    px={10}
    py={6}
    w={{ base: 'modal-stretch', lg: 'modal-stretch-lg' }}
    gap={5}
    boxShadow='0 0 10px var(--chakra-colors-gray-400)'
    {...props}
  />
)
