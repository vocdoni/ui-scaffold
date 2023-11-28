import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const VotingTypesBanner = () => {
  const { t } = useTranslation()
  return (
    <>
      <Flex
        justifyContent='space-around'
        flexWrap='wrap'
        alignItems={{ base: 'center', md2: 'stretch' }}
        gap={{ base: 10, md2: 0 }}
        maxW={{ md: '900px' }}
        mx='auto'
        fontSize='sm'
        pb='196px'
        minH='411px'
      >
        <Box textAlign={{ base: 'center', md2: 'start' }} w='240px'>
          <Text fontSize={22} mb={2} fontWeight='bold' fontFamily='pixeloid'>
            {t('banner_voting_types.anonymous_title')}
          </Text>
          <Text>{t('banner_voting_types.anonymous_description')}</Text>
        </Box>
        <Box textAlign={{ base: 'center', md2: 'start' }} w='240px'>
          <Text fontSize={22} mb={2} fontWeight='bold' fontFamily='pixeloid'>
            {t('banner_voting_types.token_title')}
          </Text>
          <Text> {t('banner_voting_types.token_description')}</Text>
        </Box>
        <Box textAlign={{ base: 'center', md2: 'start' }} w='240px'>
          <Text fontSize={22} mb={2} fontWeight='bold' fontFamily='pixeloid'>
            {t('banner_voting_types.flexible_title')}
          </Text>
          <Text>{t('banner_voting_types.flexible_description')}</Text>
        </Box>
      </Flex>
    </>
  )
}
export default VotingTypesBanner
