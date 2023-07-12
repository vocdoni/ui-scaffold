import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Counters = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <HStack gap={{ base: 7, sm: 14, md: 32 }} justifyContent='center' w='full' {...props}>
      <Box>
        <Text textAlign='center' whiteSpace='nowrap' fontSize={{ base: 'lg', sm: 'xl2' }}>
          {t('voting_elections')}
        </Text>
        <Text
          textAlign='center'
          background='home.counter'
          bgClip='text'
          fontWeight='bold'
          fontSize={{ base: 'xl5', md: 'xl7' }}
          lineHeight='125%'
        >
          147K+
        </Text>
      </Box>
      <Box>
        <Text textAlign='center' whiteSpace='nowrap' fontSize={{ base: 'lg', sm: 'xl2' }}>
          {t('submited_votes')}
        </Text>
        <Text
          textAlign='center'
          background='home.counter'
          bgClip='text'
          fontWeight='bold'
          fontSize={{ base: 'xl5', md: 'xl7' }}
          lineHeight='125%'
        >
          3K+
        </Text>
      </Box>
    </HStack>
  )
}
export default Counters
