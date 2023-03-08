import {
  AspectRatio,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from '@chakra-ui/react'

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
  <Card variant='organization'>
    <CardHeader>
      <AspectRatio ratio={1}>
        <Image
          borderRadius={8}
          height='100%'
          src={card.imageURL}
          alt={`Picture of ${card.name}`}
          roundedTop='lg'
        />
      </AspectRatio>
    </CardHeader>
    <CardBody>
      <Text>{card.name}</Text>
    </CardBody>
    <CardFooter>
      <Text>
        <Text as='span' fontWeight='bold'>
          {card.funded}
        </Text>{' '}
        Funded
      </Text>
      <Text>
        <Text as='span' fontWeight='bold'>
          {card.rounds}
        </Text>{' '}
        Rounds
      </Text>
    </CardFooter>
  </Card>
)

export default OrganitzationCard
