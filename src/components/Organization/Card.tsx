import { AspectRatio, Box, Card, CardBody, CardFooter, CardHeader, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface CardOrgContents {
  name: string
  rounds: string
  imageURL: string
}

export interface CardProps {
  card: CardOrgContents
}

const OrganizationCard = ({ card }: CardProps) => (
  <Card variant='lite'>
    <CardHeader>
      <OrganizationLiteHeading card={card} />
    </CardHeader>
    <CardBody>
      <OrganizationLiteBody card={card} />
    </CardBody>
    <CardFooter>
      <OrganizationCardFooter card={card} />
    </CardFooter>
  </Card>
)

export default OrganizationCard

const OrganizationLiteHeading = ({ card }: { card: CardOrgContents }) => {
  const { t } = useTranslation()

  return (
    <AspectRatio ratio={3}>
      <Image src={card.imageURL} alt={t('alt_image', { img: card.name }).toString()} />
    </AspectRatio>
  )
}

const OrganizationLiteBody = ({ card }: { card: CardOrgContents }) => {
  const { t } = useTranslation()

  return (
    <>
      <Text>{t('organization.dao_title')}</Text>
      <Text>{card.name}</Text>
    </>
  )
}

const OrganizationCardFooter = ({ card }: { card: CardOrgContents }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box>
        <Text>{t('organization.elections')}</Text>
        <Text>{card.rounds}</Text>
      </Box>
    </>
  )
}
