import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Counters = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <HStack gap={{ base: 7, sm: 14, md: 32 }} justifyContent='center' {...props}>
      <Box>
        <Text
          textAlign='center'
          whiteSpace='nowrap'
          fontStyle='normal'
          fontWeight='400'
          fontSize={{ base: 'lg', sm: '2xl' }}
          lineHeight='100%'
        >
          {t('voting_elections')}
        </Text>
        <Text
          textAlign='center'
          bgGradient='var(--vcd-gradient-brand)'
          bgClip='text'
          fontStyle='normal'
          fontWeight='700'
          fontSize={{ base: '5xl', sm: '5xl', md: '7xl' }}
          lineHeight='125%'
        >
          147K+
        </Text>
      </Box>
      <Box>
        <Text
          textAlign='center'
          whiteSpace='nowrap'
          fontStyle='normal'
          fontWeight='400'
          fontSize={{ base: 'lg', sm: '2xl' }}
          lineHeight='100%'
        >
          {t('submited_votes')}
        </Text>
        <Text
          textAlign='center'
          bgGradient='var(--vcd-gradient-brand)'
          bgClip='text'
          fontWeight='700'
          fontSize={{ base: '5xl', sm: '5xl', md: '7xl' }}
          lineHeight='125%'
        >
          3K+
        </Text>
      </Box>
    </HStack>
  )
}
export default Counters
