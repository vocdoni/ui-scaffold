import { Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const Data2Es = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={5}>
      Información Secundaria de Protección de Datos
    </Heading>
    <Text as='h2' fontWeight='bold' fontSize='xl2' textAlign='center' mb={10}>
      Responsable del tratamiento
    </Text>
    <Text mb={2}>
      Los datos personales que puedan ser recopilados directamente del interesado serán tratados de manera confidencial
      y se incorporarán a la correspondiente actividad de tratamiento de propiedad de Aragon.
    </Text>
    <Text mb={5}>
      La lista actualizada de las actividades de tratamiento que realiza Aragon está disponible en el siguiente enlace
      al registro de actividades de Aragon: <Link variant='primary'>https://vocdoni.app/registry</Link>
    </Text>
    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5} ml={0}>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          ¿Quién es responsable del tratamiento de sus datos?
        </Text>
        <UnorderedList listStyleType='none' ml={0} display='flex' flexDirection='column' gap={2}>
          <ListItem>Identidad: XXXX</ListItem>
          <ListItem>Número de registro: XXXX</ListItem>
          <ListItem>Dirección postal: XXXX</ListItem>
          <ListItem>Teléfono: XXXX</ListItem>
          <ListItem>Correo electrónico: XXXX</ListItem>
          <ListItem>Contacto de DPD: XXXX</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Propósito
        </Text>
        <Text>
          El propósito del tratamiento de datos corresponde a cada una de las actividades de tratamiento realizadas por
          Aragon, accesibles en el correspondiente registro de actividades de tratamiento mencionado en el párrafo
          anterior.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Legitimación
        </Text>
        <Text>
          El tratamiento de sus datos se realiza para el cumplimiento de obligaciones legales por parte de Aragon.
        </Text>
        <Text>
          La legitimidad específica para el tratamiento de sus datos es la prestación y ejecución debida del contrato de
          servicios de votación, por el cual usted acepta las condiciones generales de dicho servicio. En su caso, el
          envío de comunicaciones publicitarias o promocionales de productos y servicios como solicitante del proceso de
          votación se basa en el interés legítimo de Aragon. El envío de información, publicidad, suscripción al boletín
          informativo y asistencia a entidades distintas a los solicitantes está legitimado por su consentimiento.
        </Text>
        <Text>
          Puede consultar la base legal de cada una de las actividades de tratamiento realizadas por Aragon en el enlace
          al registro de actividades de Aragon indicado anteriormente. Puede consultar la base legal de cada una de las
          actividades de tratamiento realizadas por Aragon en el enlace al registro de actividades de Aragon indicado
          anteriormente.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Conservación de datos
        </Text>
        <Text>
          Los datos personales correspondientes a la prestación del servicio se conservarán mientras esté en vigor la
          relación contractual.
        </Text>
        <Text>
          Los datos personales correspondientes al resto de los servicios se conservarán durante el tiempo necesario
          para cumplir con el propósito para el cual fueron recopilados y para determinar las posibles responsabilidades
          que puedan surgir del propósito, además de los plazos resultantes del ejercicio de las correspondientes
          acciones de reclamación en los canales administrativos y judiciales. En todos los casos, una vez finalizado el
          servicio, Aragon mantendrá sus datos personales bloqueados durante los períodos legales de prescripción.
          Después de transcurridos estos períodos de prescripción, se destruirán sus datos.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Comunicación de datos
        </Text>
        <Text>
          En general, los datos personales no se comunicarán a terceros. En algunos casos, puede ser necesario comunicar
          la información que ha proporcionado a terceros para brindarle el servicio que ha solicitado.
        </Text>
        <Text>
          Puede consultar a los destinatarios de cada una de las actividades de tratamiento realizadas por Aragon en el
          enlace al registro de actividades de Aragon.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Derechos de los interesados
        </Text>
        <Text>
          Cualquier persona tiene derecho a obtener confirmación sobre el tratamiento de sus datos que realiza Aragon.
        </Text>
        <Text>
          Puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de limitación y
          oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento
          automatizado de sus datos, cuando corresponda, ante Aragon, Bahnhofstrasse 20, 6300 Zug, Suiza, o en la
          dirección de correo electrónico privacy@aragon.org.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          ¿Qué información se requiere?
        </Text>
        <Text>
          Los datos solicitados a los interesados son estrictamente los necesarios para la suscripción del contrato y la
          prestación del servicio. La falta de comunicación de los datos implicaría la imposibilidad de prestar el
          servicio.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Seguridad
        </Text>
        <Text>
          Las medidas implementadas se describen en los documentos que forman parte de la Documentación de la Política
          de Seguridad de Aragon en relación con el servicio específico.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          ¿Se toman decisiones automatizadas?
        </Text>
        <Text>Aragon no toma decisiones automatizadas ni realiza perfiles.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          ¿Se realizan transferencias internacionales de datos?
        </Text>
        <Text>Aragon no transfiere datos personales a terceros países a los que no se aplique el RGPD.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          En caso de que los datos personales no se hayan obtenido directamente de usted
        </Text>
        <Text>Los datos personales se obtienen únicamente del interesado.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Derecho a presentar una reclamación ante la autoridad de control:
        </Text>
        <Text>
          Tiene derecho a presentar una reclamación ante la autoridad de control en caso de que considere que se han
          violado algunos de sus derechos de protección de datos. La autoridad de control en España es la Agencia
          Española de Protección de Datos, accesible en: <Link variant='primary'>https://www.aepd.es</Link>
        </Text>
      </ListItem>
    </UnorderedList>
  </>
)

export default Data2Es
