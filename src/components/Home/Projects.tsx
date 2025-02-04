import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume, FaRegCheckCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

const Support = () => {
  const { t } = useTranslation()

  return (
    <Box
      background={'home.support.bg.light'}
      _dark={{
        background: 'home.support.bg.dark',
      }}
      backgroundRepeat='no-repeat'
      backgroundPosition='right'
      mb='80px'
      boxShadow='inset 0 -1px 0 1px rgba(68, 67, 67, 0.38),0 8px 22px rgba(0, 0, 0, 0.44)'
      maxW='1500px'
      borderRadius={{ base: '0px', lg: '16px' }}
      w='92%'
      mx='auto'
    >
      <Box
        width='full'
        m='0 auto'
        maxW='1600px'
        px={{
          base: '10px',
          sm: '20px',
          md: '40px',
        }}
        py={{ base: '40px', lg: '60px' }}
        position='relative'
        overflow='hidden'
        display='flex'
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Box flex='2'>
          <Text
            fontSize='32px'
            lineHeight='32px'
            mb='10px'
            color='white'
            textAlign='center'
            fontFamily='basier'
            maxW='900px'
            mx='auto'
            mt='10px'
          >
            Vols crear una votació per la teva comunitat?
          </Text>
          <Text
            fontSize='18px'
            lineHeight='22px'
            mb='30px'
            color='white'
            textAlign='center'
            fontFamily='basier'
            fontWeight='100'
            maxW='900px'
            ḿx='auto'
          >
            T'ajudem en tots els passos. Oferim projectes customizats clau en mà. Ens encarreguem de tot.
          </Text>
        </Box>
        <Box flex='1'>
          <Text
            fontSize='16px'
            lineHeight='20px'
            mb='6px'
            color='home.support.title'
            textAlign='center'
            fontWeight='bold'
            mx='auto'
            w='100%'
            textAlign='center'
            minW='400px'
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
            minW='280px'
            height='60px'
            color='white'
            mx='auto'
            maxW='200px'
            fontSize='18px'
            mt='10px'
          >
            {t('home.support.btn_contact')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Support
