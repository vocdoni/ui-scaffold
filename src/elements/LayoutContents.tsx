import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const LayoutContents = () => (
  <Box as='main' py={14}>
    <Box maxWidth={304} margin='0 auto' paddingX={{ base: 4 }}>
      <Outlet />
    </Box>
  </Box>
)
export default LayoutContents
