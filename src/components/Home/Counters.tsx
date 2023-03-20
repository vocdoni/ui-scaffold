import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Counters = () => {
  const { t } = useTranslation()
  return (
    <HStack gap={{ base: '30px', sm: '60px', md: '120px' }}>
      <Box>
        <Text
          bgGradient='linear(to-r, #9526FC, #2ED3BF)'
          bgClip='text'
          textAlign='center'
          whiteSpace='nowrap'
        >
          {t('voting_elections')}
        </Text>
        <Text textAlign='center' fontSize='2.2em' fontWeight='bold'>
          147K+
        </Text>
      </Box>
      <Box>
        <Text
          bgGradient='linear(to-r, #9526FC, #2ED3BF)'
          bgClip='text'
          textAlign='center'
          whiteSpace='nowrap'
        >
          {t('submited_votes')}
        </Text>
        <Text textAlign='center' fontSize='2.2em' fontWeight='bold'>
          3K+
        </Text>
      </Box>
    </HStack>
  )
}
export default Counters
