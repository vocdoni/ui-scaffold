import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'

const Benefits = () => {
  return (
    <Box as='section' bgColor='#eff1f2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '120px' }}>
        <Text
          fontSize={{ base: '25px', lg: '30px', xl: '40px' }}
          lineHeight={{ base: '30px', lg: '36px', xl: '48px' }}
          fontWeight='bold'
          textAlign='center'
          mb='10px'
        >
          Benefits
        </Text>
        <Text textAlign='center' color='gray'>
          Progressivly deploy market positioning catalysts for change and technically sound.
        </Text>
        <Text textAlign='center' mb='60px' color='gray'>
          Authoritatively with backward-compatible e-service
        </Text>
        <Flex flexWrap='wrap' justifyContent='center' maxW='1100px' mx='auto' gap={5}>
          <Card variant='benefits' bgColor='black' color='white'>
            <CardHeader>10x Cheaper</CardHeader>
            <CardBody>
              Our solution is 10x cheaper than other solutions, allowing us to offer the best price in the market and
              let everyone vote, enhancing democracy.
            </CardBody>
          </Card>
          <Card variant='benefits'>
            <CardHeader>Reduce time & effort</CardHeader>
            <CardBody>
              Rapidously embrace distinctive best practice B2B syndicate backend internal or whereas process
              improvments.
            </CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{ base: 'black', benefits1: 'white', benefits2: 'black' }}
            color={{ base: 'white', benefits1: 'black', benefits2: 'white' }}
          >
            <CardHeader>+30% Turnout</CardHeader>
            <CardBody>
              Distinctive best practice after B2B syndicate internal or whereas bleeding-edge process improvments.
            </CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{ base: 'white', benefits1: 'black', benefits2: 'white' }}
            color={{ base: 'black', benefits1: 'white', benefits2: 'black' }}
          >
            <CardHeader>Effortless Participation</CardHeader>
            <CardBody>Vote from anywhere, on any device. It's that simple.</CardBody>
          </Card>
          <Card variant='benefits' bgColor='black' color='white'>
            <CardHeader>Unmatched Security</CardHeader>
            <CardBody>Advanced cryptography keeps your vote safe and anonymous.</CardBody>
          </Card>
          <Card variant='benefits'>
            <CardHeader>Auditable & Open-source</CardHeader>
            <CardBody>
              Distinctive best practives after B2B syndicate internal or whereas bleeding-edge process improvments.
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}

export default Benefits
