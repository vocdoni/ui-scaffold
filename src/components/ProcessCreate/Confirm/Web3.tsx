import { Box, Flex, ListItem, Text, UnorderedList, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { addressTextOverflow } from '../../../constants'
import { useProcessCreationSteps } from '../Steps/use-steps'

const Web3Confirm = () => {
  const { t } = useTranslation()

  const { form } = useProcessCreationSteps()
  const { addresses } = form

  const value = useBreakpointValue({
    base: 12,
    sm: null,
  })
  return (
    <Flex flexDirection='column' gap={1}>
      <Box maxH={80} overflowY='auto'>
        <UnorderedList>
          {addresses.map((address, index) => (
            <ListItem key={index} mb={1}>
              {addressTextOverflow((address as any).address, value)}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Text color='process_create.confirm.census_web3_text_helper'>
        {t('form.process_create.confirm.web3_number_addresses', { addresses: addresses.length })}
      </Text>
    </Flex>
  )
}

export default Web3Confirm
