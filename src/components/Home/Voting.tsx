import { Card, CardBody, CardHeader, Flex, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsStars } from 'react-icons/bs'
import { TbDiscountCheckFilled } from 'react-icons/tb'

const VotingTypesBanner = () => {
  const { t } = useTranslation()
  return (
    <>
      <Flex
        justifyContent='space-around'
        flexWrap='wrap'
        alignItems={{ base: 'center', md2: 'stretch' }}
        gap={{ base: 10, md2: 0 }}
        mb={32}
      >
        <Card variant='types-voting' flex={{ base: '0 0 100%', md2: '0 0 30%', xl: '0 0 25%' }}>
          <CardHeader>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.anonymous_title')}</Text>
          </CardHeader>
          <CardBody>
            <Text>{t('banner_voting_types.anonymous_description')}</Text>
          </CardBody>
        </Card>
        <Card variant='types-voting' flex={{ base: '0 0 100%', md2: '0 0 30%', xl: '0 0 25%' }}>
          <CardHeader>
            <Icon as={BsStars} />
            <Text>{t('banner_voting_types.token_title')}</Text>
          </CardHeader>
          <CardBody>
            <Text> {t('banner_voting_types.token_description')}</Text>
          </CardBody>
        </Card>
        <Card variant='types-voting' flex={{ base: '0 0 100%', md2: '0 0 30%', xl: '0 0 25%' }}>
          <CardHeader>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.flexible_title')}</Text>
          </CardHeader>
          <CardBody>
            <Text>{t('banner_voting_types.flexible_description')}</Text>
          </CardBody>
        </Card>
      </Flex>
      <Text fontSize={{ base: '25px', sm: '30px', md: '45px', lg: '65px' }} textAlign='center' opacity={0.1}>
        {t('banner_voting_types.bottom_text')}
      </Text>
    </>
  )
}
export default VotingTypesBanner
