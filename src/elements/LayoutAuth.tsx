import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import AuthBanner from '~components/Organization/Dashboard/AuthBanner'

export type AuthOutletContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setSubTitle: React.Dispatch<React.SetStateAction<string>>
}

const LayoutAuth = () => {
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')

  return (
    <Flex
      bgColor={'bg.light'}
      _dark={{ bgColor: 'bg.dark' }}
      minH='100vh'
      flexDirection={{ base: 'column', xl: 'row' }}
    >
      <Flex
        flex={{ base: '1 1 100%', xl: '1 1 50%' }}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex flexDirection='column' maxW={245} mx='auto' flexGrow={1}>
          <Box position='absolute' top={5} left={2.5} minW={{ base: '90%', md: 96 }}>
            <NavLink to='/'>
              <Flex align='center' w='fit-content'>
                <Icon as={FaChevronLeft} me={2} h={3} w={2} color={'auth.text_color_secondary'} />
                <Text fontSize='sm' color={'auth.text_color_secondary'}>
                  {t('back', { defaultValue: 'Back' })}
                </Text>
              </Flex>
            </NavLink>
          </Box>
          <Flex pt={14} minW='100%' flexGrow={1} flexDirection='column' justifyContent='center' alignItems='center'>
            <Box maxW={{ base: '90%', md: 96 }} minW={{ base: '90%', md: 96 }}>
              <Flex direction='column' gap={6}>
                <Box me='auto'>
                  <Heading fontSize='4xl' mb={2.5}>
                    {title}
                  </Heading>
                  <Text color={'account.description'} fontWeight='400' fontSize='md'>
                    {subTitle}
                  </Text>
                </Box>
                <Outlet context={{ setTitle, setSubTitle } satisfies AuthOutletContextType} />
              </Flex>
            </Box>
          </Flex>
          <Text
            display={{ base: 'none', xl: 'block' }}
            mt='auto'
            color={'auth.text_color_secondary'}
            py={5}
            textAlign='center'
          >
            {t('rights', { defaultValue: '© 2024 Vocdoni Association. All Rights Reserved.' })}
          </Text>
        </Flex>
      </Flex>
      <AuthBanner>
        <Flex flexGrow={1} alignItems='end' justifyContent='center'>
          <Box mb={24}>
            <Text fontSize='5xl' color='white' lineHeight={1} mb={0}>
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
