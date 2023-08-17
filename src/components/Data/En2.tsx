import { Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const Data2En = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={5}>
      Data Protection Secondary Information Layer
    </Heading>
    <Text as='h2' fontWeight='bold' fontSize='xl2' textAlign='center' mb={10}>
      Responsible for the treatment
    </Text>
    <Text mb={2}>
      The personal data that could be collected directly from the interested party will be treated confidentially and
      will be incorporated into the corresponding treatment activity owned by Aragon.
    </Text>
    <Text mb={5}>
      The updated list of the treatment activities that Aragon carries out is available at the following link to the
      Aragon activity register: <Link variant='primary'>https://vocdoni.app/registry</Link>
    </Text>
    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5} ml={0}>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Who is responsible for the processing of your data?
        </Text>
        <UnorderedList listStyleType='none' ml={0} display='flex' flexDirection='column' gap={2}>
          <ListItem>Identity: XXXX</ListItem>
          <ListItem>Registration number: XXXX</ListItem>
          <ListItem>Postal address: XXXX</ListItem>
          <ListItem>Telephone: XXXX</ListItem>
          <ListItem>Email: XXXX</ListItem>
          <ListItem>DPD Contact: XXXX</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Purpose
        </Text>
        <Text>
          The purpose of data processing corresponds to each of the processing activities carried out by Aragon,
          accessible in the corresponding record of processing activities referred to in the link indicated in the
          preceding paragraph.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Legitimation
        </Text>
        <Text>The processing of your data is carried out for the fulfillment of legal obligations by Aragon.</Text>
        <Text>
          The specific legitimacy for the treatment of your data is the due provision and execution of the voting
          services contract, by which you accept the general conditions of said service. Where appropriate, the sending
          of advertising or promotional communications of products and services as an applicant for the voting process
          is based on the legitimate interest of Aragon. The sending of information, advertising, subscription to the
          newsletter and assistance to entities other than the applicants is legitimized by your consent.
        </Text>
        <Text>
          You can consult the legal basis for each of the processing activities carried out by Aragon in the link to the
          Aragon activity register indicated previously.You can consult the legal basis for each of the processing
          activities carried out by Aragon in the link to the Aragon activity register indicated previously.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Data Retention
        </Text>
        <Text>
          The personal data corresponding to the provision of the service will be kept as long as the contractual
          relationship is in force.
        </Text>
        <Text>
          The personal data corresponding to the rest of the services will be kept for the time necessary to fulfill the
          purpose for which they are collected and to determine the possible responsibilities that may arise from the
          purpose, in addition to the periods that result from the exercise of the corresponding claim actions in the
          administrative and judicial channels. In all cases, once the service is finished, Aragon will keep your
          personal data blocked during the legal prescription periods. After these prescription periods have elapsed,
          your data will be destroyed.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Data communication
        </Text>
        <Text>
          In general, personal data will not be communicated to third parties. In some cases, it may be necessary to
          communicate the information you have provided to third parties in order to provide you with the service you
          have requested.
        </Text>
        <Text>
          You can check the recipients for each of the processing activities carried out by Aragon in the link to the
          Aragon activity register.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Rights of the interested parties
        </Text>
        <Text>
          Anyone has the right to obtain confirmation about the processing of their data that is carried out by Aragon.
        </Text>
        <Text>
          You can exercise your rights of access, rectification, deletion and portability of your data, of limitation
          and opposition to its treatment, as well as not to be the subject of decisions based solely on the automated
          processing of your data, when appropriate, before Aragon, Bahnhofstrasse 20, 6300 Zug, Switzerland, or at the
          email address privacy@aragon.org
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          What information is required?
        </Text>
        <Text>
          The data that are requested from the interested parties are strictly those necessary for the subscription of
          the contract, and the provision of the service. Failure to communicate the data would imply the impossibility
          of providing the service.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Security
        </Text>
        <Text>
          The Measures implemented are described in the documents that make up the Aragon Security Policy documentation
          in relation to the specific service.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Are automated decisions made?
        </Text>
        <Text>Aragon does not make automated decisions, not even profiling.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Are international data transfers made?
        </Text>
        <Text>Aragon does not transfer personal data to third countries to which the RGPD does not apply.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          In the event that the personal data has not been obtained directly from you
        </Text>
        <Text>The personal data is only obtained from the interested party.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Right to file a claim with the control authority:
        </Text>
        <Text>
          You have the right to file a claim with the control authority in the event that you consider some of your data
          protection rights to be violated. The control authority in Spain is the Spanish Data Protection Agency
          accessible at: <Link variant='primary'>https://www.aepd.es</Link>
        </Text>
      </ListItem>
    </UnorderedList>
  </>
)

export default Data2En
