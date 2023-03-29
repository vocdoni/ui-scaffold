import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'

const WrapperFormSection = ({ children, ...props }: { children: ReactNode }) => (
  <Box p={{ base: 1, sm: 4 }} bg='gray.100' borderRadius='md' _dark={{ bg: 'black.c90' }} {...props}>
    <Box as='fieldset' p={{ base: 2, sm: 4 }} pt={2} borderRadius='md' bg='white' _dark={{ bg: 'black.c60' }}>
      {children}
    </Box>
  </Box>
)

export default WrapperFormSection
