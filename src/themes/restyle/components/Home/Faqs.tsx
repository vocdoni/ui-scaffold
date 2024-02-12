import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Faqs = () => {
  const { t } = useTranslation()

  return (
    <Box className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
      <Text
        fontSize={{ base: '25px', lg: '30px', xl: '40px' }}
        lineHeight={{ base: '30px', lg: '36px', xl: '48px' }}
        fontWeight='bold'
        textAlign='center'
        mb='10px'
      >
        {t('home.faqs.title')}
      </Text>
      <Text textAlign='center' mb='60px' color='gray'>
        {t('home.faqs.subtitle')}
      </Text>
      <Flex flexDirection={{ base: 'column', md2: 'row' }} gap={{ base: '40px', md2: '60px' }}>
        <Box flex='1 1 50%'>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_1.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_1.description')}
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_2.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_2.description')}
            </Text>
          </Box>
          <Box borderBottom={{ base: '1px solid rgb(229, 229, 229)', md2: 'none' }}>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_3.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_3.description')}
            </Text>
          </Box>
        </Box>
        <Box flex='1 1 50%'>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_4.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_4.description')}
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_5.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_5.description')}
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_6.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_6.description')}
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              {t('home.faqs.faq_7.title')}
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              {t('home.faqs.faq_7.description')}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Faqs
