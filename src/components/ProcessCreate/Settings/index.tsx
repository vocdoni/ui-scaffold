import { Flex } from '@chakra-ui/react'
import Advanced from './Advanced'
import Calendar from './Calendar'

const CreateProcessSettings = () => (
  <>
    <Flex flexDirection='column' gap={{ base: 10, md: 20 }}>
      <Calendar />
      <Advanced />
    </Flex>
  </>
)

export default CreateProcessSettings
