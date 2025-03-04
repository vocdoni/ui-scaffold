import { Box, Button } from '@chakra-ui/react'
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
        <Button>Primary</Button>
        <Button variant={'outline'}>Outline</Button>
        <Button variant={'transparent'}>Transparent</Button>
        <Button variant={'link'}>Link</Button>
        <Button variant={'underline'}>Underline</Button>

        <CreateProcess />
        <Clients />
        <Projects />
        <Benefits />
        <Features />
        <Solutions />
        <ContactUs />
        <Process />
        <Faqs mb={{ base: '100px', lg: '160px' }} />
        <Support />
      </Box>
    </Box>
  </>
)

export default Home
