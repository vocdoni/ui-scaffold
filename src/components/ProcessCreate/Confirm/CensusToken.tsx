import { Flex, Text, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AiTwotoneQuestionCircle } from 'react-icons/ai'
import { TokenPreview } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusToken = () => {
  const { t } = useTranslation()
  const {
    form: { maxCensusSize, censusToken, chain, strategySize, accuracy, electionType },
  } = useProcessCreationSteps()

  const size = maxCensusSize || 0
  const max = strategySize || 0

  return (
    <>
      <TokenPreview token={censusToken} chainName={chain.name} strategySize={strategySize} />
      <Flex flexWrap='wrap' mt={2}>
        <Text mr={1} fontWeight='bold'>
          {t('form.process_create.census.max_census_slider_label')}
        </Text>
        <Text>
          {t('form.process_create.census.max_census_slider_tooltip', {
            percent: Math.round((size / max) * 100),
            voters: Math.round(size),
          })}
        </Text>
      </Flex>
      {electionType.anonymous && (
        <Text display='flex' alignItems='center' flexWrap='wrap' gap={1}>
          <Text as='span' fontWeight='bold'>
            {t('process_create.preview.accuracy')}
          </Text>
          {accuracy.toFixed()}%
          <Tooltip label={t('process_create.anonymous.legal_note') + t('process_create.anonymous.legal_disclaimer')}>
            <Text as='span' mb='4px'>
              <AiTwotoneQuestionCircle />
            </Text>
          </Tooltip>
        </Text>
      )}
    </>
  )
}

export default PreviewCensusToken
