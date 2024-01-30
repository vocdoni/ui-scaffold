import { useProcessCreationSteps } from '../Steps/use-steps'
import PreviewCensusCspGithub from './CensusCspGithub'
import PreviewCensusCspGoogle from './CensusCspGoogle'
import PreviewCensusSpreadsheet from './CensusSpreadsheet'
import PreviewCensusToken from './CensusToken'
import PreviewCensusWeb3 from './CensusWeb3'

const Census = () => {
  const {
    form: { censusType },
  } = useProcessCreationSteps()

  if (censusType === 'token') return <PreviewCensusToken />
  if (censusType === 'spreadsheet') return <PreviewCensusSpreadsheet />
  if (censusType === 'csp_google') return <PreviewCensusCspGoogle />
  if (censusType === 'csp_github') return <PreviewCensusCspGithub />

  return <PreviewCensusWeb3 />
}

export default Census
