import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.error(error)
  const { t } = useTranslation()

  return (
    <Box position='relative' minH='400px'>
      <Text
        fontSize={{ base: '10xl', sm: '11xl' }}
        lineHeight={0.9}
        textAlign='center'
        p={0}
        bgGradient='var(--vcd-gradient-brand)'
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
        <Text textAlign='center' fontWeight={700} fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}>
          {t('error_text')}
        </Text>
      </Flex>
    </Box>
  )
}

export default Error
