import { Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'

const PreviewCensusCsp = () => {
  const { t } = useTranslation()
  const { form } = useProcessCreationSteps()
  const { maxCensusSize } = form

  return (
    <Flex flexDirection='column' gap={1}>
      <Text color='process_create.description'>
        {t('form.process_create.confirm.census_total_people', { count: maxCensusSize })}
      </Text>
    </Flex>
  )
}

export default PreviewCensusCsp
