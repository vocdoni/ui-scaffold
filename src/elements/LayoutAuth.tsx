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


const images = [
  '/assets/illustrations/1.png',
  '/assets/illustrations/2.png',
  '/assets/illustrations/3.png',
  '/assets/illustrations/4.png',
  '/assets/illustrations/5.png',
  '/assets/illustrations/6.png',
  '/assets/illustrations/7.png',
  '/assets/illustrations/8.png',
  '/assets/illustrations/1.png',
  '/assets/illustrations/2.png',
  '/assets/illustrations/3.png',
  '/assets/illustrations/4.png',
  '/assets/illustrations/5.png',
  '/assets/illustrations/6.png',
  '/assets/illustrations/7.png',
  '/assets/illustrations/8.png',
];

//ToDo: Move the text to the i18n file, translate them and call the t() function
const titles = [
  "Simplified Setup:",
  "Flexible Plans:",
  "Cost Savings:",
  "Universal Accessibility:",
  "Trustworthy Technology:",
  "Empower Participation:",
  "Seamless Integration:",
  "Relax, We've Got You Covered:",
  "Streamline Operations:",
  "Stay Informed:",
  "Boost Participation:",
  "Control Costs:",
  "Enhanced Flexibility:",
  "Build Trust:",
  "Join hundreds of organizations:",
  "Let us handle the complexity:"
];

const texts = [
  "Launch secure and verifiable elections in just a few clicks.",
  "Adaptable features that scale with your organization.",
  "Save up to 10x compared to traditional voting methods.",
  "Organize votes accessible on any device—mobile, tablet, or desktop.",
  "Advanced encryption ensures your elections are secure and private.",
  "Foster higher voter turnout with user-friendly tools.",
  "Easily incorporate your branding and existing workflows.",
  "Your voting processes are safe, secure, and ready to go.",
  "Manage multiple elections effortlessly from one dashboard.",
  "Real-time updates and insights at your fingertips.",
  "Increase voter engagement with intuitive voting flows.",
  "Reduce operational expenses for you and your voters.",
  "Explore advanced options like anonymous voting or weighted votes.",
  "Transparent and verifiable elections foster confidence in your results.",
  "Embrace the future of voting. Start today!",
  "Focus on what matters most."
];


const LayoutAuth = () => {
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [sidebar, setSidebar] = useState<ReactNode>(null)
  const [back, setBack] = useState<NavigationFunctionParams>('/')

  // Generate random indices
  const [randomIndex] = useState(() => Math.floor(Math.random() * images.length)); // Generate once and keep it
  const randomImage = images[randomIndex];
  const randomTitle = titles[randomIndex];
  const randomText = texts[randomIndex];

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
        <Flex
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          w="full"
          direction={{ base: 'column' }}
        >
          {/* Random Image Section */}
          <Box flex="1" textAlign="center" mb={{ base: 4, md: 0 }}>
            <img
              src={randomImage}
              alt="Dynamic Illustration"
              style={{
                filter: 'invert(1)',
                margin: '0 auto',
                maxWidth: '100%',
                height: 'auto',
                marginTop: '420px'
              }}
            />
          </Box>

          {/* Random Text Section */}
          <Box flex="1" textAlign="left" px={{ base: 4, md: 8 }} marginTop="50px" maxW="500px">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ color: '#fff', marginBottom: '10px', fontSize: '24px', fontWeight: '600' }}>{randomTitle}</li>
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
