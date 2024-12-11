import { EmailIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'
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
        <Box mb='50px'>
          <Button size={'sm'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px' isDisabled>
            Button CTA
          </Button>
          <Button size={'sm'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px'>
            Button CTA
          </Button>
          <Button size={'md'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px'>
            Button CTA
          </Button>
          <Button size={'lg'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px'>
            Button CTA
          </Button>
          <Button size={'xl'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px'>
            Button CTA
          </Button>
          <Button size={'xl2'} leftIcon={<EmailIcon />} rightIcon={<EmailIcon />} ml='50px'>
            Button CTA
          </Button>
        </Box>
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
