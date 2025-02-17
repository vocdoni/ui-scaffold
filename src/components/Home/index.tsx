import { Box } from '@chakra-ui/react'
import Benefits from './Benefits'
import Clients from './Clients'
import ContactUs from './ContactUs'
import CreateProcess from './CreateProcess'
import Faqs from './Faqs'
import Features from './Features'
import Process from './Process'
import Projects from './Projects'
import Solutions from './Solutions'
import Support from './Support'

const Home = () => (
  <>
    <Box position='relative'>
      <Box position='relative' zIndex={10}>
        <CreateProcess />
        <Clients />
        <Projects />
        <Benefits />
        <Features />
        <Solutions />
        <ContactUs />
        <Process />
        <Faqs  mb={{ base: '100px', lg: '160px' }}/>
        <Support />
      </Box>
    </Box>
  </>
)

export default Home
