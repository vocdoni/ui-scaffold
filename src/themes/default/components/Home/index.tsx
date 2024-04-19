import Benefits from './Benefits'
import Clients from './Clients'
import ContactUs from './ContactUs'
import CreateProcess from './CreateProcess'
import Demo from './Demo'
import Faqs from './Faqs'
import Features from './Features'
import Process from './Process'
import Solutions from './Solutions'
import Support from './Support'

const Home = () => (
  <>
    <div style={{}}>
      <img
        src='https://images.unsplash.com/photo-1708405824418-8cac836b6ee8?q=80&amp;w=2574&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        style={{
          position: 'absolute',
          opacity: 0.4,
          zIndex: -1,
          transform: 'scale(-1,1)',
          minHeight: '750vh',
          width: '100%',
          marginTop: '-1500px',
        }}
      />
      <CreateProcess />
      <Clients />
      <Benefits />
      <Features />
      <Solutions />
      <ContactUs />
    </div>
    <Process />
    <Faqs />
    <Support />
  </>
)

export default Home
