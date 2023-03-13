import { Box, Spinner, Text } from '@chakra-ui/react'
import { ReactNode, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <Box
      w='full'
      display='flex'
      justifyContent='center'
      height='100vh'
      alignItems='center'
    >
      <Spinner size='sm' mr={3} />
      <Text>{t('loading')}</Text>
    </Box>
  )
}

export const SuspenseLoader = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
)
