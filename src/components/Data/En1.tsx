import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Data1En = () => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      personalData: false,
      consentComercial: false,
    },
  })
  const onSubmit = () => console.log('Submit')

  return (
    <>
      <Heading textAlign='center' fontSize='xl3' mb={10}>
        Personal Data Protection Information
      </Heading>

      <Text mb={5}>
        In compliance with the provisions of Regulation 2016/679, of the European Parliament and of the Council, of
        April 27, 2016 (GDRP), Aragon, as data controller, informs you that your personal data is accurate for the
        provision of the interested request, and that these data will be processed, as indicated in the record of the
        processing activities provided for in article 30 of the GDRP.
      </Text>
      <Text mb={5}>
        The following information is also provided{' '}
        <Text as='span' fontWeight='bold'>
          (Layer 1)
        </Text>
        :
      </Text>
      <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5} ml={0} mb={5}>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Responsible
          </Text>
          <Text>
            The personal data that is collected directly from the applicant for the voting process will be treated
            confidentially and will be incorporated into the corresponding treatment activity owned by Aragon.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Purpose
          </Text>
          <Text>Sending information, advertising, subscription to the newsletter of news and assistance.</Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Legitimation
          </Text>
          <Text>
            The legal basis for the treatment in relation to sending information, assistance Advertising and advertising
            on Aragon products and services is the consent referred to in article 6.1.a) GDRP, and article 7 of the
            GDRP.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Recipients
          </Text>
          <Text>
            Aragon shares personal information with other Aragon companies, among the Aragon Association group or third
            party service providers that assist Aragon providing services. This may include sharing information with
            third party contractors, bound by obligations of confidentiality, in connection with the processing of
            user's personal information for the purposes described in this Policy, such as, but not limited to, IT and
            communications service providers, third parties relevant to the services that Aragon provides including
            regulators, authorities and governmental institutions. Aragon may transfer personal information outside
            Europe. In those cases Aragon will ensure that it is protected and transferred in a manner consistent with
            legal requirements applicable to the information. The data subject consents that the data will be shared
            between Aragon and the Aragon Association and other partners of the Aragon Network that require the data in
            order to adequately perform their duties.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Rights
          </Text>
          <Text>
            Access, rectify and delete data, as well as other rights, as explained in the additional information.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Additional Information (layer 2)
          </Text>
          <Text>
            ou can consult the additional information and detailed information on Data Protection on our website:{' '}
            <Link variant='primary'>https://vocdoni.app/data</Link>.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Source (provenance) of the data in the event that the personal data has not been obtained directly from you
            - Does not apply.
          </Text>
          <Text>Does not apply.</Text>
        </ListItem>
      </UnorderedList>
      <Box as='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={5}>
        <Box>
          <FormControl isInvalid={!!errors.personalData} mb={3}>
            <Checkbox {...register('personalData', { required: true })}>
              <Text fontSize='xl'>
                I have read and accept "Personal Data Proteccion Information" (see above), and Aragon Labs "
                <Link variant='primary'>Privacy Policy</Link>"
              </Text>
            </Checkbox>
            <FormErrorMessage>
              <Text>{t('form.error.field_is_required')}</Text>
            </FormErrorMessage>
          </FormControl>
          <Checkbox {...register('consentComercial')}>
            <Text fontSize='xl'>(Optional) I give my express consent for the commercial and service management</Text>
          </Checkbox>
        </Box>
        <Button type='submit' alignSelf='start' colorScheme='primary'>
          You must acept the terms & conditions
        </Button>
      </Box>
    </>
  )
}

export default Data1En
