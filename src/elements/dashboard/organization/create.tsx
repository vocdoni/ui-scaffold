import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { To, useOutletContext } from 'react-router-dom'
import { OrganizationCreate } from '~components/Organization/Create'

import { DashboardContents } from '~shared/Dashboard/Contents'
import { Routes } from '~src/router/routes'

const DashBoardCreateOrg = () => {
  const { t } = useTranslation()
  const [onSuccessRoute, setOnSuccessRoute] = useState<To>(Routes.dashboard.base)


  // Set layout title and subtitle and back button
  useEffect(() => {

    if (window.history.state.idx) {
      setOnSuccessRoute(-1 as unknown)
    }
  }, [])

  return (
    <DashboardContents>
      <OrganizationCreate onSuccessRoute={onSuccessRoute} />
    </DashboardContents>
  )
}

export default DashBoardCreateOrg
