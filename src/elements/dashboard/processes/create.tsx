import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import Steps from '~components/ProcessCreate/Steps'

const ProcessCreate = () => (
  <PricingModalProvider>
    <Steps />
  </PricingModalProvider>
)

export default ProcessCreate
