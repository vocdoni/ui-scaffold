import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Banner from '~components/Home/Banner'
import VotingTypesBanner from '~components/Home/Voting'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Banner />
      <VotingTypesBanner />
      <Text fontSize={{ base: '25px', sm: '30px', md: '45px', lg: '65px' }} textAlign='center' opacity={0.1} mb={60}>
        {t('banner_voting_types.bottom_text')}
      </Text>
    </div>
  )
}
export default Home
