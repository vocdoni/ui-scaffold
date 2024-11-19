import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Box, Button, Flex, Grid, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import bloock from '/assets/bloock.png'
import coec from '/assets/coec.png'
import decidim from '/assets/decidim.png'
import erc from '/assets/erc.svg'
import omnium from '/assets/omnium.png'
import ticanoia from '/assets/ticanoia.png'
import { OrganizationCreate } from '~components/Organization/Create'

const CreateOrganization = () => {
  const { t } = useTranslation()
  const { setTitle, setBackRoute, setSidebar } = useOutletContext<AuthOutletContextType>()

  console.log('window.history.state.idx', window.history.state.idx)
  // Set layout title and subtitle
  useEffect(() => {
    setTitle(t('create_org.title', { defaultValue: 'Create your organization' }))
    setSidebar(CreateOrganizationSidebar)
    if (window.history.state.idx) {
      setBackRoute(-1)
    }
  }, [])

  return <OrganizationCreate />
}

const CreateOrganizationSidebar = () => (
  <>
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
    <Flex>
      <Button form='process-create-form' type='submit' mx='auto' mb='32px' w='50%'>
        <Trans i18nKey='view_pricing'>View Pricing</Trans>
      </Button>
    </Flex>

    <Flex flexGrow={1} flexDirection='column' alignItems='start' justifyContent='space-between' py='24px'>
      <Box>
        <Text textAlign='center' mb='12px' color='white'>
          <Trans i18nKey='trust_on_us'>Trust on us</Trans>
        </Text>
        <Grid
          as='section'
          maxW='fit-content'
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent='center'
          gridTemplateColumns='repeat(5, 1fr)'
          gridRowGap='50px'
          borderRadius='xl'
          filter='grayscale(100%)'
          py='10px'
          pr='30px'
          mb={{ base: '50px', xl: 0 }}
        >
          <Flex alignItems='center' ml='30px'>
            <Image src={barca} h={'55px'} />
          </Flex>
          <Flex alignItems='center' justifyContent='center'>
            <Image src={omnium} h={'60px'} />
          </Flex>
          <Flex alignItems='center' justifyContent='center'>
            <Image src={berga} h={'50px'} />
          </Flex>
          <Flex alignItems='center' justifyContent='center'>
            <Image src={bisbal} h={'45px'} />
          </Flex>
          <Flex alignItems='center'>
            <Image src={coec} h={'40px'} />
          </Flex>
          <Flex alignItems='center' ml='30px'>
            <Image src={erc} h={'35px'} />
          </Flex>
          <Flex alignItems='center' pl='10px' justifyContent='center'>
            <Image src={bellpuig} h={'50px'} />
          </Flex>
          <Flex alignItems='center' justifyContent='center'>
            <Image src={ticanoia} h={'30px'} />
          </Flex>
          <Flex alignItems='center' justifyContent='center'>
            <Image src={decidim} h={'40px'} />
          </Flex>
          <Flex alignItems='center'>
            <Image src={bloock} h={'30px'} />
          </Flex>
        </Grid>
      </Box>
    </Flex>
  </>
)
export default CreateOrganization
