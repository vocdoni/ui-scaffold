import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { AccountEdit } from '~components/Account/Edit'

import { DashboardContents } from '~shared/Dashboard/Contents'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <DashboardContents>
      <AccountEdit />
    </DashboardContents>
  )
}

export default Profile
