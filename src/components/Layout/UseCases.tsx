import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdArrowOutward } from 'react-icons/md'
import { Routes } from '~src/router/routes'
import Wrapper from './Wrapper'
import cityCouncilImg from '/assets/city_council.png'
import coopsImg from '/assets/coop.png'
import organizationsImg from '/assets/org.png'
import politicalPartyImg from '/assets/political_party.png'
import sportClubsImg from '/assets/sport_club.png'
import web3Img from '/assets/web3.png'

type UseCasesItem = {
  category: string
  label: string
  description: string
  url: string
  route: string
}

const UseCases = () => {
  const { t } = useTranslation()

  const useCasesItems = useCases()

  return (
    <Wrapper>
      <Flex flexDirection={'column'} gap={4} mb={20}>
        <Text textAlign={'center'}>Use cases</Text>
        <Text textAlign={'center'}>Our success stories</Text>
        <Text mx={'auto'} textAlign={'center'} maxW={'600px'}>
          {t('use_cases.description', {
            defaultValue:
              'Vocdoni helped a wide range of organizations and institutions improve their participatory processes, voting and elections with our cutting-edge software. Know more about our success stories and understand how we can help you we adapt to all verticals.',
          })}
        </Text>
      </Flex>
      <Grid
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={6}
        mb={20}
      >
        {useCasesItems.map((item, index) => (
          <GridItem key={index}>
            <Card variant={'use-cases'}>
              <CardHeader>
                <Image src={item.url} />
                <Text as={'span'}>{item.category}</Text>
                <Flex>
                  <Text as={'span'}>{item.label}</Text>
                  <MdArrowOutward size='25px' />
                </Flex>
              </CardHeader>
              <CardBody>{item.description}</CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
      <Box py={32} border='1px solid gray'>
        <Text textAlign={'center'} mb={4}>
          {t('use_cases.start_now', { defaultValue: 'Start your free trial' })}
        </Text>
        <Text textAlign={'center'} mb={6}>
          {t('use_cases.start_now_description', {
            defaultValue: 'Join our network of +500 organizations using ur secure voting platform.',
          })}
        </Text>
        <Flex justifyContent={'center'} gap={4}>
          <Button>
            {t('chat_to_sales', {
              defaultValue: 'Chat to sales',
            })}
          </Button>
          <Button>
            {t('try_it_for_free', {
              defaultValue: 'Try it for free!',
            })}
          </Button>
        </Flex>
      </Box>
    </Wrapper>
  )
}

export const useCases = (): UseCasesItem[] => {
  const { t } = useTranslation()

  return [
    {
      category: t('use_cases.insitutions_tab', { defaultValue: 'Institutions and Public Sector' }),
      label: t('use_cases.insitutions_label', { defaultValue: 'City Councils' }),
      description: t('use_cases.insitutions_description', {
        defaultValue: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      }),
      url: cityCouncilImg,
      route: Routes.useCases.cityCouncils,
    },
    {
      category: t('use_cases.cooperatives_tab', { defaultValue: 'Professional Colleges' }),
      label: t('use_cases.cooperatives_label', { defaultValue: 'Organizations' }),
      description: t('use_cases.cooperatives_description', {
        defaultValue:
          "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      }),
      url: organizationsImg,
      route: Routes.useCases.organizations,
    },
    {
      category: t('use_cases.organizations_tab', { defaultValue: 'Software Engineering' }),
      label: t('use_cases.organizations_label', { defaultValue: 'Political Parties' }),
      description: t('use_cases.organizations_description', {
        defaultValue:
          'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      }),
      url: politicalPartyImg,
      route: Routes.useCases.politicalParties,
    },
    {
      category: t('use_cases.sports_and_recreations_tab', { defaultValue: 'Product' }),
      label: t('use_cases.sports_and_recreations_label', { defaultValue: 'Co-ops' }),
      description: t('use_cases.sports_and_recreations_description', {
        defaultValue: 'Mental models are simple expressions of complex processes or relationships.',
      }),
      url: coopsImg,
      route: Routes.useCases.coOps,
    },
    {
      category: t('use_cases.community_groups_tab', { defaultValue: 'Design' }),
      label: t('use_cases.community_groups_label', { defaultValue: 'Web3' }),
      description: t('use_cases.community_groups_description', {
        defaultValue: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
      }),
      url: web3Img,
      route: Routes.useCases.web3,
    },
    {
      category: t('use_cases.community_groups_tab', { defaultValue: 'Software Engineering' }),
      label: t('use_cases.community_groups_label', { defaultValue: 'Sport Clubs' }),
      description: t('use_cases.community_groups_description', {
        defaultValue: 'Javascript frameworks make development easy with extensive features and functionalities.',
      }),
      url: sportClubsImg,
      route: Routes.useCases.sportClubs,
    },
  ]
}

export default UseCases
