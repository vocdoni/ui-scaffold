import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/LogoOnVote'

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
          maxW='1920px'
          w='full'
          mx='auto'
          p={{ base: '12px 40px', md: '24px 80px' }}
        >
          <Logo />

          <Button
            as={ReactRouterLink}
            variant='close-form'
            onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
          >
            <Box />
            <Text as='span'>{t('form.process_create.navbar.close_form_btn')}</Text>
          </Button>
        </Flex>

        <Box as='main' maxW='1920px' w='full' mx='auto' px={{ base: '40px', md: '80px' }}>
          <Outlet />
        </Box>
      </Flex>
      <Text
        top='calc(50vh - 90px)'
        position='fixed'
        sx={{
          '&': {
            writingMode: 'vertical-lr',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          },
        }}
        color='black'
        textTransform='uppercase'
        fontFamily='pixeloidsans'
        fontSize='16px'
        display={{ base: 'none', sm: 'block' }}
      >
        World wide voting
      </Text>
    </Box>
  )
}

export default LayoutProcessCreate
