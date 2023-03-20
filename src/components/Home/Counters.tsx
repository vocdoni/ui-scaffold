import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Counters = () => {
  const { t } = useTranslation()
  return (
    <HStack gap={6}>
      <Box>
        <Text
          textAlign='center'
          fontSize='1.8em'
          fontWeight='bold'
          color='branding.purple2'
        >
          147K+
        </Text>
        <Text fontSize='.8em' textAlign='center'>
          {t('voting_elections')}
        </Text>
      </Box>
      <Box>
        <Text
          textAlign='center'
          fontSize='1.8em'
          fontWeight='bold'
          color='branding.purple3'
        >
          3K+
        </Text>
        <Text fontSize='.8em' textAlign='center'>
          {t('submited_votes')}
        </Text>
      </Box>
    </HStack>
  )
}
export default Counters
