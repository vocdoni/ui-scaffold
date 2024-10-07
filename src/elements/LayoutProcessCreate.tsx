import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, ScrollRestoration, useNavigate } from 'react-router-dom'
import Logo from '~components/Layout/Logo'
import SaasFooter from '~components/ProcessCreate/SaasFooter'
import DarkModeToggle from '~src/themes/saas/components/DarkMode'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const { bg } = useDarkMode()
  const navigate = useNavigate()
  const isSaas = import.meta.env.SAAS_URL

  return (
    <Box bgColor={bg}>
      <ScrollRestoration />
      <Box maxW={1800} mx='auto'>
        <Flex direction='column' minH='100vh'>
          <Flex
            as='header'
            justifyContent='space-between'
            alignItems='center'
            px={{ base: 2.5, sm: 5, md: 10 }}
            py={{ base: 3, sm: 3, md: 6 }}
          >
            <Logo />
            <Flex gap={6}>
              {isSaas && <Button>Save draft</Button>}
              <Button
                as={ReactRouterLink}
                onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate('/'))}
                colorScheme={isSaas && 'whiteAlpha'}
                rightIcon={<CloseIcon boxSize={3} />}
              >
                {t('form.process_create.navbar.close_form_btn')}
              </Button>
              {isSaas && <DarkModeToggle />}
            </Flex>
          </Flex>

          <Box as='main' w='full' px={{ base: 2.5, sm: 5, md: 10 }} flexGrow={1} display='flex' flexDirection='column'>
            <Outlet />
          </Box>

          {isSaas && <SaasFooter />}
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
            display={{ base: 'none', md: 'block' }}
          >
            World wide voting
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default LayoutProcessCreate
