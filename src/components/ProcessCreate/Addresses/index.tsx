import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Address from './Address'

const CreateProcessAddresses = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  })
  const { t } = useTranslation()

  return (
    <>
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
      {fields.map((_, index: number) => (
        <Address key={index} index={index} remove={remove} />
      ))}
    </>
  )
}

export default CreateProcessAddresses
