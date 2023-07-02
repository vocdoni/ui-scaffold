import { Flex } from '@chakra-ui/react'
import { HR } from '@vocdoni/chakra-components'
import Advanced from './Advanced'
import Calendar from './Calendar'

const CreateProcessSettings = () => (
  <>
    <Flex flexDirection='column' gap={{ base: 5, md: 10 }}>
      <Calendar />
      <HR border='none' borderTop='1px solid lightgray' bgColor='none' />
      <Advanced />
    </Flex>
  </>
)

export default CreateProcessSettings
