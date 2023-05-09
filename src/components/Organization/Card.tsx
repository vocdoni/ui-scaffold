import { AspectRatio, Card, CardBody, CardFooter, CardHeader, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface CardOrgContents {
  name: string
  rounds: string
  imageURL: string
}

export interface CardProps {
  card: CardOrgContents
}

const OrganizationCard = ({ card }: CardProps) => {
  const { t } = useTranslation()

  return (
    <Card variant='organization'>
      <CardHeader>
        <AspectRatio ratio={2 / 1}>
          <Image src={card.imageURL} alt={t('alt_image', { img: card.name }).toString()} />
        </AspectRatio>
      </CardHeader>
      <CardBody>
        <Text noOfLines={2}>{card.name}</Text>
      </CardBody>
      <CardFooter>
        <Text>{t('organization.elections')}</Text>
        <Text>{card.rounds}</Text>
      </CardFooter>
    </Card>
  )
}

export default OrganizationCard
