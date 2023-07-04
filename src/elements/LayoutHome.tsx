import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const LayoutHome = () => (
  <Box as='main' bgColor='home_bg' py={14}>
    <Box maxWidth={304} margin='0 auto' paddingX={{ base: 0, sm: 4 }}>
      <Outlet />
    </Box>
  </Box>
)

export default LayoutHome
