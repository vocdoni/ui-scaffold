import { Spinner, Square, Text } from '@chakra-ui/react'
import { ReactNode, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <Square centerContent size='full' minHeight='100vh'>
      <Spinner size='sm' mr={3} />
      <Text>{t('loading')}</Text>
    </Square>
  )
}

export const SuspenseLoader = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
)
