import { Flex, ListItem, Text, UnorderedList, useBreakpointValue } from '@chakra-ui/react'
import { addressTextOverflow, CensusPreviewRowsLimit } from '@constants'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusWeb3 = () => {
  const { t } = useTranslation()
  const { form } = useProcessCreationSteps()
  const { addresses } = form
  const value = useBreakpointValue({
    base: 12,
    sm: null,
  })
  const data = useMemo(
    () => (addresses.length > CensusPreviewRowsLimit ? addresses.slice(0, CensusPreviewRowsLimit) : addresses),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addresses]
  )
  console.log('addresses:', addresses)

  return (
    <Flex flexDirection='column' gap={1}>
      <UnorderedList>
        {data.map((address, index) => (
          <ListItem key={index} mb={1}>
            {addressTextOverflow((address as any).address, value)}
          </ListItem>
        ))}
      </UnorderedList>
      <Text color='process_create.preview.census_web3_text_helper'>
        {t('form.process_create.confirm.census_total_people', { count: addresses.length })}
      </Text>
      {data.length !== addresses.length && (
        <Text
          color='process_create.preview.census_web3_text_helper'
          children={t('form.process_create.confirm.census_preview_is_shortened', {
            limit: CensusPreviewRowsLimit,
          })}
        />
      )}
    </Flex>
  )
}

export default PreviewCensusWeb3
