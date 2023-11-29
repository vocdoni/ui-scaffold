import { Box } from '@chakra-ui/react'
import Banner from '~components/Home/BannerOnVote'
import Features from '~components/Home/FeaturesFeatures'
import VotingTypesBanner from '~components/Home/Voting'

const Home = () => {
  // return (
  //   <>
  //     <Box bgImage='/assets/home-bg.png' bgSize='cover' bgRepeat='no-repeat' bgPosition='center'>
  //       <Box maxW='1920px' mx='auto' pt='120px' px='40px'>
  //         <Banner />
  //         <VotingTypesBanner />
  //       </Box>
  //     </Box>
  //     <Box maxW='1920px' mx='auto'>
  //       <Features />
  //     </Box>
  //   </>
  // )
  return (
    <>
      <Box
        // minH='95vh'
        // bgImage='linear-gradient(to bottom,var(--backgroundprimary),rgba(242,242,242,0) 25%,rgba(242,242,242,0) 80%,#f2f2f2),url(/assets/home-bg.png)'
        // backgroundPosition='0 0,50%'
        // backgroundSize='auto, cover'
        // paddingTop='8rem'
        // paddingBottom='4rem'
        bgImage='/assets/home-bg.png'
        bgSize='cover'
        bgRepeat='no-repeat'
        bgPosition='center'
        minH='100vh'
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
