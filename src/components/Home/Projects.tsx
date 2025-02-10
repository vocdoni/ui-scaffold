import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'

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
          Vols crear una votació per la teva comunitat?
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
          T'ajudem en tots els passos. Oferim projectes customizats clau en mà. Ens encarreguem de tot.
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
          Som experts en vot digital
        </Text>
        <Button
          as={ReactRouterLink}
          to='mailto:info@vocdoni.org'
          variant='outline'
          colorScheme='whiteAlpha'
          aria-label={t('home.support.btn_contact')}
          title={t('home.support.btn_contact')}
          target='_blank'
          height='60px'
          color='white'
          mx='auto'
          maxW='200px'
          fontSize='18px'
          mt='10px'
        >
          {t('home.support.btn_contact')}
        </Button>
      </Flex>
    </Box>
  )
}

export default Support
