import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Select, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from '../WrapperFormSection'
import Address from './Address'

const CreateProcessAddresses = () => {
  const { getValues, setValue } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  })
  const { t } = useTranslation()

  const options = getValues('census3').map((add: any, id: number) => (
    <option key={id} value={add.id}>
      {add.name}
    </option>
  ))

  const handleTabsChange = (index: number) => {
    if (index === 1) {
      //census3
      setValue('optCensus3', true)
      return
    }
    setValue('optCensus3', false)
  }

  return (
    <WrapperFormSection>
      <Tabs isLazy onChange={handleTabsChange}>
        <TabList>
          <Tab>Addresses</Tab>
          <Tab>Census3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <Select placeholder='Select option' onChange={(e) => setValue('selectedCensus3', e.target.value)}>
              {options}
            </Select>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </WrapperFormSection>
  )
}

export default CreateProcessAddresses
