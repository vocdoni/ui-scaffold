import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useLoaderData, useParams } from 'react-router-dom'
import Votings from '~components/Organization/Dashboard/Votings'
import { Routes } from '~routes'

const AllProcesses = () => {
  const data = useLoaderData() as ElectionListWithPagination
  const { status } = useParams<{ status?: string }>()

  return <Votings path={Routes.dashboard.processes.all} data={data as ElectionListWithPagination} status={status} />
}

export default AllProcesses
