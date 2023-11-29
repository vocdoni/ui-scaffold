import { Box, Card, Flex, Icon, Text } from '@chakra-ui/react'
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
        maxW={{ md: '900px' }}
        mx='auto'
        fontSize='sm'
        pb='100px'
      >
        <Card variant='types-voting'>
          <Box>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.anonymous_title')}</Text>
          </Box>
          <Text>{t('banner_voting_types.anonymous_description')}</Text>
        </Card>
        <Card variant='types-voting'>
          <Box>
            <Icon as={BsStars} />
            <Text>{t('banner_voting_types.token_title')}</Text>
          </Box>
          <Text> {t('banner_voting_types.token_description')}</Text>
        </Card>
        <Card variant='types-voting'>
          <Box>
            <Icon as={TbDiscountCheckFilled} />
            <Text>{t('banner_voting_types.flexible_title')}</Text>
          </Box>
          <Text>{t('banner_voting_types.flexible_description')}</Text>
        </Card>
      </Flex>
    </>
  )
}
export default VotingTypesBanner
