import { Box } from '@chakra-ui/react'
import Banner from '~components/Home/BannerOnVote'
import Features from '~components/Home/FeaturesFeatures'
import VotingTypesBanner from '~components/Home/Voting'

const Home = () => {
  return (
    <>
      <Box
        bgImage='/assets/home-bg.png'
        bgSize='cover'
        bgRepeat='no-repeat'
        bgPosition='center'
        paddingTop='8rem'
        marginTop='-8rem'
        paddingBottom='4rem'
      >
        <Box maxW='1920px' mx='auto' pt='120px' px='40px'>
          <Banner />
          <VotingTypesBanner />
        </Box>
      </Box>
      <Box maxW='1920px' mx='auto'>
        <Features />
      </Box>
    </>
  )
}

export default Home
