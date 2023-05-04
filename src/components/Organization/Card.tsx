import { AspectRatio, Box, Card, CardBody, CardHeader, Image, Text } from '@chakra-ui/react'
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
    <Card variant='lite'>
      <CardHeader>
        <AspectRatio ratio={3}>
          <Image src={card.imageURL} alt={t('alt_image', { img: card.name }).toString()} />
        </AspectRatio>
      </CardHeader>
      <CardBody>
        <Box>
          <Text>{t('organization.dao_title')}</Text>
          <Text noOfLines={2}>{card.name}</Text>
        </Box>
        <Box>
          <Box>
            <Text>{t('organization.elections')}</Text>
            <Text>{card.rounds}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default OrganizationCard
