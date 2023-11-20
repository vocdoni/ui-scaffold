import { Box } from '@chakra-ui/react'
import Banner from '~components/Home/Banner'
import VotingTypesBanner from '~components/Home/Voting'

const Home = () => {
  return (
    <Box>
      <Banner />
      <VotingTypesBanner />
    </Box>
  )
}
export default Home
