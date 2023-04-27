import { Select } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import WrapperFormSection from '../WrapperFormSection'

const CreateProcessAddresses = () => {
  const { getValues, setValue } = useFormContext()

  const options = getValues().addresses.map((add: any, id: number) => (
    <option key={id} onClick={() => setValue(`selectedAddress`, add.id)}>
      {add.name}
    </option>
  ))

  return (
    <WrapperFormSection>
      <Select>
        <option>Choose an option</option>
        {options}
      </Select>
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
