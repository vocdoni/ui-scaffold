import { Box } from '@chakra-ui/react'
import Benefits from './Benefits'
import Clients from './Clients'
import ContactUs from './ContactUs'
import CreateProcess from './CreateProcess'
import Faqs from './Faqs'
import Features from './Features'
import Process from './Process'
import Solutions from './Solutions'
import Support from './Support'
import Projects from './Projects'

const Home = () => (
  <>
    <Box position='relative' maxW='1600px' mx='auto'>
      <Box position='relative' zIndex={10}>
        <CreateProcess />
        <Clients />
        <Projects />
        <Benefits />
        <Features />
        <Solutions />
        <ContactUs />
        <Process />
        <Faqs />
        <Support />
      </Box>
    </Box>
  </>
)

export default Home
