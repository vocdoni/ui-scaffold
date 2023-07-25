import { useProcessCreationSteps } from '../Steps/use-steps'
import PreviewCensusSpreadsheet from './CensusSpreadsheet'
import PreviewCensusToken from './CensusToken'
import PreviewCensusWeb3 from './CensusWeb3'

const Census = () => {
  const {
    form: { censusType },
  } = useProcessCreationSteps()

  if (censusType === 'token') return <PreviewCensusToken />
  if (censusType === 'spreadsheet') return <PreviewCensusSpreadsheet />

  return <PreviewCensusWeb3 />
}

export default Census
