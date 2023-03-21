import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface CardPrImgContents {
  name: string
  votingEnds: any
  voters: string
  imageURL: string
}

export interface CardProps {
  card: CardPrImgContents
}

const ProcessCardImg = ({ card }: CardProps) => {
  const { t } = useTranslation()

  return (
    <Card variant='processImg'>
      <CardHeader>
        <AspectRatio ratio={2 / 1}>
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
        <Box>
          <Text>{t('organization.elections')}</Text>
          <Text>20</Text>
        </Box>
        <Box>
          <Text>{t('organization.elections')}</Text>
          <Text>20</Text>
        </Box>
        {/* <Text>{card.rounds}</Text> */}
      </CardFooter>
    </Card>
  )
}

export default ProcessCardImg
