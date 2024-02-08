import { Box, Checkbox, Flex, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

const Roadmap = () => {
  const { t } = useTranslation()
  return (
    <Box className='site-wrapper' mx='auto' py={{ lg: 64 }}>
      <Trans
        i18nKey='roadmap.title'
        components={{
          p1: (
            <Text
              textTransform='uppercase'
              fontFamily='pixeloidsans'
              fontSize='32px'
              lineHeight='39.5px'
              textAlign='center'
            />
          ),
          p2: (
            <Text
              fontWeight='bold'
              fontSize={{ base: '38px', lg: '64px' }}
              lineHeight={{ base: '47.5px', lg: '80px' }}
              textAlign='center'
              mb={{ base: 10, lg: 32 }}
            />
          ),
        }}
      />

      <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems='start' gap='80px' mx='auto' maxW='1380px'>
        <Flex flex='1 1 50%' maxW='650px' flexDirection='column' gap='40px' mx='auto'>
          <Text fontWeight='bold' fontSize='24px' textAlign={{ base: 'center', lg: 'start' }}>
            {t('roadmap.milestone1')}
          </Text>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.complex_startegies_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.complex_startegies_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.social_census_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.social_census_desciption')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.versatil_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.versatil_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.private_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.private_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.chainlink_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.chainlink_description')}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex flex='1 1 50%' maxW='650px' flexDirection='column' gap='40px' mx='auto'>
          <Text fontWeight='bold' fontSize='24px' textAlign={{ base: 'center', lg: 'start' }}>
            {t('roadmap.milestone2')}
          </Text>

          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.registry_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.registry_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.census_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.census_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.voting_title')}
              </Text>
              <Text fontSize='16px' lineHeight='20px'>
                {t('roadmap.voting_description')}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px' mb='8px'>
                {t('roadmap.rollup_title')}
              </Text>
              <Text>{t('roadmap.rollup_description')}</Text>
            </Box>
          </Flex>
          <Flex alignItems='start' gap={2}>
            <Checkbox isDisabled bgColor='white' border='1px solid gray' />
            <Box>
              <Text fontWeight='bold' fontSize='16px' lineHeight='20px'>
                {t('roadmap.execution_title')}
              </Text>
              <Text> {t('roadmap.execution_description')}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Roadmap
