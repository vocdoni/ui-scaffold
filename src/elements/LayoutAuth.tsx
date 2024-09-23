import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import AuthBanner from '~components/OrganizationSaas/Dashboard/AuthBanner'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const LayoutAuth = () => {
  const { t } = useTranslation()
  const { bg, textColorSecondary } = useDarkMode()

  return (
    <Flex bgColor={bg} minH='100vh' flexDirection={{ base: 'column', xl: 'row' }}>
      <Flex
        flex={{ base: '1 1 100%', xl: '1 1 50%' }}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box maxW='980px' mx='auto'>
          <Box position='absolute' top={5} left={2.5} minW={{ base: '90%', md: 96 }}>
            <NavLink to='/'>
              <Flex align='center' w='fit-content'>
                <Icon as={FaChevronLeft} me={2} h={3} w={2} color='secondaryGray.600' />
                <Text fontSize='sm' color='secondaryGray.600'>
                  {t('back')}
                </Text>
              </Flex>
            </NavLink>
          </Box>
          <Flex
            pt={14}
            pb={10}
            minW='100%'
            flexGrow={1}
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Box maxW={{ base: '90%', md: 96 }} minW={{ base: '90%', md: 96 }}>
              <Outlet />
            </Box>
          </Flex>
          <Text display={{ base: 'none', xl: 'block' }} mt='auto' color={textColorSecondary} py={5} textAlign='center'>
            {t('rights')}
          </Text>
        </Box>
      </Flex>
      <AuthBanner>
        <Flex flexGrow={1} alignItems='end' justifyContent='center'>
          <Box mb={24}>
            <Text fontSize='5xl' color='white'>
              {t('auth.title')}
            </Text>
            <Text fontSize='lg' color='white'>
              {t('auth.subtitle')}
            </Text>
          </Box>
        </Flex>
      </AuthBanner>
    </Flex>
  )
}

export default LayoutAuth
