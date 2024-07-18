import { Box, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'

const Privacy = () => (
  <Flex
    flexDirection='column'
    gap={5}
    width='full'
    mx='auto'
    maxW='1100px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
    mt={6}
  >
    <Box mb={5}>
      <Heading as='h1' size='xl' mb={3}>
        Privacy Policy
      </Heading>
      <Text>
        This document outlines the privacy practices for Vocdoni Association ("Vocdoni") concerning the use of its
        websites and services.
      </Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        1. Information Collection
      </Heading>
      <List spacing={2}>
        <ListItem>
          <Text>
            <strong>1.1</strong> Vocdoni may collect user personal data such as name, organization name, size, type and
            email addresses when provided as the organization's contact email, though using personal email addresses for
            this purpose is not recommended.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            <strong>1.2</strong> User consent may be required for the use of certain personal data, which can be
            withdrawn at any time using Vocdoni's contact details provided below.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            <strong>1.3</strong> Additional personal information may be collected and processed as necessary to deliver
            services, fulfill contractual obligations, or comply with legal requirements.
          </Text>
        </ListItem>
      </List>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        2. Method of Collection
      </Heading>
      <Text>
        Vocdoni processes personal information provided directly by users through various means, including registration
        on any Vocdoni website, service procurement, or communications.
      </Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        3. Use of Information
      </Heading>
      <Text>
        The collected information is used to provide and manage services, conduct marketing and business activities, and
        support customer service and marketing efforts.
      </Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        4. Information Sharing
      </Heading>
      <Text>
        Vocdoni may share personal information with other companies within the Vocdoni Association or third-party
        service providers assisting with our services.
      </Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        5. Information Security
      </Heading>
      <Text>Vocdoni commits to securing collected personal information with appropriate measures.</Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        6. Rights of Users
      </Heading>
      <Text>
        Users have rights to access, correct, delete, and restrict the processing of their data, among other rights
        outlined herein.
      </Text>
    </Box>

    <Box mb={5}>
      <Heading as='h2' size='lg' mb={2}>
        7. Contacting Vocdoni
      </Heading>
      <Text>
        For further details on our data practices or to exercise your rights, please contact us at{' '}
        <Link href='mailto:privacy@vocdoni.org' color='teal.500'>
          privacy@vocdoni.org
        </Link>
        .
      </Text>
    </Box>
  </Flex>
)

export default Privacy
