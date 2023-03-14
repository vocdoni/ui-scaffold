import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Counters from '../components/Home/Counters'
import Card, { CardContents } from '../components/Organitzation/Card'
import SearchInput from '../components/Search/Input'

const CARDS: CardContents[] = [
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
]

const Home = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box pt={6}>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={8}
      >
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <Heading as='h1' textAlign='center'>
            {t('landing.intro')}
          </Heading>
          <Button
            variant='ghost'
            color='purple'
            rightIcon={<FaLongArrowAltRight />}
          >
            {t('learn_more')}
          </Button>
        </Flex>
        <Counters />
        <SearchInput />
      </Flex>

      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <GridItem
            key={index}
            display='flex'
            justifyContent='center'
            alignItems='center'
            p={4}
            onClick={() =>
              navigate(`/organization/4a081070E9D555b5D19629a6bcc8B77f4aE6d39c`)
            }
          >
            <Card card={card} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
