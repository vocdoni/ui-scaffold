import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const RegistryEn = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={10}>
      Activity Register
    </Heading>

    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5}>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Legal
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2}>
          <ListItem>
            The legal basis for data processing is the execution of the contract referred to in article 6.1.b) GDPR.
          </ListItem>
          <ListItem>
            The legal basis for maintaining business relationships requesting the voting process is the legitimate
            interest of Aragon referred to in article 6.1.f) GDPR.
          </ListItem>
          <ListItem>
            The legal basis for maintaining business relationships requesting the voting process is the legitimate
            interest of Aragon referred to in article 6.1.f) GDPR.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Purpose of the treatment
        </Text>
        <UnorderedList>
          <ListItem>
            The due provision of electronic voting services, the maintenance of commercial relations, as well as the
            sending of information, assistance, and publicity.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories of interested parties
        </Text>
        <UnorderedList>
          <ListItem>Applicants for the Aragon voting service, and entities that wish to be related.</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories of personal data
        </Text>
        <UnorderedList>
          <ListItem>
            For the provision of the voting service, name and surname of the contact person, position, corporate email
            and corporate contact telephone number. To attend inquiries, send advertising, and process a registration in
            the newsletters, users must fill in the following fields: email.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories of recipients to whom the personal data was communicated or will be communicated
        </Text>
        <UnorderedList>
          <ListItem>
            In general personal data will not be communicated to third parties. In some cases, it may be necessary to
            communicate the information you have provided to third parties in order to provide you with the service you
            have requested.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Transfers of personal data to a third country or an international organization Internationa
        </Text>
        <UnorderedList>
          <ListItem>Data transfers are not foreseen.</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Deadlines for the deletion of the different categories of data
        </Text>
        <UnorderedList>
          <ListItem>
            The personal data corresponding to the provision of voting services will be kept for the minimum time
            necessary for the technical participation process. The personal data corresponding to the information notice
            on the start of the electoral poll online will be kept only during the day of the test.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Security Measures
        </Text>
        <UnorderedList>
          <ListItem>
            Themeasures implemented are described in the documents that make up the Aragon Security Policy documentation
            in relation to the specific service.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Responsible entity
        </Text>
        <UnorderedList>
          <ListItem>XXXX</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  </>
)

export default RegistryEn
