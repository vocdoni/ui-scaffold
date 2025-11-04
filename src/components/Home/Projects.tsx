import { Box, Flex, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import ContactButton from '~components/shared/ContactLink'

const Support = () => {
  const { t } = useTranslation()
  return (
    <Box
      background={'home.support.bg.light'}
      _dark={{
        background: 'home.support.bg.dark',
      }}
      mb={{ base: '100px', lg: '160px' }}
      boxShadow='inset 0 -1px 0 1px rgba(68, 67, 67, 0.38),0 8px 22px rgba(0, 0, 0, 0.44)'
      maxW='1500px'
      borderRadius={{ base: '0px', md: '16px' }}
      mx='auto'
      px={'40px'}
      py={'60px'}
      display='flex'
      flexDirection={{ base: 'column', xl: 'row' }}
      gap={6}
    >
      <Box>
        <Text
          fontSize={{ base: '24px', lg: '32px' }}
          lineHeight={{ base: '24px', lg: '32px' }}
          mb={{ base: '20px' }}
          color='white'
          textAlign='center'
          fontFamily='basier'
          maxW='900px'
          mx='auto'
        >
          <Trans i18nKey='home.projects.title'>Do you want to create a vote for your community?</Trans>
        </Text>
        <Text
          fontSize='18px'
          lineHeight='22px'
          color='white'
          textAlign='center'
          fontFamily='basier'
          fontWeight='100'
          mx='auto'
        >
          <Trans i18nKey='home.projects.description'>
            We help you at every step. We offer turnkey customized projects. We take care of everything.
          </Trans>
        </Text>
      </Box>
      <Flex flexGrow={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text
          fontSize='16px'
          lineHeight='20px'
          mb='6px'
          color='home.support.title'
          textAlign='center'
          fontWeight='bold'
          mx='auto'
          w='100%'
        >
          <Trans i18nKey='home.projects.expertise'>We are experts in digital voting</Trans>
        </Text>
        <ContactButton
          variant='outline'
          colorScheme='whiteAlpha'
          aria-label={t('home.support.btn_contact')}
          title={t('home.support.btn_contact')}
          height='60px'
          color='white'
          mx='auto'
          maxW='300px'
          minW='220px'
          fontSize='16px'
          mt='10px'
          border='2px solid #fff'
          fontWeight='900'
        >
          {t('home.support.btn_contact')}
        </ContactButton>
      </Flex>
    </Box>
  )
}

export default Support
