import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box textAlign='center' mt={12}>
      <Text as='h2' fontSize='2em'>
        Page not found
      </Text>
      <Text>
        Go to
        <Text display='inline' ml={1} textDecoration='underline'>
          <Link to='/'>Home</Link>
        </Text>
      </Text>
    </Box>
  )
}

export default NotFound
