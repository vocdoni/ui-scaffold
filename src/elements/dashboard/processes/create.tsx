import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import ProcessCreate from '~components/Process/Create'

const ProcessCreatePage = () => (
  <PricingModalProvider>
    <ProcessCreate />
  </PricingModalProvider>
)

export default ProcessCreatePage
