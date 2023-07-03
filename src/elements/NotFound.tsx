import { Box, Link, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as RLink } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <Box textAlign='center' mt={12}>
      <Text as='h2' fontSize='2em'>
        {t('not_found')}
      </Text>
      <Text>
        <Trans
          i18nKey='go_to_home'
          components={{
            root: <Link as={RLink} to='/' />,
          }}
        >
          Go to{' '}
          <Link as={RLink} to='/'>
            home
          </Link>
        </Trans>
      </Text>
    </Box>
  )
}

export default NotFound
