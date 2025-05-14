import { Calendar, File05, Mail04, Users01 } from '@untitled-ui/icons-react'
import { AccountData, FetchElectionsParameters, VocdoniSDKClient } from '@vocdoni/sdk'
import { QueryKeys } from './keys'

type PaginatedElectionsParams = {
  page?: number
  status?: FetchElectionsParameters['status']
}

type SetupChecklistItem = {
  id: number
  label: string
  icon: any
  completed: boolean
}

export const paginatedElectionsQuery = (
  account: AccountData,
  client: VocdoniSDKClient,
  params: PaginatedElectionsParams
) => ({
  enabled: !!account?.address,
  queryKey: QueryKeys.organization.elections(account?.address, params),
  queryFn: async () =>
    client.fetchElections({
      organizationId: account?.address,
      page: params.page ? Number(params.page) - 1 : 0,
      status: params.status?.toUpperCase() as FetchElectionsParameters['status'],
    }),
})

export const useSetupChecklist = () => {
  const checklist: SetupChecklistItem[] = [
    {
      id: 1,
      label: 'Set up your organization details',
      icon: Users01,
      completed: true,
    },
    {
      id: 2,
      label: 'Upload your memberbase',
      icon: File05,
      completed: false,
    },
    {
      id: 3,
      label: 'Create your first vote',
      icon: Mail04,
      completed: false,
    },
    {
      id: 4,
      label: 'Book a free call with our experts',
      icon: Calendar,
      completed: true,
    },
  ]

  const completedCount = checklist.filter((item) => item.completed).length
  const progress = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0

  return {
    checklist,
    progress,
  }
}
