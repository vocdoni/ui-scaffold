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

  return (
    <Card variant='organization'>
      <CardHeader>
        <AspectRatio ratio={1}>
          <Image
            src={card.imageURL}
            alt={t('alt_image', { img: card.imageURL }).toString()}
          />
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
