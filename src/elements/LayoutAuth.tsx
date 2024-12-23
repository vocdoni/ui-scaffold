import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet, To } from 'react-router-dom'
import AuthBanner from '~components/Organization/Dashboard/AuthBanner'

export type NavigationFunctionParams = To | number

export type AuthOutletContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setSubTitle: React.Dispatch<React.SetStateAction<string>>
  setBack: React.Dispatch<React.SetStateAction<NavigationFunctionParams>>
  setSidebar: React.Dispatch<React.SetStateAction<ReactNode>>
}

const LayoutAuth = () => {
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [sidebar, setSidebar] = useState<ReactNode>(null)
  const [back, setBack] = useState<NavigationFunctionParams>('/')

  return (
    <Flex
      bgColor={'bg.light'}
      _dark={{ bgColor: 'bg.dark' }}
      minH={{ xl: '100vh' }}
      flexDirection={{ base: 'column', xl: 'row' }}
    >
      <Box position='absolute' top={5} left={2.5}>
        <NavLink to={back as unknown}>
          <Flex align='center' w='fit-content'>
            <Icon as={FaChevronLeft} me={2} h={3} w={2} color={'auth.text_color_secondary'} />
            <Text fontSize='sm' color={'auth.text_color_secondary'}>
              {t('back', { defaultValue: 'Back' })}
            </Text>
          </Flex>
        </NavLink>
      </Box>
      <Flex
        position={'relative'}
        flex={{ base: '1 1 100%', xl: '1 1 50%' }}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        px={{
          base: 2.5,
          sm: 5,
        }}
        pt={20}
        pb={{ base: 14, xl: 0 }}
      >
        <Flex flexDirection='column' justifyContent={{ base: 'start', xl: 'center' }} alignItems='center' w='full'>
          <Flex direction='column' gap={6} w={'100%'} maxW='500px'>
            <Box me='auto'>
              <Heading fontSize='4xl' mb={2.5}>
                {title}
              </Heading>
              <Text color={'account.description'} fontWeight='400' fontSize='md'>
                {subTitle}
              </Text>
            </Box>
            <Outlet context={{ setTitle, setSubTitle, setSidebar, setBack } satisfies AuthOutletContextType} />
          </Flex>
        </Flex>
        <Text
          position={'absolute'}
          bottom={0}
          display={{ base: 'none', xl: 'block' }}
          mt='auto'
          color={'auth.text_color_secondary'}
          py={5}
          textAlign='center'
        >
          {t('rights', { defaultValue: '© 2024 Vocdoni Association. All Rights Reserved.' })}
        </Text>
      </Flex>
      <AuthBanner>
        {sidebar}
        <Flex flexGrow={1} alignItems='end' justifyContent='center' w='full'>
          <Box mb={{ base: 10, xl: 24 }}>
            <Text fontSize='5xl' color='white' lineHeight={1} mb={{ base: 10, xl: 5 }}>
              {t('auth.title', { defaultValue: 'The global voting platform' })}
            </Text>
            <Text fontSize='lg' color='white'>
              {t('auth.subtitle', { defaultValue: 'Cut costs, Save Time: Secure, Private, and GDPR Compliant Voting' })}
            </Text>
          </Box>
        </Flex>
      </AuthBanner>
    </Flex>
  )
}

export default LayoutAuth
