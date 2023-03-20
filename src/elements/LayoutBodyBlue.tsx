import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const LayoutBodyBlue = () => (
  <Box as='main' pb={24} bgColor='#F2F5FF'>
    <Box maxWidth='1200px' margin='0 auto' paddingX={{ base: 0, sm: 4 }}>
      <Outlet />
    </Box>
  </Box>
)

export default LayoutBodyBlue
