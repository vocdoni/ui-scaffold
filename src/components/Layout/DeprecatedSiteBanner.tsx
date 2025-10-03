import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

export function DeprecatedSiteBanner() {
  return (
    <Box w='full' mb={4}>
      <Alert status='warning' alignItems='start'>
        <AlertIcon />
        <AlertTitle mb={1}>
          <Trans i18nKey='deprecated_site.title'>This site is deprecated</Trans>
        </AlertTitle>
        <AlertDescription>
          <Trans i18nKey='deprecated_site.message'>
            The service you are visiting is obsolete. Please go to{' '}
            <Link href='https://app.vocdoni.io'>https://app.vocdoni.io</Link> to use the new service. This site may stop
            working at any time, specifically when the new DAVINCI protocol goes live.
          </Trans>
        </AlertDescription>
      </Alert>
    </Box>
  )
}
