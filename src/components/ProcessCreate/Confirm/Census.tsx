import { useProcessCreationSteps } from '../Steps/use-steps'
import TokenConfirm from './Token'
import Web3Confirm from './Web3'

const Census = () => {
  const { form } = useProcessCreationSteps()
  const { censusType } = form

  if (censusType === 'token') return <TokenConfirm />

  return <Web3Confirm />
}

export default Census
