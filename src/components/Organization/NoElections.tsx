import { Box, Button, Card, CardBody, Flex, Img, Text } from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import { areEqualHexStrings } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import empty from '/assets/illustrations/2.png'

const NoElections = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const { organization } = useOrganization()

  return (
    <Card variant='no-elections' minH='100%' maxW='650' m='80px auto'>
      <CardBody>
        <Flex justifyContent={'center'}>
          <Img src={empty} alt={t('organization.elections_list_empty.alt')} />
        </Flex>
        <Box>
          {areEqualHexStrings(account?.address, organization?.address) ? (
            <>
              <Text fontWeight='600' fontSize='lg' m='20px 0px'>
                {t('organization.elections_list_empty.title')}
              </Text>
              <Text>{t('organization.elections_list_empty.description')}</Text>

              <Button
                mt='40px'
                w='100%'
                variant='primary'
                as={ReactRouterLink}
                to={Routes.processes.create}
                colorScheme='gradient'
              >
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
