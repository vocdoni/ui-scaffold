import { Box, Button, Flex, Grid, Heading, Image, Link, List, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { AccountCreate } from '~src/themes/saas/components/Account/Create'
import DarkModeToggle from '~src/themes/saas/components/Saas/DarkMode'
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
  <>
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
      position='relative'
      display='flex'
      flexDirection='column'
      flex='1 1 50%'
      bgColor='#75AD94'
      py={{
        base: '20px',
        sm: '40px',
      }}
      px={{
        base: '10px',
        sm: '20px',
      }}
      color='white'
      borderLeftRadius='xl'
    >
      <DarkModeToggle position='absolute' ml='auto' top='10px' right='10px' />
      <Box display='flex' flexDirection='column' maxW='600px' mx='auto' flexGrow={1}>
        <Heading textAlign='center' mb='48px'>
          <Trans>Try Vocdoni for free for 7 days</Trans>
        </Heading>
        <Box width='fit-content' mx='auto' mb='48px' fontWeight='500'>
          <UnorderedList>
            <li>Full access to basic features</li>
            <li>Unlimited creation of voting processes</li>
            <li>Multiple administrators</li>
            <li>Up to 20 voters</li>
            <li>Support during the trial period</li>
          </UnorderedList>
        </Box>
        <Text textAlign='center' color='red.700' fontWeight='500' mb='48px'>
          No credit card, no automatic renewal.
        </Text>
        <Flex>
          <Button form='process-create-form' type='submit' mx='auto' mb='32px' w='50%'>
            <Trans>View Pricing</Trans>
          </Button>
        </Flex>

        <Flex flexGrow={1} flexDirection='column' alignItems='center' justifyContent='space-between' py='24px'>
          <Box>
            <Text textAlign='center' mb='12px'>
              Trust on us
            </Text>
            <Grid
              as='section'
              className='site-wrapper'
              maxW='fit-content'
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent='center'
              gridTemplateColumns='repeat(5, 1fr)'
              gridRowGap='50px'
              bgColor='white'
              borderRadius='xl'
              filter='grayscale(100%)'
              py='10px'
              px='20px'
            >
              <Flex>
                <Image src={barca} h={'50px'} />
              </Flex>
              <Image src={omnium} h={'50px'} />
              <Image src={berga} h={'50px'} />
              <Image src={bisbal} h={'50px'} />
              <Image src={coec} h={'50px'} />
              <Image src={erc} h={'30px'} />
              <Image src={bellpuig} h={'50px'} />
              <Image src={ticanoia} h={'30px'} />
              <Image src={decidim} h={'50px'} />
              <Image src={bloock} h={'50px'} />
            </Grid>
          </Box>
          <Box mb='100px'>
            <Text fontSize='50px' color='white'>
              The global voting platform
            </Text>
            <Text fontSize='19px' color='white'>
              Cut cost, Save Time: Secure, Private, and GDPR Compliant Voting
            </Text>
          </Box>
        </Flex>
        <Flex mt='auto' zIndex='3' flexDirection='column' alignItems='center' justifyContent='center'>
          <List display='flex'>
            <ListItem
              me={{
                base: '20px',
                md: '44px',
              }}
            >
              <Link fontWeight='500' href='mailto:hello@simmmple.com'>
                Support
              </Link>
            </ListItem>
            <ListItem
              me={{
                base: '20px',
                md: '44px',
              }}
            >
              <Link fontWeight='500' href='https://simmmple.com/terms-of-service'>
                Terms of Use
              </Link>
            </ListItem>
            <ListItem>
              <Link fontWeight='500' href='https://www.blog.simmmple.com/'>
                Blog
              </Link>
            </ListItem>
          </List>
        </Flex>
      </Box>
    </Box>
  </>
)

export default CreateOrganization
