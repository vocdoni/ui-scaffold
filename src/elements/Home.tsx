import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Counters from '../components/Home/Counters'
import CardOrg, { CardOrgContents } from '../components/Organitzation/Card'
import ProcessCardImg, { CardPrImgContents } from '../components/Process/CardImg'
import SearchInput from '../components/Search/Input'

const CARDS_ORG: CardOrgContents[] = [
  {
    name: 'DAO1',
    rounds: '29',
    imageURL:
      'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Omnium Cultural',
    rounds: '20',
    imageURL:
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Builder',
    rounds: '8',
    imageURL:
      'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Another One',
    rounds: '7',
    imageURL:
      'https://images.pexels.com/photos/13759651/pexels-photo-13759651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'UMA',
    rounds: '34',
    imageURL:
      'https://images.pexels.com/photos/1013326/pexels-photo-1013326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'OnChainMonkey',
    rounds: '5',
    imageURL:
      'https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Meebits',
    rounds: '3',
    imageURL:
      'https://images.pexels.com/photos/6898858/pexels-photo-6898858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Anata',
    rounds: '2',
    imageURL:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2017%2F01%2FOslo-Images.jpg&f=1&nofb=1&ipt=49b18f7b744e463c3d8a331c1bcda53de4f02c92b88593007d60005252580f0d&ipo=images',
  },
  {
    name: 'DAO1',
    rounds: '29',
    imageURL:
      'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Omnium Cultural',
    rounds: '20',
    imageURL:
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Builder',
    rounds: '8',
    imageURL:
      'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Another One',
    rounds: '7',
    imageURL:
      'https://images.pexels.com/photos/13759651/pexels-photo-13759651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

const CARDS_PR: CardPrImgContents[] = [
  {
    organization: 'gekko dako',
    name: 'Der verspreiding van het christendom over Eruopa',
    voters: '240',
    votingEnds: 'xxx',
    imageURL:
      'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'wayne enterprises',
    name: 'Quelle faire? Maker Media is in Peril',
    voters: '20',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'massive dynamic',
    name: 'Builder',
    voters: '8',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'singletechno',
    name: 'Another One',
    voters: '7',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/13759651/pexels-photo-13759651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'acme corporation',
    name: 'UMA',
    voters: '34',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/1013326/pexels-photo-1013326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'cyberdine systems',
    name: 'OnChainMonkey',
    voters: '5',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'krusty krab',
    name: 'Meebits',
    voters: '3',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/6898858/pexels-photo-6898858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'bluth company',
    name: 'Anata',
    voters: '2',
    votingEnds: '',
    imageURL:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2017%2F01%2FOslo-Images.jpg&f=1&nofb=1&ipt=49b18f7b744e463c3d8a331c1bcda53de4f02c92b88593007d60005252580f0d&ipo=images',
  },
  {
    organization: 'hooli',
    name: 'DAO1',
    voters: '29',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'duff beer',
    name: 'Omnium Cultural',
    voters: '20',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'j-texon',
    name: 'Builder',
    voters: '8',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    organization: 'sterling cooper',
    name: 'Another One',
    voters: '7',
    votingEnds: '',
    imageURL:
      'https://images.pexels.com/photos/13759651/pexels-photo-13759651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box>
      <Flex direction='column' justifyContent='center' alignItems='center' gap={8} mb={8}>
        <SearchInput width={{ base: '200px', md: '350px', lg: '500px' }} placeholder='hola' />
        <Counters />
      </Flex>
      <Text textAlign='center' mb={4} fontSize={30} fontWeight='bold'>
        {t('home.active_voting')}
      </Text>
      <Grid
        mb={12}
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {CARDS_PR.map((card, index) => (
          <GridItem
            key={index}
            display='flex'
            justifyContent='center'
            alignItems='center'
            p={4}
            onClick={() => navigate(`/organization/4a081070E9D555b5D19629a6bcc8B77f4aE6d39c`)}
          >
            <ProcessCardImg card={card} />
          </GridItem>
        ))}
      </Grid>
      <Text textAlign='center' mb={4} fontSize={20} fontWeight='bold'>
        {t('home.more_active_organizations')}
      </Text>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {CARDS_ORG.map((card, index) => (
          <GridItem
            key={index}
            display='flex'
            justifyContent='center'
            alignItems='center'
            p={4}
            onClick={() => navigate(`/organization/4a081070E9D555b5D19629a6bcc8B77f4aE6d39c`)}
          >
            <CardOrg card={card} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
