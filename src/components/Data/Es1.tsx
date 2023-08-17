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

const Data1Es = () => {
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
        Información de Protección de Datos Personales
      </Heading>

      <Text mb={5}>
        En cumplimiento de lo establecido en el Reglamento 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril
        de 2016 (GDPR), Aragon, en calidad de responsable del tratamiento de datos, le informa que sus datos personales
        son precisos para la prestación de la solicitud de interés, y que estos datos serán procesados, tal como se
        indica en el registro de actividades de tratamiento previsto en el artículo 30 del GDPR.
      </Text>
      <Text mb={5}>
        También se proporciona la siguiente información{' '}
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
            Los datos personales recopilados directamente del solicitante del proceso de votación serán tratados de
            manera confidencial y se incorporarán a la actividad de tratamiento correspondiente propiedad de Aragon.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Propósito
          </Text>
          <Text>Envío de información, publicidad, suscripción al boletín de noticias y asistencia.</Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Legitimación
          </Text>
          <Text>
            La base legal para el tratamiento en relación con el envío de información, publicidad y publicidad sobre
            productos y servicios de Aragon es el consentimiento establecido en el artículo 6.1.a) del GDPR, y el
            artículo 7 del GDPR.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Destinatarios
          </Text>
          <Text>
            Aragon comparte información personal con otras empresas de Aragon, dentro del grupo de la Asociación Aragon
            o proveedores de servicios de terceros que ayudan a Aragon a prestar servicios. Esto puede incluir compartir
            información con contratistas de terceros, sujetos a obligaciones de confidencialidad, en relación con el
            tratamiento de la información personal del usuario con los fines descritos en esta Política, como, entre
            otros, proveedores de servicios de TI y comunicaciones, terceros relevantes para los servicios que Aragon
            proporciona, incluidos reguladores, autoridades e instituciones gubernamentales. Aragon puede transferir
            información personal fuera de Europa. En esos casos, Aragon se asegurará de que esté protegida y transferida
            de acuerdo con los requisitos legales aplicables a la información. El titular de los datos consiente que los
            datos se compartirán entre Aragon y la Asociación Aragon y otros socios de la Red Aragon que requieran los
            datos para desempeñar adecuadamente sus funciones.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' mb={3} fontWeight='bold'>
            Derechos
          </Text>
          <Text>
            Acceso, rectificación y supresión de datos, así como otros derechos, según se explica en la información
            adicional.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Información Adicional (Capa 2)
          </Text>
          <Text>
            Puede consultar la información adicional y detallada sobre Protección de Datos en nuestro sitio web:{' '}
            <Link variant='primary'>https://vocdoni.app/data</Link>.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
            Origen de los Datos en caso de que los datos personales no se hayan obtenido directamente de usted: No se
            aplica.
          </Text>
          <Text>No se aplica.</Text>
        </ListItem>
      </UnorderedList>
      <Box as='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={5}>
        <Box>
          <FormControl isInvalid={!!errors.personalData} mb={3}>
            <Checkbox {...register('personalData', { required: true })}>
              <Text fontSize='xl'>
                He leído y acepto "Información de Protección de Datos Personales" (ver arriba), y "Política de
                Privacidad de Aragon Labs "<Link variant='primary'>Política de Privacidad</Link>"
              </Text>
            </Checkbox>
            <FormErrorMessage>
              <Text>{t('form.error.field_is_required')}</Text>
            </FormErrorMessage>
          </FormControl>
          <Checkbox {...register('consentComercial')}>
            <Text fontSize='xl'>(Opcional) Doy mi consentimiento expreso para la gestión comercial y de servicios</Text>
          </Checkbox>
        </Box>
        <Button type='submit' alignSelf='start' colorScheme='primary'>
          Debes aceptar los términos y condiciones
        </Button>
      </Box>
    </>
  )
}

export default Data1Es
