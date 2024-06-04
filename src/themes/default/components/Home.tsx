import { Box } from '@chakra-ui/react'

import Benefits from '~components/Home/Benefits'
import Clients from '~components/Home/Clients'
import ContactUs from '~components/Home/ContactUs'
import CreateProcess from '~components/Home/CreateProcess'
import Faqs from '~components/Home/Faqs'
import Process from '~components/Home/Process'
import Solutions from '~components/Home/Solutions'
import Support from '~components/Home/Support'

import Features from '~components/Home/Features'
import bg from '/assets/bg-home.png'

const Home = () => (
  <>
    <Box position='relative' bgImage={bg} backgroundSize='100%'>
      <Box position='absolute' top={0} left={0} right={0} bottom={0} backgroundColor='rgba(255, 255, 255, 0.7)'></Box>
      <Box position='relative' zIndex={10}>
        <CreateProcess />
        <Clients />
        <Benefits />
        <Features />
        <Solutions />
        <ContactUs />
        <Process />
      </Box>
    </Box>
    <Faqs />
    <Support />
  </>
)

export default Home
