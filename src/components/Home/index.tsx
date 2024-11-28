import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'
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
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
      </Alert>
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
