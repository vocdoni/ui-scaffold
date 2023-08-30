import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const VotingTypesBanner = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='space-around'
      alignItems='center'
      gap={{ base: 10, md: 0 }}
      maxW={250}
      mx='auto'
    >
      <Box maxW={52} textAlign='center'>
        <Text fontWeight='bold' mb={3}>
          {t('banner_voting_types.anonymous_title')}
        </Text>
        <Text>{t('banner_voting_types.anonymous_description')}</Text>
      </Box>
      <Box maxW={52} textAlign='center'>
        <Text fontWeight='bold' mb={3}>
          {t('banner_voting_types.token_title')}
        </Text>
        <Text> {t('banner_voting_types.token_description')}</Text>
      </Box>
      <Box maxW={52} textAlign='center'>
        <Text fontWeight='bold' mb={3}>
          {t('banner_voting_types.flexible_title')}
        </Text>
        <Text>{t('banner_voting_types.flexible_description')}</Text>
      </Box>
    </Flex>
  )
}
export default VotingTypesBanner
