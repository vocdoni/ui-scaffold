import { Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const Terms = () => (
  <Flex
    flexDirection='column'
    gap={5}
    width='full'
    maxW='1100px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
    mt={6}
    mx='auto'
  >
    <Heading as='h1' size='xl'>
      Terms and Conditions for Vocdoni Association
    </Heading>

    <Heading as='h2' size='lg'>
      1. General Information
    </Heading>
    <Text>
      The Vocdoni Association, headquartered in Switzerland, operates the app.vocdoni.io and onvote.app platforms. Our
      mission is to provide secure and private digital voting solutions through a distributed architecture.
    </Text>
    <Text>
      These platforms prioritize user privacy and data security, ensuring compliance with the European Union's General
      Data Protection Regulation (GDPR).
    </Text>

    <Heading as='h2' size='lg'>
      2. Data Collection and Storage
    </Heading>
    <Text>We emphasize user data security. Here is an overview:</Text>
    <UnorderedList>
      <ListItem>
        <strong>Information Collected:</strong> We collect and process personal data necessary for service provision.
        This includes data provided by voting organizers and voters to verify identities, manage voting events, and
        facilitate the overall voting process.
      </ListItem>
      <ListItem>
        <strong>Encrypted Storage:</strong> All personal data is stored in encrypted form, ensuring that no personal
        data is stored in plain text or accessible without proper authorization.
      </ListItem>
      <ListItem>
        <strong>Public Metadata:</strong> Metadata and information submitted by voting organizers may be publicly
        accessible on the InterPlanetary File System (IPFS). Organizers are responsible for compliance with applicable
        data protection laws.
      </ListItem>
      <ListItem>
        <strong>Additional Data Collection:</strong> In certain cases, we collect additional data to fulfill legal
        obligations or provide specialized services. This data is collected with the user's explicit consent or as
        required by applicable laws.
      </ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      3. Data Use and Compliance
    </Heading>
    <UnorderedList>
      <ListItem>
        <strong>Purpose Limitation:</strong> Personal data is processed solely for providing and improving our services
        or fulfilling legal obligations. We do not process personal data for unrelated purposes.
      </ListItem>
      <ListItem>
        <strong>User Consent:</strong> Where necessary, we seek explicit user consent for data processing activities.
        Consent may be withdrawn at any time by contacting us using the details provided below.
      </ListItem>
      <ListItem>
        <strong>Marketing:</strong> We do not use collected data for marketing purposes without explicit user consent.
        Consent can be managed through user account settings.
      </ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      4. Data Sharing
    </Heading>
    <UnorderedList>
      <ListItem>
        <strong>Third-Party Disclosure:</strong> Personal data is not shared with third parties except where required by
        law, for providing services (e.g., secure storage or customer support), or with the user's explicit consent.
      </ListItem>
      <ListItem>
        <strong>Data Processors:</strong> Third-party data processors are bound by data processing agreements that
        include confidentiality obligations consistent with GDPR requirements.
      </ListItem>
      <ListItem>
        <strong>Cross-Border Transfers:</strong> Any cross-border data transfers include adequate protection measures to
        ensure GDPR compliance.
      </ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      5. Security Measures
    </Heading>
    <Text>
      The Vocdoni Association employs strong security measures to protect personal data. Only authorized personnel have
      access to user data, and they are obligated to handle it confidentially.
    </Text>
    <Text>
      In the event of a data breach that affects personal data, we will promptly notify affected individuals and
      relevant authorities as required by applicable laws.
    </Text>

    <Heading as='h2' size='lg'>
      6. User Rights
    </Heading>
    <UnorderedList>
      <ListItem>
        <strong>Access:</strong> Obtain information on the processing of personal data and access the data we hold.
      </ListItem>
      <ListItem>
        <strong>Correction:</strong> Request the correction of inaccurate or incomplete personal data.
      </ListItem>
      <ListItem>
        <strong>Deletion:</strong> Request the deletion of personal data under certain circumstances.
      </ListItem>
      <ListItem>
        <strong>Restriction:</strong> Request that we restrict processing of personal data in specific situations.
      </ListItem>
      <ListItem>
        <strong>Portability:</strong> Receive personal data in a structured format or request its transfer to a third
        party.
      </ListItem>
      <ListItem>
        <strong>Objection:</strong> Object to processing of personal data based on legitimate interests.
      </ListItem>
      <ListItem>
        <strong>Complaint:</strong> Lodge a complaint with the relevant data protection authority.
      </ListItem>
    </UnorderedList>
    <Text>
      To exercise these rights, contact us using the details provided below. We will respond promptly and fulfill your
      request as required by GDPR.
    </Text>

    <Heading as='h2' size='lg'>
      7. Disclaimer
    </Heading>
    <Text>
      The Vocdoni Association is not responsible for information submitted by end-users or organizers. Voting organizers
      must comply with applicable data protection laws.
    </Text>
    <Text>We do not track user data beyond what is essential for providing secure services.</Text>

    <Heading as='h2' size='lg'>
      8. Limitation of Liability
    </Heading>
    <UnorderedList>
      <ListItem>
        <strong>Indirect Damages:</strong> The Vocdoni Association shall not be liable for indirect, consequential, or
        incidental damages arising from the use of our services.
      </ListItem>
      <ListItem>
        <strong>Force Majeure:</strong> The Vocdoni Association is not responsible for delays or interruptions in
        service resulting from events beyond our reasonable control, including acts of God, natural disasters, or
        technical failures.
      </ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      9. Contact Information
    </Heading>
    <Text>
      For any queries regarding these Terms and Conditions or to exercise your data rights, please contact us at info
      (at) vocdoni.org. We will respond promptly to address any concerns or complaints.
    </Text>

    <Text>
      By continuing to use app.vocdoni.io or onvote.app, you confirm your acceptance of these terms and your agreement
      to abide by them.
    </Text>
  </Flex>
)

export default Terms
