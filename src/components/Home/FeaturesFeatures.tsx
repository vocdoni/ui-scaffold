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
    <Box mb={44} position='relative'>
      <Box
        position='relative'
        maxW='640px'
        mx='auto'
        px={{
          base: 10,
          sm: 14,
        }}
        pb={22}
        height='300px'
      >
        <Trans
          i18nKey='home_features.title'
          components={{
            p1: <Text textAlign='center' fontFamily='pixeloidsans' textTransform='uppercase' fontSize='24px' />,
            p2: <Text textAlign='center' fontWeight='bold' fontSize='xl5' />,
          }}
        />
      </Box>
      <Flex
        alignItems={{ base: 'center', lg: 'start' }}
        flexDirection='column'
        gap={{ base: 8, lg: 0 }}
        px={{
          base: 10,
          sm: 14,
        }}
        position='relative'
      >
        <Flex maxW={{ lg: '50%' }} alignItems='start' gap={5}>
          <Img src={anonymouse} mt={2} />
          <Box>
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase' mb='10px'>
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
            <Text fontSize='32px' fontWeight='bold' textTransform='uppercase'>
              {t('home_features.flexible_title')}
            </Text>
            <Text fontSize='18px' color='#595959'>
              {t('home_features.flexible_description')}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Features
