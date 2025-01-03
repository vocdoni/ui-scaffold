import { Badge, Box } from '@chakra-ui/react'
import Benefits from './Benefits'
import Clients from './Clients'
import ContactUs from './ContactUs'
import CreateProcess from './CreateProcess'
import Faqs from './Faqs'
import Features from './Features'
import Process from './Process'
import Solutions from './Solutions'
import Support from './Support'

const Home = () => (
  <>
    <Box position='relative'>
      <Box position='relative' zIndex={10}>
        <Badge>HELLO</Badge>
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
