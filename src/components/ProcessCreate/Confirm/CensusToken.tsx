import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { TokenPreview } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusToken = () => {
  const { t } = useTranslation()
  const {
    form: { maxCensusSize, token },
  } = useProcessCreationSteps()

  const size = maxCensusSize || 0
  const max = token?.size || 0

  return (
    <Box mr={4}>
      <TokenPreview token={token} />
      <Flex flexDirection={{ base: 'column', lg: 'row' }} mt={2}>
        <Text mr={1}>{t('form.process_create.census.max_census_slider_label')}</Text>
        <Text>
          {t('form.process_create.census.max_census_slider_tooltip', {
            percent: Math.round((size / max) * 100),
            voters: Math.round(size),
          })}
        </Text>
      </Flex>
    </Box>
  )
}

export default PreviewCensusToken
