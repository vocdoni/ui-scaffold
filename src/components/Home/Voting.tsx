import { Card, CardBody, CardFooter, Flex, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsStars } from 'react-icons/bs'
import { TbDiscountCheckFilled } from 'react-icons/tb'

const VotingTypesBanner = () => {
  const { t } = useTranslation()
  return (
    <>
      <Flex className='voting-type'>
        <Card variant='types-voting'>
          <CardBody>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.anonymous_title')}</Text>
          </CardBody>
          <CardFooter>
            <Text>{t('banner_voting_types.anonymous_description')}</Text>
          </CardFooter>
        </Card>
        <Card variant='types-voting'>
          <CardBody>
            <Icon as={BsStars} />
            <Text>{t('banner_voting_types.token_title')}</Text>
          </CardBody>
          <CardFooter>
            <Text> {t('banner_voting_types.token_description')}</Text>
          </CardFooter>
        </Card>
        <Card variant='types-voting'>
          <CardBody>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.flexible_title')}</Text>
          </CardBody>
          <CardFooter>
            <Text>{t('banner_voting_types.flexible_description')}</Text>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}
export default VotingTypesBanner
