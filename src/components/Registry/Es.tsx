import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const RegistryEs = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={10}>
      Registro de Actividad
    </Heading>
    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5}>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Base Legal
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2}>
          <ListItem>
            La base legal para el procesamiento de datos es la ejecución del contrato mencionado en el artículo 6.1.b)
            del RGPD.
          </ListItem>
          <ListItem>
            La base legal para mantener relaciones comerciales solicitando el proceso de votación es el interés legítimo
            de Aragon mencionado en el artículo 6.1.f) del RGPD.
          </ListItem>
          <ListItem>
            La base legal para mantener relaciones comerciales solicitando el proceso de votación es el interés legítimo
            de Aragon mencionado en el artículo 6.1.f) del RGPD.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Propósito del tratamiento
        </Text>
        <UnorderedList>
          <ListItem>
            La provisión adecuada de servicios de votación electrónica, el mantenimiento de relaciones comerciales, así
            como el envío de información, asistencia y publicidad.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categorías de interesados
        </Text>
        <UnorderedList>
          <ListItem>
            Solicitantes del servicio de votación de Aragon y entidades que deseen estar relacionadas.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categorías de datos personales
        </Text>
        <UnorderedList>
          <ListItem>
            Para la provisión del servicio de votación, nombre y apellido de la persona de contacto, cargo, correo
            electrónico corporativo y número de teléfono de contacto corporativo. Para atender consultas, enviar
            publicidad y procesar un registro en los boletines, los usuarios deben completar los siguientes campos:
            correo electrónico.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categorías de destinatarios a quienes se comunicaron o se comunicarán los datos personales
        </Text>
        <UnorderedList>
          <ListItem>
            En general, los datos personales no se comunicarán a terceros. En algunos casos, puede ser necesario
            comunicar la información que ha proporcionado a terceros para brindarle el servicio que ha solicitado.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Transferencias de datos personales a un tercer país u organización internacional
        </Text>
        <UnorderedList>
          <ListItem>No se prevén transferencias de datos.</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Plazos para la eliminación de las diferentes categorías de datos
        </Text>
        <UnorderedList>
          <ListItem>
            Los datos personales correspondientes a la provisión de servicios de votación se conservarán durante el
            tiempo mínimo necesario para el proceso de participación técnica. Los datos personales correspondientes al
            aviso de inicio de la votación electoral en línea se conservarán solo durante el día de la prueba.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Medidas de seguridad
        </Text>
        <UnorderedList>
          <ListItem>
            Las medidas implementadas se describen en los documentos que forman parte de la documentación de la Política
            de Seguridad de Aragon en relación con el servicio específico.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Entidad responsable
        </Text>
        <UnorderedList>
          <ListItem>XXXX</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  </>
)

export default RegistryEs
