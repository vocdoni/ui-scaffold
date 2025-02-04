import { Box, Card, CardBody, CardHeader, Flex, Image, Text, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const Faqs = () => {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const faqs = []
  for (let i = 1; i <= 45; i++) {
    faqs.push('faq_' + i)
  }

  return (
    <Box
      position='relative'
      width='full'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      mb={{ base: '75px', lg: '100px' }}
    >
      <Box
        width='full'
        m='0 auto'
        maxW='1920px'
        px={{
          base: '10px',
          sm: '20px',
          md: '80px',
        }}
        position='relative'
        zIndex={10}
      >
        <Text
          fontSize={{ base: '32px', xl: '42px' }}
          lineHeight={{ base: '36px', xl: '46px' }}
          fontWeight='bold'
          textAlign='center'
          mb='10px'
          fontFamily='basier'
        >
          {t('home.faqs.title')}
        </Text>
        <Text
          mb='60px'
          maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
          mx='auto'
          fontFamily='basier'
          fontSize='20px'
          color='home.description'
          lineHeight='28px'
          textAlign='center'
        >
          {t('home.faqs.subtitle')}
        </Text>
        <Flex flexWrap='wrap' gap={10}>
          {faqs.map((faq, index) => (
            <Card
              key={faq}
              variant='faqs'
              flex={{ base: '1 1 100%', xl: '1 1 45%' }}
              mb='30px'
              display={showAll || index < 8 ? '' : 'none'}
            >
              <CardHeader>
                <Text>{t(`home.faqs.${faq}.title`)}</Text>
              </CardHeader>
              <CardBody>
                <Text>{t(`home.faqs.${faq}.description`)}</Text>
              </CardBody>
            </Card>
          ))}
        </Flex>
        {showAll ? (
          <Button mx='auto' mt={4} onClick={() => setShowAll(false)}>
            {t('home.faqs.show_less')}
          </Button>
        ) : (
          <Button mx='auto' mt={4} onClick={() => setShowAll(true)}>
            {t('home.faqs.show_more')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Faqs
