import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'

export interface CardContents {
  name: string
  funded: string
  rounds: string
  imageURL: string
}

export interface CardProps {
  card: CardContents
}

const OrganitzationCard = ({ card }: CardProps) => (
  <Box
    width='200px'
    height='250px'
    borderWidth='1px'
    borderRadius={8}
    position='relative'
    p={2}
    cursor='pointer'
  >
    <Box height='170px' overflow='hidden'>
      <Image
        borderRadius={8}
        height='100%'
        src={card.imageURL}
        alt={`Picture of ${card.name}`}
        roundedTop='lg'
      />
    </Box>
    <Flex
      height='60px'
      pt={2}
      direction='column'
      justifyContent='space-between'
    >
      <Text fontSize='.9em' fontWeight='bold'>
        {card.name}
      </Text>
      <HStack justifyContent='space-between'>
        <Text fontSize='.7em'>
          <Text as='span' fontWeight='bold'>
            {card.funded}
          </Text>{' '}
          Funded
        </Text>
        <Text fontSize='.7em'>
          <Text as='span' fontWeight='bold'>
            {card.rounds}
          </Text>{' '}
          Rounds
        </Text>
      </HStack>
    </Flex>
  </Box>
)

export default OrganitzationCard
