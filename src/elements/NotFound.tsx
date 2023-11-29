import { Flex, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { idx } = window.history.state ?? false

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pt={20}
      mb={44}
      px={{
        base: 10,
        sm: 14,
      }}
    >
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
      <Text
        textAlign='center'
        maxW={{ base: 84, sm: 112, lg: 160 }}
        fontWeight='bold'
        fontSize={{ base: 'xl4', sm: 'xl5', lg: 'xl7' }}
      >
        {t('error.not_found')}
      </Text>
      <Link onClick={() => (idx ? navigate(-1) : navigate('/'))}>
        {idx ? t('error.go_back') : t('error.return_to_home')}
      </Link>
    </Flex>
  )
}

export default NotFound
