import { Flex, FormLabel, Grid, Text, Tooltip } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AiTwotoneQuestionCircle } from 'react-icons/ai'
import { StampPreviewCard } from '~components/ProcessCreate/Census/Gitcoin/StampCard'
import { MaxCensusSizeSelector } from '../Census/MaxCensusSizeSelector'
import { TokenPreview } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusToken = () => {
  const { t } = useTranslation()
  const {
    form: { gitcoinGPSToken, censusType, censusToken, chain, electionType, passportScore },
  } = useProcessCreationSteps()

  const { watch } = useFormContext()

  const maxCensusSize = watch('maxCensusSize')
  const strategySize = watch('strategySize')
  const accuracy = watch('accuracy')

  const size = maxCensusSize || 0
  const max = strategySize || 0
  const acc = accuracy || 0

  let token = censusToken
  let chainName = chain.name
  if (censusType === 'gitcoin') {
    token = gitcoinGPSToken
    chainName = 'Gitcoin'
  }
  return (
    <>
      <TokenPreview token={token} chainName={chainName} strategySize={strategySize} passportScore={passportScore} />
      {censusType === 'gitcoin' && <GitcoinStampsPreview />}
      <Flex flexWrap='wrap' mt='45px'>
        <Text mr={1} fontWeight='bold'>
          {t('form.process_create.census.max_census_slider_label')}
        </Text>
        <Text>
          {t('form.process_create.census.max_census_slider_tooltip', {
            percent: Math.round((size / max) * 100),
            voters: Math.round(size),
          })}
        </Text>
        <MaxCensusSizeSelector token={censusToken || gitcoinGPSToken} strategySize={strategySize} />
      </Flex>
      {electionType.anonymous && (
        <Text display='flex' alignItems='center' flexWrap='wrap' gap={1}>
          <Text as='span' fontWeight='bold'>
            {t('process_create.preview.accuracy')}
          </Text>
          {acc.toFixed()}%
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

const GitcoinStampsPreview = () => {
  const { t } = useTranslation()
  const {
    form: { stamps, stampsUnionType, censusToken, strategySize },
  } = useProcessCreationSteps()

  const selectedStamps = Object.values(stamps).filter((stamp) => stamp.isChecked)

  if (selectedStamps.length === 0) {
    return
  }

  let description = t('form.process_create.census.gitcoin_strategy_description_OR')
  if (stampsUnionType === 'AND') {
    description = t('form.process_create.census.gitcoin_strategy_description_AND')
  }

  return (
    <>
      <Flex alignItems={'start'} justifyContent={'start'} gap={3} flexDirection={{ base: 'column', md: 'row' }}>
        <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_stamps')}</FormLabel>
        <FormLabel fontWeight='bold'>{stampsUnionType}</FormLabel>

        <Text fontSize='sm' color='process_create.description' flex={1} textAlign={'left'}>
          {description}
        </Text>
      </Flex>

      <Grid
        gap={5}
        templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' }}
        justifyContent='space-between'
        mt={4}
        mb={4}
      >
        {Object.values(selectedStamps).map((token, i) => (
          <StampPreviewCard key={i} name={token.name} iconURI={token.iconURI} />
        ))}
      </Grid>
      <MaxCensusSizeSelector token={censusToken} strategySize={strategySize} />
    </>
  )
}

export default PreviewCensusToken
