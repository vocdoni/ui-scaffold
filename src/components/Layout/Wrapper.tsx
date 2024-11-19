import { Box } from '@chakra-ui/react'

const Wrapper = ({ ...props }) => (
  <Box
    width='full'
    maxW='1920px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    {...props}
  ></Box>
)

export default Wrapper
