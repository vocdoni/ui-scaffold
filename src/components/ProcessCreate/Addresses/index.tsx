import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from '../WrapperFormSection'
import AddressesForm from './Form'

const CreateProcessAddresses = () => {
  const { register, getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  })
  const { t } = useTranslation()

  return (
    <WrapperFormSection>
      <HStack justify='space-between' mb={2}>
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
      <AddressesForm
        fields={fields}
        getValues={getValues}
        register={register}
        remove={remove}
      />
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
