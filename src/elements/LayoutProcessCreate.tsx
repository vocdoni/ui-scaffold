import { Box, Flex, Img, Link, Text } from '@chakra-ui/react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const LayoutProcessCreate = () => {
  const navigate = useNavigate()

  return (
    <Flex direction='column' minH='100vh'>
      <Flex
        as='header'
        position='relative'
        justifyContent='space-between'
        alignItems='center'
        paddingY={4}
        maxW={350}
        mx='auto'
        px={4}
        w='full'
      >
        <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
          <NavLink to='/'>
            <Img src={`${process.env.PUBLIC_URL}/assets/vocdoni_icon.png`} maxWidth={12} alt='vocdoni icon' />
          </NavLink>
          <Text fontSize={12} whiteSpace='nowrap'>
            Public voting protocol
          </Text>
        </Flex>
        <Link display='flex' alignItems='center' gap={1} onClick={() => navigate(-1)}>
          Close form
        </Link>
      </Flex>

      <Box as='main' py={14}>
        <Box maxWidth={304} margin='0 auto' paddingX={{ base: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutProcessCreate
