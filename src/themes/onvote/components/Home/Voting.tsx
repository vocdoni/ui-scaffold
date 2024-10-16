import { Card, CardBody, CardFooter, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const VotingTypesBanner = ({ app = 'Vocdoni App' }: { app?: string }) => {
  const { t } = useTranslation()
  return (
    <Flex className='voting-type' maxW={'1250px'}>
      <Card variant='types-voting'>
        <CardBody>
          <Text>{t('banner_voting_types.anonymous_title')}</Text>
        </CardBody>
        <CardFooter>
          <Text>{t('banner_voting_types.anonymous_description', { app })}</Text>
        </CardFooter>
      </Card>
      <Card variant='types-voting'>
        <CardBody>
          <Text>{t('banner_voting_types.token_title')}</Text>
        </CardBody>
        <CardFooter>
          <Text> {t('banner_voting_types.token_description', { app })}</Text>
        </CardFooter>
      </Card>
      <Card variant='types-voting'>
        <CardBody>
          <Text>{t('banner_voting_types.flexible_title')}</Text>
        </CardBody>
        <CardFooter>
          <Text>{t('banner_voting_types.flexible_description', { app })}</Text>
        </CardFooter>
      </Card>
    </Flex>
  )
}
export default VotingTypesBanner
