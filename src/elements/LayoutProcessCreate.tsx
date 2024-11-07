import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, ScrollRestoration, useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import Logo from '~components/Layout/Logo'
import SaasFooter from '~components/ProcessCreate/SaasFooter'
import { Routes } from '~src/router/routes'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box bgColor={'bg.light'} _dark={{ bgColor: 'bg.dark' }}>
      <ScrollRestoration />
      <Box mx='auto'>
        <Flex direction='column' minH='100vh'>
          <Flex
            as='header'
            maxW='2000px'
            w='full'
            mx='auto'
            justifyContent='space-between'
            alignItems='center'
            px={{ base: 2.5, sm: 5, lg: 10 }}
            py={{ base: 3, sm: 3, lg: 6 }}
          >
            <Logo />
            <Flex gap={6}>
              <Button
                as={ReactRouterLink}
                onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate(Routes.root))}
                rightIcon={<CloseIcon boxSize={3} />}
              >
                {t('form.process_create.navbar.close_form_btn')}
              </Button>
              <ColorModeSwitcher />
            </Flex>
          </Flex>

          <Box
            as='main'
            maxW='1750px'
            w='95%'
            mx='auto'
            px={{ base: 2.5, sm: 5, md: 10 }}
            mb={12}
            mt={6}
            flexGrow={1}
            display='flex'
            flexDirection='column'
          >
            <Outlet />
          </Box>

          <SaasFooter />
        </Flex>
      </Box>
    </Box>
  )
}

export default LayoutProcessCreate
