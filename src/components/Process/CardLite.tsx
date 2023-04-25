import { AspectRatio, Box, Card, CardBody, CardHeader, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface CardPrImgContents {
  organization: string
  name: string
  votingEnds: any
  voters: string
  imageURL: string
}

export interface CardProps {
  card: CardPrImgContents
}

const ProcessCardLite = ({ card }: CardProps) => {
  const { t } = useTranslation()

  return (
    <Card variant='lite'>
      <CardHeader>
        <AspectRatio ratio={2}>
          <Image src={card.imageURL} alt={t('alt_image', { img: card.name }).toString()} />
        </AspectRatio>
      </CardHeader>
      <CardBody>
        <Box>
          <Text>{card.organization}</Text>
          <Text noOfLines={2}>{card.name}</Text>
        </Box>
        <Box>
          <Box>
            <Text>{t('process.date.ends')}</Text>
            <Text>in 6 days</Text>
          </Box>
          <Box>
            <Text>{t('process.voters')}</Text>
            <Text>{card.voters}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ProcessCardLite
