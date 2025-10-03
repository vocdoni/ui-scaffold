import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CreateProcess from './CreateProcess'
import bg from '/assets/bg-home.png'

const Home = () => {
  const { hash } = useLocation()

  //  handle smooth scrolling to a specific element on the page whenever the hash value changes
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 0)
    }
  }, [hash])
  return (
    <>
      <Box position='relative' bgImage={bg} backgroundSize='100%'>
        <Box position='absolute' top={0} left={0} right={0} bottom={0} backgroundColor='rgba(255, 255, 255, 0.7)'></Box>
        <Box position='relative' zIndex={10}>
          <CreateProcess />
        </Box>
      </Box>
    </>
  )
}

export default Home
