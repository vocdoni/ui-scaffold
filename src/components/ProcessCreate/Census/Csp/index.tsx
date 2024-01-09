import { useFieldArray, useFormContext } from 'react-hook-form'
import GithubUserSearch from './GithubUserSearch'

export const CensusCspList = ({ ...props }) => {
  const { setValue } = useFormContext()
  const { initialUsers } = props

  const { fields, remove } = useFieldArray({
    name: 'userList',
  })

  const updatedUserSelection = (users: any) => {
    setValue('userList', users)
  }

  return (
    <GithubUserSearch onUpdateSelection={updatedUserSelection} showSelectedList={true} initialUsers={initialUsers} />
  )
}
