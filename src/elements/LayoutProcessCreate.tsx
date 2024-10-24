import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, ScrollRestoration, useNavigate } from 'react-router-dom'
import DarkModeToggle from '~components/Layout/DarkMode'
import Logo from '~components/Layout/Logo'
import useDarkMode from '~components/Layout/useDarkMode'
import SaasFooter from '~components/ProcessCreate/SaasFooter'
import { Routes } from '~src/router/routes'

const LayoutProcessCreate = () => {
  const { t } = useTranslation()
  const { bg } = useDarkMode()
  const navigate = useNavigate()
  const isSaas = import.meta.env.theme === 'saas'

  return (
    <Box bgColor={bg}>
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
              {isSaas && (
                <Button variant='outline' borderRadius='xl'>
                  Save draft
                </Button>
              )}
              <Button
                as={ReactRouterLink}
                onClick={(e) => (window.history.state.idx ? navigate(-1) : navigate(Routes.root))}
                colorScheme={isSaas && 'whiteAlpha'}
                rightIcon={<CloseIcon boxSize={3} />}
              >
                {t('form.process_create.navbar.close_form_btn')}
              </Button>
              {isSaas && <DarkModeToggle />}
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
