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
        <Image src={card.imageURL} alt={`Picture of ${card.name}`} />
      </AspectRatio>
    </CardHeader>
    <CardBody>
      <Text>{card.name}</Text>
    </CardBody>
    <CardFooter>
      <Text>
        <Text as='span'>{card.rounds}</Text> Elections
      </Text>
    </CardFooter>
  </Card>
)

export default OrganitzationCard
