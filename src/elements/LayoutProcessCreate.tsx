import { Box, Flex, Icon, Img, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { IoCloseOutline } from 'react-icons/io5'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
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
        <NavLink to='/'>
          <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
            <Img src={`${process.env.PUBLIC_URL}/assets/vocdoni_icon.png`} maxWidth={12} alt='vocdoni icon' />
            <Text fontSize={12} whiteSpace='nowrap'>
              Public voting protocol
            </Text>
          </Flex>
        </NavLink>

        <Link display='flex' alignItems='center' onClick={() => navigate(-1)}>
          <Icon as={IoCloseOutline} mt='1.5px' boxSize={5} />
          {t('form.process_create.navbar.close_form_btn')}
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
