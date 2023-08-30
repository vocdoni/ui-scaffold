import Banner from '@components/Home/Banner'
import VotingTypesBanner from '@components/Home/Voting'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <Banner />
      <VotingTypesBanner />
    </>
  )
}

export default Home
