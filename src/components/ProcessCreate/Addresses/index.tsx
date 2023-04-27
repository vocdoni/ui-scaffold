import { Select } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import WrapperFormSection from '../WrapperFormSection'

const CreateProcessAddresses = () => {
  // const { fields, append, remove } = useFieldArray({
  //   name: 'addresses',
  // })
  const { getValues, setValue } = useFormContext()

  // console.log(getValues().addresses)

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
      {/* <HStack justify='space-between' mb={2}>
        <Text as='legend' fontSize='1.3em'>
          {t('form.process_create.addresses_title')}
        </Text>
        <IconButton
          ml='auto'
          size='sm'
          type='button'
          icon={<AddIcon />}
          aria-label='addresses'
          onClick={() => append({ address: '', weight: 0 })}
        />
      </HStack>
      {fields.map((_, index: number) => (
        <Address key={index} index={index} remove={remove} />
      ))}  */}
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
