import { Box, Flex, Img, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/LogoOnVote'
import closeIcon from '/assets/close-icon.svg'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box bgColor='process_create.bg'>
      <Flex direction='column' minH='100vh' maxW='1920px' mx='auto'>
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
          maxW='1920px'
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
        top='calc(50vh - 90px)'
        position='fixed'
        sx={{
          '&': {
            'writing-mode': 'vertical-lr',
            'text-orientation': 'mixed',
            transform: 'rotate(180deg)',
          },
        }}
        color='black'
        textTransform='uppercase'
        fontFamily='pixeloid'
        fontSize='16px'
        fontWeight='bold'
      >
        World wide voting
      </Text>
    </Box>
  )
}

export default LayoutProcessCreate
