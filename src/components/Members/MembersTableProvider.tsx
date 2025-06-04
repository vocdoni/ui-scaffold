import { createContext, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Participant, useOrganizationParticipants } from './MembersTable'

const useMembersTableProvider = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useOrganizationParticipants()
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([])

  const [columns, setColumns] = useState([
    {
      label: t('form.participants.spreadsheet.template.firstname', { defaultValue: 'First Name' }),
      id: 'name',
      visible: true,
    },
    {
      label: t('form.participants.spreadsheet.template.lastname', { defaultValue: 'Last Name' }),
      id: 'lastname',
      visible: true,
    },
    { label: t('form.participants.spreadsheet.template.email', { defaultValue: 'Email' }), id: 'email', visible: true },
    { label: t('form.participants.spreadsheet.template.phone', { defaultValue: 'Phone' }), id: 'phone', visible: true },
    {
      label: t('form.participants.spreadsheet.template.national_id', { defaultValue: 'National ID' }),
      id: 'national_id',
      visible: true,
    },
    {
      label: t('form.participants.spreadsheet.template.member_id', { defaultValue: 'Member ID' }),
      id: 'member_id',
      visible: true,
    },
    {
      label: t('form.participants.spreadsheet.template.birth_date', { defaultValue: 'Birth Date' }),
      id: 'birth_date',
      visible: true,
    },
  ])

  const filteredParticipants = useMemo(() => {
    return data.filter((participant) =>
      Object.values(participant).some((fieldValue) =>
        String(fieldValue).toLowerCase().includes(globalFilter.toLowerCase())
      )
    )
  }, [data, globalFilter])
  const allVisibleSelected = filteredParticipants.every((participant) =>
    selectedParticipants.some((selectedParticipant) => selectedParticipant?.id === participant.id)
  )
  const someSelected = filteredParticipants.some((participant) =>
    selectedParticipants.some((selectedParticipant) => selectedParticipant?.id === participant.id)
  )

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const unique = [
        ...selectedParticipants,
        ...filteredParticipants.filter(
          (participant) =>
            !selectedParticipants.some((selectedParticipant) => selectedParticipant?.id === participant.id)
        ),
      ]
      setSelectedParticipants(unique)
    } else {
      const filteredIds = filteredParticipants.map((participant) => participant.id)
      setSelectedParticipants((prev) => prev.filter((p) => !filteredIds.includes(p.id)))
    }
  }

  const toggleOne = (participant, checked: boolean) => {
    setSelectedParticipants((prev) => (checked ? [...prev, participant] : prev.filter((p) => p?.id !== participant.id)))
  }

  return {
    participants: filteredParticipants,
    isLoading,
    globalFilter,
    setGlobalFilter,
    selectedParticipants,
    setSelectedParticipants,
    allVisibleSelected,
    someSelected,
    toggleAll,
    toggleOne,
    columns,
    setColumns,
  }
}

export const useMembersTable = () => {
  const context = useContext(MembersTableContext)
  if (!context) {
    throw new Error('useMembersTable must be used within an MembersTableProvider')
  }
  return context
}

const MembersTableContext = createContext(undefined)

export const MembersTableProvider = ({ children }) => {
  const value = useMembersTableProvider()
  return <MembersTableContext.Provider value={value}>{children}</MembersTableContext.Provider>
}
