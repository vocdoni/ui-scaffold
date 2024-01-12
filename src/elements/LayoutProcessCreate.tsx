import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/Logo'
import { Close } from '~theme/icons'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box bgColor='process_create.bg'>
      <Flex direction='column' minH='100vh' mx='auto' className='process-create'>
        <Flex
          as='header'
          position='relative'
          justifyContent='space-between'
          alignItems='center'
          maxW='inherit'
          w='full'
        >
          <Logo />

          <Button
            as={ReactRouterLink}
            variant='close-form'
            onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
          >
            <Close />
            {t('form.process_create.navbar.close_form_btn')}
          </Button>
        </Flex>

        <Box as='main' w='full' mx='auto'>
          <Outlet />
        </Box>
      </Flex>
      {import.meta.env.theme === 'onvote' && (
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
      )}
    </Box>
  )
}

export default LayoutProcessCreate
