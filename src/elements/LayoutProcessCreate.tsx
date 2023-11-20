import { Box, Flex, Img, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/Logo'
import closeIcon from '/assets/close-icon.svg'

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
            display='flex'
            alignItems='center'
            onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
            color='primary.500'
          >
            <Img src={closeIcon} mr={1} />
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
