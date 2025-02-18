import { Box, Button } from '@chakra-ui/react'
import { ArrowLeft } from '@untitled-ui/icons-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import { generatePath, Link as ReactRouterLink, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Routes } from '~routes'

const UseCase = () => {
  const md = useLoaderData()
  const params = useParams()
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (i18n.language !== params.lang) {
      console.log(i18n.language, params.lang)
      navigate(generatePath(Routes.usecases.view, { lang: i18n.language, case: params.case }))
    }
  }, [i18n.language])
  return (
    <Box>
      <Button
        as={ReactRouterLink}
        to={Routes.usecases.base}
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
        <Markdown>{String(md)}</Markdown>
      </Box>
    </Box>
  )
}

export default UseCase
