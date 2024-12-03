import { PricingModalProvider } from '~components/Pricing/Modals'
import Steps from '~components/ProcessCreate/Steps'

const ProcessCreate = () => (
  <PricingModalProvider>
    <Steps />
  </PricingModalProvider>
)

export default ProcessCreate
