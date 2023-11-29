import { Box, Flex, Icon, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { IoCloseOutline } from 'react-icons/io5'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/Logo'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box bgColor='process_create.bg'>
      <Flex direction='column' minH='100vh' maxW={360} mx='auto'>
        <Flex
          as='header'
          position='relative'
          justifyContent='space-between'
          alignItems='center'
          paddingY={4}
          px={4}
          w='full'
        >
          <Logo />

          <Link
            p={1}
            bgColor='white'
            display='flex'
            alignItems='center'
            onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
          >
            <Icon as={IoCloseOutline} mt='1.5px' boxSize={5} />
            {t('form.process_create.navbar.close_form_btn')}
          </Link>
        </Flex>

        <Box as='main' maxW={360} w='full' mx='auto' p={4}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}

export default LayoutProcessCreate
