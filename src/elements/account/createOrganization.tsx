import { Box, Button, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { OrganizationCreate } from '~components/Organization/Create'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'

const CreateOrganization = () => {
  const { t } = useTranslation()
  const { setTitle, setBack: setBackBtn, setSidebar } = useOutletContext<AuthOutletContextType>()

  // Set layout title and subtitle and back button
  useEffect(() => {
    setTitle(t('create_org.title', { defaultValue: 'Create your organization' }))
    //setSidebar(CreateOrganizationSidebar)
    setBackBtn(Routes.dashboard.base)
  }, [])

  return <OrganizationCreate canSkip onSuccessRoute={Routes.dashboard.base} />
}

const CreateOrganizationSidebar = () => (
  <Flex flexGrow={1} flexDirection='column' alignItems='center' justifyContent='space-between' pt={{ xl: 10 }}>
    <Heading textAlign='center' mb={12} color='white'>
      <Trans i18nKey='create_org.header'>Try Vocdoni for free for 7 days</Trans>
    </Heading>
    <Box width='fit-content' mx='auto' mb={12} fontWeight='500'>
      <UnorderedList color='white' textAlign='start'>
        <ListItem>
          <Trans i18nKey={'create_org.full_access'}>Full access to basic features</Trans>
        </ListItem>
        <ListItem>
          <Trans i18nKey={'create_org.unlimited_voting_processes'}>Unlimited creation of voting processes</Trans>
        </ListItem>
        <ListItem>
          <Trans i18nKey={'create_org.multiple_administrators'}>Multiple administrators</Trans>
        </ListItem>
        <ListItem>
          <Trans i18nKey={'create_org.up_to_20_voters'}>Up to 20 voters</Trans>
        </ListItem>
        <ListItem>
          <Trans i18nKey={'create_org.support_during_trial_period'}>Support during the trial period</Trans>
        </ListItem>
      </UnorderedList>
    </Box>
    <Text textAlign='center' color='red.700' fontWeight='500' mb='48px'>
      <Trans i18nKey='create_org.credit_card'>No credit card, no automatic renewal.</Trans>
    </Text>
    <Button form='process-create-form' type='submit' mx='auto' mb={24} w='50%'>
      <Trans i18nKey='view_pricing'>View Pricing</Trans>
    </Button>
  </Flex>
)

export default CreateOrganization
