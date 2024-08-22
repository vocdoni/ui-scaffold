import { Box, Button, Card, CardBody, Img, Text } from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import { areEqualHexStrings } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import empty from '/assets/empty-list-org.png'

const NoElections = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const { organization } = useOrganization()

  return (
    <Card variant='no-elections' minH='100%'>
      <CardBody>
        <Box>
          <Img src={empty} alt={t('organization.elections_list_empty.alt')} />
        </Box>
        <Box>
          {areEqualHexStrings(account?.address, organization?.address) ? (
            <>
              <Text>{t('organization.elections_list_empty.title')}</Text>
              <Text>{t('organization.elections_list_empty.description')}</Text>

              <Button as={ReactRouterLink} to='/processes/create'>
                {t('menu.create')}
              </Button>
            </>
          ) : (
            <Text textAlign='center'>{t('organization.elections_list_empty.not_owner')}</Text>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}

export default NoElections
