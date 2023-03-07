import { Box } from '@chakra-ui/layout'

interface Props {
  children: JSX.Element
}

const WrapperFormSection = ({ children, ...props }: Props) => (
  <Box
    p={4}
    bg='gray.100'
    borderRadius={8}
    _dark={{ bg: 'black.c90' }}
    {...props}
  >
    <Box
      as='fieldset'
      p={4}
      pt={2}
      borderRadius={8}
      bg='white'
      _dark={{ bg: 'black.c60' }}
    >
      {children}
    </Box>
  </Box>
)

export default WrapperFormSection
