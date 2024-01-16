import { Box } from '@chakra-ui/react'
import Banner from '~components/Home/BannerOnVote'
import Features from '~components/Home/Features'
import Roadmap from '~components/Home/Roadmap'
import VotingTypesBanner from '~components/Home/Voting'
import homeBg from '/assets/home-bg.png'

const Home = () => {
  return (
    <>
      <Box
        bgImage={`linear-gradient(rgb(242, 242, 242), rgba(242, 242, 242, 0) 25%, rgba(242, 242, 242, 0) 80%, rgb(242, 242, 242)), url(${homeBg})`}
        bgSize='auto, cover'
        backgroundPosition='0 0, 50%'
        bgRepeat='no-repeat'
        bgPosition='center'
        paddingTop='8rem'
        paddingBottom='4rem'
      >
        <Box pt={{ lg: '120px' }} px='40px'>
          <Banner />
          <VotingTypesBanner />
        </Box>
      </Box>
      <Box>
        <Roadmap />
        <Features />
      </Box>
    </>
  )
}

export default Home
