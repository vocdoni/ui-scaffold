import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import GroupsBoard from '~components/Memberbase/GroupsBoard'

const Groups = () => {
  const { t } = useTranslation()

  return <GroupsBoard />
}

export default Groups
