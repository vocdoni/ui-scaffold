import { Box, Flex, Icon, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { IoCloseOutline } from 'react-icons/io5'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../components/Layout/Logo'

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
        <Logo />

        <Link
          variant='primary'
          display='flex'
          alignItems='center'
          onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
        >
          <Icon as={IoCloseOutline} mt='1.5px' boxSize={5} />
          {t('form.process_create.navbar.close_form_btn')}
        </Link>
      </Flex>

      <Box as='main' py={4}>
        <Box maxWidth={304} margin='0 auto' paddingX={{ base: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutProcessCreate
