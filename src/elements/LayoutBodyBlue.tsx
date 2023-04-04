import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const LayoutBodyBlue = () => (
  <Box as='main' bgColor='#F2F5FF' py={14}>
    <Box maxWidth={300} margin='0 auto' paddingX={{ base: 0, sm: 4 }}>
      <Outlet />
    </Box>
  </Box>
)

export default LayoutBodyBlue
