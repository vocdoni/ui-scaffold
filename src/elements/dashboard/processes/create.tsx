import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import ProcessCreate from '~components/Process/Create'
import { CensusProvider } from '~components/Process/Create/Sidebar/CensusProvider'
import { TemplateProvider } from '~components/Process/TemplateProvider'

const ProcessCreatePage = () => {
  return (
    <PricingModalProvider>
      <TemplateProvider>
        <CensusProvider>
          <ProcessCreate />
        </CensusProvider>
      </TemplateProvider>
    </PricingModalProvider>
  )
}

export default ProcessCreatePage
