import { Box, Button } from '@chakra-ui/react'
import { ArrowLeft } from '@untitled-ui/icons-react'
import Markdown from 'react-markdown'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~routes'

const UseCase = ({ markdownContent }): any => {
  return (
    <Box>
      <Button
        as={ReactRouterLink}
        to={Routes.usecases}
        aria-label='go back'
        leftIcon={<ArrowLeft />}
        mb={6}
        variant={'link'}
        textDecoration={'none'}
        _hover={{ textDecoration: 'underline' }}
      >
        Use Cases
      </Button>
      <Box className='md-sizes'>
        <Markdown>{markdownContent}</Markdown>
      </Box>
    </Box>
  )
}

export default UseCase
