import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet, To } from 'react-router-dom'
import AuthBanner from '~components/Organization/Dashboard/AuthBanner'

export type NavigationFunctionParams = To | number

export type AuthOutletContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
  setBack: React.Dispatch<React.SetStateAction<NavigationFunctionParams>>
  setSidebar: React.Dispatch<React.SetStateAction<ReactNode>>
}

const LayoutAuth = () => {
  const { t } = useTranslation()

  const images = [
    '/assets/illustrations/1.png',
    '/assets/illustrations/2.png',
    '/assets/illustrations/3.png',
    '/assets/illustrations/4.png',
    '/assets/illustrations/5.png',
    '/assets/illustrations/6.png',
    '/assets/illustrations/7.png',
    '/assets/illustrations/8.png',
  ]

  const titles = [
    t('authPage.title.1', { defaultValue: 'Simplified Setup:' }),
    t('authPage.title.2', { defaultValue: 'Flexible Plans:' }),
    t('authPage.title.3', { defaultValue: 'Cost Savings:' }),
    t('authPage.title.4', { defaultValue: 'Universal Accessibility:' }),
    t('authPage.title.5', { defaultValue: 'Trustworthy Technology:' }),
    t('authPage.title.6', { defaultValue: 'Empower Participation:' }),
    t('authPage.title.7', { defaultValue: 'Seamless Integration:' }),
    t('authPage.title.8', { defaultValue: "Relax, We've Got You Covered:" }),
    t('authPage.title.9', { defaultValue: 'Streamline Operations:' }),
    t('authPage.title.10', { defaultValue: 'Stay Informed:' }),
    t('authPage.title.11', { defaultValue: 'Boost Participation:' }),
    t('authPage.title.12', { defaultValue: 'Control Costs:' }),
    t('authPage.title.13', { defaultValue: 'Enhanced Flexibility:' }),
    t('authPage.title.14', { defaultValue: 'Build Trust:' }),
    t('authPage.title.15', { defaultValue: 'Join hundreds of organizations:' }),
    t('authPage.title.16', { defaultValue: 'Let us handle the complexity:' }),
  ]

  const texts = [
    t('authPage.text.1', { defaultValue: 'Launch secure and verifiable elections in just a few clicks.' }),
    t('authPage.text.2', { defaultValue: 'Adaptable features that scale with your organization.' }),
    t('authPage.text.3', { defaultValue: 'Save up to 10x compared to traditional voting methods.' }),
    t('authPage.text.4', { defaultValue: 'Organize votes accessible on any device—mobile, tablet, or desktop.' }),
    t('authPage.text.5', { defaultValue: 'Advanced encryption ensures your elections are secure and private.' }),
    t('authPage.text.6', { defaultValue: 'Foster higher voter turnout with user-friendly tools.' }),
    t('authPage.text.7', { defaultValue: 'Easily incorporate your branding and existing workflows.' }),
    t('authPage.text.8', { defaultValue: 'Your voting processes are safe, secure, and ready to go.' }),
    t('authPage.text.9', { defaultValue: 'Manage multiple elections effortlessly from one dashboard.' }),
    t('authPage.text.10', { defaultValue: 'Real-time updates and insights at your fingertips.' }),
    t('authPage.text.11', { defaultValue: 'Increase voter engagement with intuitive voting flows.' }),
    t('authPage.text.12', { defaultValue: 'Reduce operational expenses for you and your voters.' }),
    t('authPage.text.13', { defaultValue: 'Explore advanced options like anonymous voting or weighted votes.' }),
    t('authPage.text.14', { defaultValue: 'Transparent and verifiable elections foster confidence in your results.' }),
    t('authPage.text.15', { defaultValue: 'Embrace the future of voting. Start today!' }),
    t('authPage.text.16', { defaultValue: 'Focus on what matters most.' }),
  ]

  const [title, setTitle] = useState<string | null>(null)
  const [subtitle, setSubtitle] = useState<string | null>(null)
  const [sidebar, setSidebar] = useState<ReactNode>(null)
  const [back, setBack] = useState<NavigationFunctionParams>('/')

  const [randomImageIndex] = useState(() => Math.floor(Math.random() * images.length)) // Generate once and keep it
  const [randomTextIndex] = useState(() => Math.floor(Math.random() * texts.length)) // Generate once and keep it
  const randomTitle = titles[randomTextIndex]
  const randomText = texts[randomTextIndex]
  const randomImage = images[randomImageIndex]

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
      >
        <Flex
          flexDirection='column'
          justifyContent={{ base: 'start', xl: 'center' }}
          alignItems='center'
          w='full'
          pb={20}
          pt={10}
        >
          <Flex direction='column' gap={6} w={'100%'} maxW='500px'>
            {(title || subtitle) && (
              <Box me='auto'>
                {title && (
                  <Heading fontSize='4xl' mb={2.5}>
                    {title}
                  </Heading>
                )}
                {subtitle && (
                  <Text color={'account.description'} fontWeight='400' fontSize='md'>
                    {subtitle}
                  </Text>
                )}
              </Box>
            )}
            <Outlet context={{ setTitle, setSubtitle, setSidebar, setBack } satisfies AuthOutletContextType} />
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
        <Flex flexGrow={1} alignItems='center' justifyContent='center' w='full' direction={{ base: 'column' }}>
          {/* Random Image Section */}
          <Box flex='1' textAlign='center' mb={{ base: 4, md: 0 }}>
            <img
              src={randomImage}
              alt='Dynamic Illustration'
              style={{
                filter: 'invert(1)',
                margin: '0 auto',
                maxWidth: '100%',
                height: 'auto',
                marginTop: '420px',
              }}
            />
          </Box>

          {/* Random Text Section */}
          <Box flex='1' textAlign='left' px={{ base: 4, md: 8 }} marginTop='50px' maxW='500px'>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ color: '#fff', marginBottom: '10px', fontSize: '24px', fontWeight: '600' }}>
                {randomTitle}
              </li>
              <li style={{ color: '#fff', marginBottom: '10px', fontSize: '22px' }}>{randomText}</li>
            </ul>
          </Box>
        </Flex>
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
