import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import ProcessCreate from '~components/Process/Create'
import { TemplateProvider } from '~components/Process/Create/TemplateProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const ProcessCreatePage = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  useEffect(() => {
    setBreadcrumb([
      {
        title: t('create_process', { defaultValue: 'Create process' }),
      },
    ])
  }, [setBreadcrumb])

  return (
    <PricingModalProvider>
      <TemplateProvider>
        <ProcessCreate />
      </TemplateProvider>
    </PricingModalProvider>
  )
}

export default ProcessCreatePage
