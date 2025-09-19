import { Box, Button } from '@chakra-ui/react'
import { ArrowLeft } from '@untitled-ui/icons-react'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Editor from '~components/Editor'
import { Routes } from '~routes'

const UseCase = () => {
  const md = useLoaderData()
  const params = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (i18n.language !== params.lang) {
      navigate(generatePath(Routes.usecases.view, { lang: i18n.language, case: params.case }))
    }
  }, [i18n.language])

  return (
    <Box>
      <Button
        as={ReactRouterLink}
        to={Routes.usecases.base}
        aria-label={t('go_back', { defaultValue: 'go back' })}
        leftIcon={<ArrowLeft />}
        mb={6}
        variant={'link'}
        textDecoration={'none'}
        _hover={{ textDecoration: 'underline' }}
      >
        <Trans i18nKey='usecases.banner.title'>Use Cases</Trans>
      </Button>
      <Editor isDisabled defaultValue={String(md)} />
    </Box>
  )
}

export default UseCase
