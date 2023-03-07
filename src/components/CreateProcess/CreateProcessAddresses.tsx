import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import WrapperFormSection from '../Wrappers/WrapperFormSection'
import CreateProcessAddress from './CreateProcessAddress'

const CreateProcessAddresses = () => {
  const { register, getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  })

  return (
    <WrapperFormSection>
      <>
        <HStack justify='space-between' mb={2}>
          <Text as='legend' fontSize='1.3em'>
            Addresses
          </Text>
          <IconButton
            ml='auto'
            type='button'
            icon={<AddIcon />}
            aria-label='addresses'
            onClick={() => append({ address: '', weight: 0 })}
          />
        </HStack>
        <CreateProcessAddress
          fields={fields}
          getValues={getValues}
          register={register}
          remove={remove}
        />
      </>
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
