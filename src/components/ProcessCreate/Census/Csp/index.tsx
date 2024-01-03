import { useFieldArray, useFormContext } from 'react-hook-form'
import GithubUserSearch from './GithubUserSearch'

export const CensusCspList = () => {
  const { setValue } = useFormContext()

  const { fields, remove } = useFieldArray({
    name: 'userList',
  })

  const updatedUserSelection = (users: any) => {
    setValue('userList', users)
  }

  return (
    <>
      <GithubUserSearch onUpdateSelection={updatedUserSelection} showSelectedList={true} />
    </>
  )
}
