import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const LayoutBody = () => (
  <Box as='main' py={16}>
    <Box maxWidth='1200px' margin='0 auto' paddingX={{ base: 0, sm: 4 }}>
      <Outlet />
    </Box>
  </Box>
)
export default LayoutBody
