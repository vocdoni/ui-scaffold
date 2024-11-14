import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const PublicContentsLayout = () => (
  <Flex
    flexDirection='column'
    gap={5}
    width='full'
    mx='auto'
    maxW='1100px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
    mt={6}
  >
    <Outlet />
  </Flex>
)

export default PublicContentsLayout
