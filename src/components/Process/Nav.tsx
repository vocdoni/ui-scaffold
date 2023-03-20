import { Box, Flex, Text } from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import { useTranslation } from 'react-i18next'

const ProcessViewNav = ({
  startDate,
  endDate,
}: {
  endDate: any
  startDate: any
}) => {
  const { t } = useTranslation()
  return (
    <Flex ml='auto'>
      <Box px={4} pt={1}>
        <Text color='branding.purple'>
          {startDate > endDate
            ? t('process.date.starts')
            : startDate < endDate
            ? t('process.date.ends')
            : t('process.date.ended')}
        </Text>
        <Text>
          {formatDistance(new Date(), endDate!)}{' '}
          {new Date() > endDate && (
            <Text as='span'>{t('process.date.ago')}</Text>
          )}{' '}
        </Text>
      </Box>
    </Flex>
  )
}

export default ProcessViewNav
