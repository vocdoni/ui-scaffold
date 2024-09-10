import { Box, Button, Flex, Grid, Heading, Image, Link, List, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { AccountCreate } from '~src/themes/saas/components/Account/Create'
import DarkModeToggle from '~src/themes/saas/components/DarkMode'
import Wrapper from '~src/themes/saas/components/wrapper'
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

const CreateOrganization = () => (
  <Wrapper flexDirection={{ base: 'column', lg: 'row' }} px='0' position='relative'>
    <Box
      flex='1 1 50%'
      py={{
        base: '20px',
        sm: '40px',
      }}
      px={{
        base: '10px',
        sm: '20px',
      }}
    >
      <Box maxW='600px' mx='auto'>
        <AccountCreate />
      </Box>
    </Box>
    <Box
      position={{ lg: 'relative' }}
      display='flex'
      flexDirection='column'
      flex='1 1 50%'
      py={{
        base: '20px',
        sm: '40px',
      }}
      px={{
        base: '10px',
        sm: '20px',
      }}
      color='white'
      className='brand-gradient'
      borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
    >
      <DarkModeToggle position='absolute' ml='auto' top='10px' right='10px' />
      <Box display='flex' flexDirection='column' maxW='600px' mx='auto' flexGrow={1}>
        <Heading textAlign='center' mb='48px'>
          <Trans i18nKey='create_org.header'>Try Vocdoni for free for 7 days</Trans>
        </Heading>
        <Box width='fit-content' mx='auto' mb='48px' fontWeight='500'>
          <UnorderedList>
            <ListItem>Full access to basic features</ListItem>
            <ListItem>UnListItemmited creation of voting processes</ListItem>
            <ListItem>Multiple administrators</ListItem>
            <ListItem>Up to 20 voters</ListItem>
            <ListItem>Support during the trial period</ListItem>
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
            <Text textAlign='start' mb='12px'>
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
              mb={{ base: '50px', lg: 0 }}
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
          <Flex flexDirection='column' alignItems={{ base: 'center', lg: 'start' }} mb='100px' w='full'>
            <Text fontSize={{ base: '28px', md: '48px', lg: '32px', xl: '48px' }} color='white'>
              <Trans i18nKey='create_org.title'>The global voting platform</Trans>
            </Text>
            <Text fontSize='19px' color='white' textAlign={{ base: 'center', lg: 'start' }}>
              <Trans i18nKey='create_org.subtitle'>Cut cost, Save Time: Secure, Private, and GDPR Compliant</Trans>
              Voting
            </Text>
          </Flex>
        </Flex>
        <Flex mt='auto' zIndex='3' flexDirection='column' alignItems='center' justifyContent='center'>
          <List display='flex'>
            <ListItem
              me={{
                base: '20px',
                md: '44px',
              }}
            >
              <Link fontWeight='500' href='mailto:info@vocdoni.org'>
                <Trans i18nKey='support'>Support</Trans>
              </Link>
            </ListItem>
            <ListItem
              me={{
                base: '20px',
                md: '44px',
              }}
            >
              <Link fontWeight='500' href='/terms'>
                <Trans i18nKey='terms_of_use'>Terms of Use</Trans>
              </Link>
            </ListItem>
            <ListItem>
              <Link fontWeight='500' href='https://blog.vocdoni.io/' isExternal>
                <Trans i18nKey='blog'>Blog</Trans>
              </Link>
            </ListItem>
          </List>
        </Flex>
      </Box>
    </Box>
  </Wrapper>
)

export default CreateOrganization
