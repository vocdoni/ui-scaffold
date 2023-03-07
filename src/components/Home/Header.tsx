import { Flex, Heading, Text } from '@chakra-ui/react'
import ButtonGhost from '../Buttons/ButtonGhost'
import InputSearch from '../Forms/InputSearch'
import Counters from './Counters'

const Header = () => (
  <Flex direction='column' justifyContent='center' alignItems='center' gap={8}>
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      gap={2}
    >
      <Heading as='h1' textAlign='center'>
        Let your community vote!
      </Heading>
      <ButtonGhost>
        <Text as='span'>Learn more</Text>
      </ButtonGhost>
    </Flex>
    <Counters />
    <InputSearch />
  </Flex>
)

export default Header
