import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Routes } from '~src/router/routes'

const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { idx } = window.history.state ?? false

  return (
    <Flex flexGrow={1} position={'relative'} minH={'70vh'}>
      <Text
        position={'absolute'}
        left={'50%'}
        top={'50%'}
        transform='translate(-50%, -50%)'
        fontSize={{ base: '200px', md: '350px', lg: '450px' }}
        color={'#E1E8F0'}
        _dark={{
          color: '#22262f',
        }}
      >
        404
      </Text>
      <Box position={'absolute'} left={'50%'} top={'50%'} transform='translate(-50%, -50%)'>
        <Text
          textAlign='center'
          fontWeight='bold'
          fontSize={{ base: '24px', md: '46px', lg: '60px' }}
          mb={{ base: 4, lg: 14 }}
          whiteSpace={'nowrap'}
        >
          {t('error.not_found')}
        </Text>

        <Flex gap={2} justifyContent={'center'}>
          {!idx && (
            <Button variant='outline' onClick={() => navigate(-1)}>
              {t('error.go_back')}
            </Button>
          )}
          <Button onClick={() => navigate(Routes.root)}>{t('error.return_to_home')}</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default NotFound
