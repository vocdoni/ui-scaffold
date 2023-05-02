import { AddIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, HStack, IconButton, Select, Switch, Text } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from '../WrapperFormSection'
import Address from './Address'

const CreateProcessAddresses = () => {
  const { getValues, setValue, register } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  })

  const { t } = useTranslation()

  const options = getValues().census3.map((add: any, id: number) => (
    <option key={id} onClick={() => setValue(`selectedCensus3`, add.id)}>
      {add.name}
    </option>
  ))

  return (
    <WrapperFormSection>
      <FormControl display='flex' alignItems='center' mb={4}>
        <FormLabel htmlFor='optCensus3' mb='0'>
          Census 3
        </FormLabel>
        <Switch {...register('optCensus3')} id='optCensus3' />
      </FormControl>

      {getValues().optCensus3 ? (
        <Select>
          <option>Choose an option</option>
          {options}
        </Select>
      ) : (
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
      )}
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
