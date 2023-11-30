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
    <Box mb={44} position='relative' mt='100px'>
      <Img
        src='/assets/home-bg2.svg'
        position='absolute'
        w='full'
        filter='blur(2px)'
        display={{ base: 'none', lg2: 'block' }}
      />

      <Box
        px={{
          base: 10,
          sm: 14,
        }}
      >
        <Box
          position='relative'
          maxW='840px'
          mx='auto'
          px={{
            base: 10,
            sm: 14,
          }}
          pt={{ base: 10, xl: 20 }}
          mb={32}
        >
          <Trans
            i18nKey='home_features.title'
            components={{
              p1: (
                <Text
                  textAlign='center'
                  fontFamily='pixeloidsans'
                  textTransform='uppercase'
                  fontSize={{ base: '24px', md: '32px' }}
                  lineHeight='39.5px'
                />
              ),
              p2: <Text textAlign='center' fontWeight='bold' fontSize='64px' lineHeight='80px' />,
            }}
          />
        </Box>
        <Flex
          alignItems={{ base: 'center', lg: 'start' }}
          flexDirection='column'
          mx='auto'
          maxW='1124px'
          position='relative'
          zIndex={10}
          gap={{ base: 10, lg: 0 }}
        >
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5}>
            <Img src={anonymouse} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.anonymous_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.anonymous_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5} alignSelf={{ lg: 'end' }}>
            <Img src={censorship} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.census_startegy_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.census_startegy_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5}>
            <Img src={descentralized} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.open_source_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.open_source_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5} alignSelf={{ lg: 'end' }}>
            <Img src={gasless} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.gas_less_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.gas_less_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5}>
            <Img src={opensource} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.descentralized_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.descentralized_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5} alignSelf={{ lg: 'end' }}>
            <Img src={multichain} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase' mb='10px'>
                {t('home_features.multichain_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.multichain_description')}
              </Text>
            </Box>
          </Flex>
          <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5}>
            <Img src={flexibleProtocol} mt={2} />
            <Box>
              <Text fontSize={{ base: '24px', sm2: '32px' }} fontWeight='bold' textTransform='uppercase'>
                {t('home_features.flexible_title')}
              </Text>
              <Text fontSize='18px' color='#595959'>
                {t('home_features.flexible_description')}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Features
