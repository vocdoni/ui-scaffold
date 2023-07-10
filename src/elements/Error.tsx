import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError() as Error
  console.error(error)
  const { t } = useTranslation()

  return (
    <Box>
      <Box position='relative' minH='400px' mb={10} pt={5}>
        <Text
          fontSize={{ base: 'xl11', sm: 'xl12' }}
          lineHeight={0.9}
          textAlign='center'
          p={0}
          bgGradient='var(--vcd-gradient-primary)'
          bgClip='text'
          fontWeight='bold'
        >
          404
        </Text>
        <Flex
          position='absolute'
          margin-left='auto'
          margin-right='auto'
          left={0}
          right={0}
          zIndex={10}
          justifyContent='center'
          mx='auto'
          maxW={{ base: 84, sm: 112, lg: 160 }}
          top={20}
        >
          <Text textAlign='center' fontWeight={700} fontSize={{ base: 'xl4', sm: 'xl5', lg: 'xl7' }}>
            {t('error_text')}
          </Text>
        </Flex>
      </Box>
      <Box textAlign='center'>
        <Link>{t('error.return_to_home')}</Link>
      </Box>
    </Box>
  )
}

export default Error
