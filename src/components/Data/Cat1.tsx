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

const Data1Ca = () => {
  const { t } = useTranslation()
  const methods = useForm({
    defaultValues: {
      personalData: false,
      consentComercial: false,
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const onSubmit = () => console.log('Submit')

  return (
    <>
      <Heading textAlign='center' fontSize='xl3' mb={10}>
        Informació de Protecció de Dades Personals
      </Heading>

      <Text mb={5}>
        En compliment del que estableix el Reglament 2016/679 del Parlament Europeu i del Consell, de 27 d'abril de 2016
        (GDPR), Aragon, en qualitat de responsable del tractament de dades, l'informa que les seves dades personals són
        precises per a la prestació de la sol·licitud d'interès, i que aquestes dades seran processades, tal com
        s'indica al registre d'activitats de tractament previst a l'article 30 del GDPR.
      </Text>
      <Text mb={5}>
        També es proporciona la següent informació{' '}
        <Text as='span' fontWeight='bold'>
          (Capa 1)
        </Text>
        :
      </Text>
      <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5} ml={0} mb={5}>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Responsable
          </Text>
          <Text>
            Les dades personals recopilades directament del sol·licitant del procés de votació seran tractades de manera
            confidencial i s'incorporaran a l'activitat de tractament corresponent propietat d'Aragon.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Propòsit
          </Text>
          <Text>Enviar informació, publicitat, subscripció al butlletí de notícies i assistència.</Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Legitimació
          </Text>
          <Text>
            La base legal per al tractament en relació amb l'enviament d'informació, assistència Publicitat i publicitat
            de productes i serveis d'Aragon és el consentiment esmentat a l'article 6.1.a) del GDPR i l'article 7 del
            GDPR.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Destinataris
          </Text>
          <Text>
            Aragon comparteix informació personal amb altres empreses d'Aragon, dins del grup de l'Associació Aragon o
            proveïdors de serveis de tercers que ajuden Aragon a prestar serveis. Això pot incloure compartir informació
            amb subcontractistes de tercers, vinculats per obligacions de confidencialitat, en relació amb el tractament
            de la informació personal de l'usuari amb els fins descrits en aquesta Política, com, entre d'altres,
            proveïdors de serveis de TI i comunicació, tercers rellevants per als serveis que Aragon proporciona,
            incloent reguladors, autoritats i institucions governamentals. Aragon pot transferir informació personal
            fora d'Europa. En aquests casos, Aragon s'assegurarà que estigui protegida i transferida d'acord amb els
            requisits legals aplicables a la informació. El titular de les dades consent que les dades es compartiran
            entre Aragon i l'Associació Aragon i altres socis de la Xarxa Aragon que requereixen les dades per a complir
            adequadament les seves funcions.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Drets
          </Text>
          <Text>
            Accés, rectificació i supressió de dades, així com altres drets, segons s'explica a la informació
            addicional.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Informació Addicional (Capa 2)
          </Text>
          <Text>
            Pot consultar la informació addicional i detallada sobre Protecció de Dades al nostre lloc web:{' '}
            <Link variant='primary'>https://vocdoni.app/data</Link>.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Origen de les Dades en cas que les dades personals no s'hagin obtingut directament de vostè: No s'aplica.
          </Text>
          <Text>No s'aplica.</Text>
        </ListItem>
      </UnorderedList>

      <Box as='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={5}>
        <Box>
          <FormControl isInvalid={!!errors.personalData} mb={3}>
            <Checkbox {...register('personalData', { required: true })}>
              <Text fontSize='xl'>
                He llegit i accepto la "Informació de Protecció de Dades Personals" (vegeu a dalt), i la "Política de
                Privacitat de Aragon Labs"
                <Link variant='primary'>Política de Privacitat</Link>"
              </Text>
            </Checkbox>
            <FormErrorMessage>
              <Text>{t('form.error.field_is_required')}</Text>
            </FormErrorMessage>
          </FormControl>
          <Checkbox {...register('consentComercial')}>
            <Text fontSize='xl'>(Opcional) Dono el meu consentiment exprés per a la gestió comercial i de serveis</Text>
          </Checkbox>
        </Box>
        <Button type='submit' alignSelf='start' colorScheme='primary'>
          Has d'acceptar els termes i condicions
        </Button>
      </Box>
    </>
  )
}

export default Data1Ca
