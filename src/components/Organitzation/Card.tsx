import {
  AspectRatio,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface CardContents {
  name: string
  rounds: string
  imageURL: string
}

export interface CardProps {
  card: CardContents
}

const OrganitzationCard = ({ card }: CardProps) => {
  const { t } = useTranslation()

  const alt = t(`Image of ${card.name}`)

  return (
    <Card variant='organization'>
      <CardHeader>
        <AspectRatio ratio={1}>
          <Image src={card.imageURL} alt={alt} />
        </AspectRatio>
      </CardHeader>
      <CardBody>
        <Text>{card.name}</Text>
      </CardBody>
      <CardFooter>
        <Text>
          <Text as='span'>{card.rounds}</Text> {t('organization.elections')}
        </Text>
      </CardFooter>
    </Card>
  )
}

export default OrganitzationCard
