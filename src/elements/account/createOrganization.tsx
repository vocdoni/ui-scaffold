import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { OrganizationCreate } from '~components/Organization/Create'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'

const CreateOrganization = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<AuthOutletContextType>()

  // Set layout title and subtitle and back button
  useEffect(() => {
    setTitle(t('create_org.title', { defaultValue: 'Create your organization' }))
  }, [])

  return <OrganizationCreate canSkip onSuccessRoute={Routes.dashboard.base} minified />
}

export default CreateOrganization
