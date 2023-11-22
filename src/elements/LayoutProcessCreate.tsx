import { Box, Flex, Img, Link, Text } from '@chakra-ui/react'
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

        <Box
          as='main'
          maxW={360}
          w='full'
          mx='auto'
          px={{
            base: 6,
            md: 10,
          }}
        >
          <Outlet />
        </Box>
      </Flex>
      <Text
        position='fixed'
        top='50vh'
        left={-20}
        transform='rotate(-90deg)'
        fontFamily='pixeloid'
        textTransform='uppercase'
      >
        World wide voting
      </Text>
    </Box>
  )
}

export default LayoutProcessCreate
