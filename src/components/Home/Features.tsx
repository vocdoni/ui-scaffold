import { Box, Flex, Img, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import anonymouse from '/assets/onvote-anonyomus.svg'
import censorship from '/assets/onvote-censorship.svg'
import descentralized from '/assets/onvote-descentralized.svg'
import flexibleProtocol from '/assets/onvote-flexible-protocol.svg'
import gasless from '/assets/onvote-gasless.svg'
import multichain from '/assets/onvote-multichain.svg'
import opensource from '/assets/onvote-opensource.svg'

const Features = () => {
  const { t } = useTranslation()

  return (
    <Box maxW='90%' mx='auto' mb={44}>
      <Box bgImage='/assets/home-bg2.svg' py={10} mb={10}>
        <Box maxW='640px' mx='auto'>
          <Trans
            i18nKey='home_features.title'
            components={{
              p1: <Text textAlign='center' fontFamily='pixeloid' textTransform='uppercase' fontSize='24px' />,
              p2: <Text textAlign='center' fontWeight='bold' fontSize='xl5' />,
            }}
          />
        </Box>
      </Box>
      <Flex alignItems={{ base: 'center', lg2: 'start' }} flexDirection='column' gap={{ base: 8, lg2: 0 }}>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5}>
          <Img src={anonymouse} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.anonymous_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.anonymous_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5} alignSelf={{ lg2: 'end' }}>
          <Img src={censorship} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.census_startegy_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.census_startegy_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5}>
          <Img src={descentralized} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.open_source_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.open_source_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5} alignSelf={{ lg2: 'end' }}>
          <Img src={gasless} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.gas_less_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.gas_less_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5}>
          <Img src={opensource} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.descentralized_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.descentralized_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5} alignSelf={{ lg2: 'end' }}>
          <Img src={multichain} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.multichain_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.multichain_description')}</Text>
          </Box>
        </Flex>
        <Flex maxW={{ lg2: '50%' }} alignItems='start' gap={5}>
          <Img src={flexibleProtocol} mt={2} />
          <Box>
            <Text fontSize='xl3' fontWeight='bold'>
              {t('home_features.flexible_title')}
            </Text>
            <Text fontSize='lg'>{t('home_features.flexible_description')}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Features
