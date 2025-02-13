import { Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import cityCouncils from '/assets/agm.avif'
import web3 from '/assets/budgeting.avif'
import politicalParties from '/assets/elections.avif'
import organizations from '/assets/online-survey.avif'
import sportClubs from '/assets/online-voting.avif'
import coops from '/assets/software-integration.avif'

const UseCases = () => {
  const UseCases = [
    {
      title: 'City Councils',
      eyebrow: 'Institutions ans Public sector',
      description: 'How do you create compelling presentations that wow your colleagues and impress yout managers?',
      image: cityCouncils,
    },
    {
      title: 'Organizations',
      eyebrow: 'Professional Collages',
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      image: organizations,
    },
    {
      title: 'Political Parties',
      eyebrow: 'Software Engineering',
      description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      image: politicalParties,
    },
    {
      title: 'Co-ops',
      eyebrow: 'Product',
      description: 'Mental models are simple expressions of complex processes or relationships.',
      image: coops,
    },
    {
      title: 'Web 3',
      eyebrow: 'Design',
      description: 'Introduction to Wireframing and its Principles. Lear from the best in the industry.',
      image: web3,
    },
    {
      title: 'Sport Clubs',
      eyebrow: 'Software Engineering',
      description: 'JavaScript frameworks make developlment easy with extensive features and functionalities',
      image: sportClubs,
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
      <Flex rowGap={10} columnGap={'5%'} flexWrap={'wrap'} maxW={{ xl: '85%' }} mx='auto'>
        {UseCases.map((el) => (
          <Card
            key={el.title}
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
            ></CardHeader>

            <CardBody p={0} py={6}>
              <Text pb={2}>
                <Trans>{el.eyebrow}</Trans>
              </Text>
              <Text pb={1}>
                <Trans>{el.title}</Trans>
              </Text>
              <Text>
                <Trans>{el.description}</Trans>
              </Text>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </Box>
  )
}

export default UseCases
