import { Box } from '@chakra-ui/react'
import Banner from '~components/Home/Banner'
import Features from '~components/Home/Features'
import VotingTypesBanner from '~components/Home/Voting'

const Home = () => {
  return (
    <Box>
      <Banner />
      <VotingTypesBanner />
      <Features />
    </Box>
  )
}
export default Home
