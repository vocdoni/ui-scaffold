import { Box, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'

const PrivacyEn = () => (
  <>
    <Heading display='flex' flexDirection='column' alignItems='center' gap={2} fontSize='xl3' mb={10}>
      Aragon<Text as='span'>Privacy Policy </Text>
    </Heading>
    <Box as='section'>
      <Text mb={2}>
        This document sets the privacy rules concerning the use of Aragon Association (the 'Aragon') sites and services,
        including:
      </Text>
      <UnorderedList mb={5}>
        <ListItem ml={4}>
          Vocdoni.app - for specification on Vocdoni.app data processing policy and terms and conditions of the service
          please visit{' '}
          <Link href='https://vocdoni.app' variant='primary'>
            https://vocdoni.app
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>

    <Box as='section'>
      <OrderedList
        display='flex'
        flexDirection='column'
        gap={5}
        sx={{
          '& > li::marker': {
            fontWeight: 'bold',
          },
        }}
      >
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            What information is collected?
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2}>
            <ListItem>Aragon may collect the following user&rsquo;s personal data:</ListItem>
            <UnorderedList>
              <ListItem>
                Email address in the case that a personal e-mail address is used as the organization&rsquo;s e-mail
                address, which is not recommended
              </ListItem>
            </UnorderedList>
            <ListItem>
              In certain cases the user&rsquo;s consent to use personal information may be required, which can be
              withdrawn at any time using any of Aragon contact details. Aragon will get in touch with the data subject
              every time the consent to process any data is required.
            </ListItem>
            <ListItem>
              Aragon may also need to collect and process additional personal information in order to provide services,
              to perform any contractual obligations, or to comply with the law or any judicial order. In these cases
              Aragon will specifically get in contact with the data subject.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            How is the information collected?
          </Text>
          <Text mb={2}>
            Aragon processes personal information that the user provides directly through various channels:
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Signing up at any Aragon Site: when the user registers at any Aragon site, obtains services from Aragon,
              contacts Aragon with queries or responds to Aragon communications. Additionally, the user may signs up for
              news, events or newsletters.
            </ListItem>
            <ListItem>
              In connection with Aragon Services: when the user visits the Site or applies for any of Aragon services,
              the user may provide Aragon with personal information that is relevant for the purpose of providing
              services.
            </ListItem>
            <ListItem>
              Information collected by third parties: Aragon also collects data from third parties, acting for that
              purpose as data processors, including clients, services providers and other entities engaged with Aragon
              for the purposes of providing services, and subject to a specific data processing agreement.
            </ListItem>
          </UnorderedList>
          <Text>
            Data may also be collected when the user visits any Aragon site, requires any services, or Aragon interacts
            directly with the user. Aragon may use different technologies to collect and store information such as, the
            type of device used to access the websites, browser type, the content viewed and features accessed on
            Aragon' websites, the web pages entered on Aragon websites. For those purposes Aragon may also process data
            collected by Helpscout (email, browser fingerprint, IP address), Hubspot, Typeform & Rudderstack.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            How is the information collected?
          </Text>
          <Text mb={2}>Aragon may use the collected information for the following purposes:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>Providing services to the user.</ListItem>
            <ListItem>
              Marketing and business activities in relation to Aragon services, including newsletters sending, updates,
              marketing communications and other information that may be of interest to the user.
            </ListItem>
            <ListItem>Complying with legal and regulatory obligations.</ListItem>
            <ListItem>Exercising or defending any legal rights.</ListItem>
            <ListItem>
              Monitoring the use of websites or other online services for business purposes which may include analysis
              of usage, measurement of site performance and generation of marketing reports.
            </ListItem>
            <ListItem>
              Using it for Aragon legitimate business interests, such as business research and analysis, managing Aragon
              &nbsp.sites and businesses.
            </ListItem>
            <ListItem>Looking into any complaints or queries.</ListItem>
            <ListItem>Preventing and responding to actual or potential fraud or illegal activities.</ListItem>
            <ListItem>
              Reviewing and processing any job application in case any user has applied for a position.
            </ListItem>
            <ListItem>
              Operating Aragon client, customer support, marketing and research services related to the Aragon project.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            How the information is shared
          </Text>
          <Text mb={2}>
            Aragon shares personal information with other Aragon companies, among the Aragon Association group or third
            party service providers that assist Aragon providing services. This may include sharing information with
            third partycontractors, bound by obligations of confidentiality, in connection with the processing of user's
            personalinformation for the purposes described in this Policy, such as, but not limited to, IT and
            communications serviceproviders, third parties relevant to the services that Aragon provides including
            regulators, authorities andgovernmental institutions.
          </Text>
          <Text mb={2}>
            Aragon may transfer personal information outside Europe. In those cases Aragon will ensure that it is
            protected and transferred in a manner consistent with legal requirements applicable to the information.
          </Text>
          <Text mb={2}>
            That data will be shared between Aragon and the Aragon Associationand other partners of the Aragon Network
            that require the data in order to adequately perform their duties.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            How the information is shared
          </Text>
          <Text mb={2}>
            Aragon ensures that the personal information collected is subject to appropriate security measures.
          </Text>
          <Text mb={2}>
            Keeps the information for a limited period of time and strictly as long as is necessary for the relevant
            purpose - and also for as long as it is necessary to comply with legal obligations, laws or regulations,
            which may set a minimum period for which Aragon has to keep the users personal information.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Exercise of Rights
          </Text>
          <Text mb={2}>
            The user holds a number of legal rights in relation to the personal information that Aragon may hold about
            the user. These rights can be exercised at any time by contacting Aragon using the details set out below.
          </Text>
          <Text mb={2}>The user has the right to:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Obtain information regarding the processing of personal information and access to the personal information
              which is held about the user.
            </ListItem>
            <ListItem>
              Request that Aragon corrects any personal information if it is inaccurate or incomplete.
            </ListItem>
            <ListItem>
              Request that Aragon erase the personal information in certain circumstances. There may be circumstances
              where the user asks Aragon to erase personal information but Aragon is legally entitled to retain it.
            </ListItem>
            <ListItem>Exercising or defending any legal rights.</ListItem>
            <ListItem>
              Monitoring the use of websites or other online services for business purposes which may include analysis
              of usage, measurement of site performance and generation of marketing reports.
            </ListItem>
            <ListItem>
              Using it for Aragon legitimate business interests, such as business research and analysis, managing Aragon
              &nbsp.sites and businesses.
            </ListItem>
            <ListItem>
              Receive some personal information in a structured, commonly used and machine-readable format and/or
              request that Aragon transmits that information to a third party.
            </ListItem>
            <ListItem>
              Withdraw any consent, although in certain circumstances it may be lawful for us to continue processing
              without the consent if Aragon has another legitimate reason (other than consent) for doing so.
            </ListItem>
            <ListItem>
              Lodge a complaint with the relevant data protection authority, if any rights have been infringed by
              Aragon.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Contact
          </Text>
          <Text mb={2}>
            For any further information on the collection, use, disclosure, transfer or processing of personal
            information or the exercise of any of the rights listed above, please contact Aragon by sending an email to{' '}
            <Link href='#' variant='primary'>
              privacy@vocdoni.org
            </Link>
          </Text>
        </ListItem>
      </OrderedList>
    </Box>
  </>
)

export default PrivacyEn
