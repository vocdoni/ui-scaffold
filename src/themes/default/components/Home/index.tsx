import { Box } from '@chakra-ui/react'

import Benefits from '~components/Home/Benefits'
import Clients from '~components/Home/Clients'
import ContactUs from '~components/Home/ContactUs'
import CreateProcess from '~components/Home/CreateProcess'
import Faqs from '~components/Home/Faqs'
import Process from '~components/Home/Process'
import Solutions from '~components/Home/Solutions'
import Support from '~components/Home/Support'
import Features from './Features'

const Home = () => (
  <>
    <Box
      position='relative'
      bgImage='url(https://cdn.discordapp.com/attachments/1077657962404925583/1232347225472897096/image.png?ex=662b1a8a&is=6629c90a&hm=1ecf6bf6ee44c37267943092f897e102c2d1e684723c0c4f3775c550939556d2&)'
    >
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
