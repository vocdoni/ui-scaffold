import { Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { ArrowUpRight } from '@untitled-ui/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink, useNavigate, useParams } from 'react-router-dom'
import { Routes } from '~routes'
import cityCouncils from '/assets/agm.avif'
import web3 from '/assets/budgeting.avif'
import politicalParties from '/assets/elections.avif'
import organizations from '/assets/online-survey.avif'
import sportClubs from '/assets/online-voting.avif'
import coops from '/assets/software-integration.avif'

const UseCases = () => {
  const { i18n, t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [markdownContent, setMarkdownContent] = useState(null)
  const currentLanguage = i18n.language

  const Cases = [
    {
      title: t('usecases.city_councils.title'),
      eyebrow: t('usecases.city_councils.eyebrow'),
      description: t('usecases.city_councils.description'),
      image: cityCouncils,
      case: 'city-councils',
    },
    {
      title: t('usecases.organizations.title'),
      eyebrow: t('usecases.organizations.eyebrow'),
      description: t('usecases.organizations.description'),
      image: organizations,
      case: 'community-organizations',
    },
    {
      title: t('usecases.political_parties.title'),
      eyebrow: t('usecases.political_parties.eyebrow'),
      description: t('usecases.political_parties.description'),
      image: politicalParties,
      case: 'political-parties',
    },
    {
      title: t('usecases.coops.title'),
      eyebrow: t('usecases.coops.eyebrow'),
      description: t('usecases.coops.description'),
      image: coops,
      case: 'integrators',
    },
    {
      title: t('usecases.web3.title'),
      eyebrow: t('usecases.web3.eyebrow'),
      description: t('usecases.web3.description'),
      image: web3,
      case: 'professional-associations',
    },
    {
      title: t('usecases.sport_clubs.title'),
      eyebrow: t('usecases.sport_clubs.eyebrow'),
      description: t('usecases.sport_clubs.description'),
      image: sportClubs,
      case: 'sports-clubs',
    },
  ]

  return (
    <Box w='full'>
      <Text
        as={'h2'}
        size={'md'}
        fontWeight={'600'}
        textAlign={'center'}
        color={'usecases.subtitle'}
        _dark={{ color: 'white' }}
        mb={6}
      >
        Use cases
      </Text>
      <Heading as={'h1'} size='md' mb={6} textAlign={'center'}>
        Our success stories
      </Heading>
      <Text textAlign={'center'} maxW='700px' mx='auto' mb={20}>
        Vocdoni helped a wide range of organizations and institutions improve their participatory processes, voting and
        elections with out cutting-edge software. Know more about our success stories and understand how we can help
        you, we adapt to all verticals
      </Text>
      <Flex rowGap={14} columnGap={'5%'} flexWrap={'wrap'} maxW={{ xl: '85%' }} mx='auto'>
        {Cases.map((el) => (
          <Card
            key={el.title}
            as={ReactRouterLink}
            to={`${generatePath(Routes.usecases.view, { lang: currentLanguage, case: el.case })}`}
            flex={{ base: '0 0 100%', md: '0 0 47.5%', xl: '0 0 30%' }}
            bgColor={'transparent'}
            boxShadow={'none'}
          >
            <CardHeader
              p={0}
              h='200px'
              overflow='hidden'
              bgImage={`url(${el.image})`}
              bgSize='cover'
              bgPosition='center'
              bgRepeat='no-repeat'
              borderRadius={'lg'}
            ></CardHeader>

            <CardBody p={0} pt={2}>
              <Text
                color={'usecases.eyebrow.light'}
                _dark={{ color: 'usecases.eyebrow.dark' }}
                fontWeight={'600'}
                fontSize={'xs'}
              >
                {el.eyebrow}
              </Text>
              <Flex justifyContent={'space-between'} alignItems={'center'} pb={1}>
                <Text fontWeight={'bold'} fontSize={'lg'}>
                  {el.title}
                </Text>
                <ArrowUpRight />
              </Flex>
              <Text
                color={'usecases.description.light'}
                _dark={{ color: 'usecases.description.dark' }}
                lineHeight={1.3}
              >
                {el.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </Box>
  )
}

export default UseCases
