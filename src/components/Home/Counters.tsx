import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Counters = () => {
  const { t } = useTranslation()
  return (
    <HStack gap={{ base: 7, sm: 14, md: 32 }}>
      <Box>
        <Text color='brand.color' textAlign='center' whiteSpace='nowrap'>
          {t('voting_elections')}
        </Text>
        <Text textAlign='center' fontSize={20} fontWeight='bold'>
          147K+
        </Text>
      </Box>
      <Box>
        <Text color='brand.color' textAlign='center' whiteSpace='nowrap'>
          {t('submited_votes')}
        </Text>
        <Text textAlign='center' fontSize={20} fontWeight='bold'>
          3K+
        </Text>
      </Box>
    </HStack>
  )
}
export default Counters
