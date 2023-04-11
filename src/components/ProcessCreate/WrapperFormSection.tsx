import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'

const WrapperFormSection = ({ children, ...props }: { children: ReactNode }) => (
  <Box p={{ base: 1, sm: 4 }} bg='gray.100' borderRadius='md' {...props}>
    <Box as='fieldset' p={{ base: 2, sm: 4 }} pt={2} borderRadius='md' bg='white'>
      {children}
    </Box>
  </Box>
)

export default WrapperFormSection
