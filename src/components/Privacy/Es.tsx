import { Box, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'

const PrivacyEs = () => (
  <>
    <Heading display='flex' flexDirection='column' alignItems='center' gap={2} fontSize='xl3' mb={10}>
      Aragon<Text as='span'>Política de Privacidad</Text>
    </Heading>
    <Box as='section'>
      <Text mb={2}>
        Este documento establece las normas de privacidad con respecto al uso de los sitios y servicios de la Asociación
        Aragon (en adelante 'Aragon'), incluyendo:
      </Text>
      <UnorderedList mb={5}>
        <ListItem ml={4}>
          Vocdoni.app - para conocer las especificaciones sobre la política de procesamiento de datos y los términos y
          condiciones del servicio en Vocdoni.app, por favor visita{' '}
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
            ¿Qué información se recopila?
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2}>
            <ListItem>Aragon puede recopilar los siguientes datos personales del usuario:</ListItem>
            <UnorderedList>
              <ListItem>
                Dirección de correo electrónico en caso de que se utilice una dirección de correo electrónico personal
                como la dirección de correo electrónico de la organización, lo cual no se recomienda.
              </ListItem>
            </UnorderedList>
            <ListItem>
              En ciertos casos, puede requerirse el consentimiento del usuario para usar información personal, el cual
              puede ser revocado en cualquier momento utilizando cualquiera de los detalles de contacto de Aragon.
              Aragon se pondrá en contacto con el titular de los datos cada vez que se requiera el consentimiento para
              procesar cualquier dato.
            </ListItem>
            <ListItem>
              Aragon también puede necesitar recopilar y procesar información personal adicional para proporcionar
              servicios, cumplir con obligaciones contractuales o cumplir con la ley o cualquier orden judicial. En
              estos casos, Aragon se pondrá en contacto específicamente con el titular de los datos.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            ¿Cómo se recopila la información?
          </Text>
          <Text mb={2}>
            Aragon procesa la información personal que el usuario proporciona directamente a través de diversos canales:
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Registrarse en cualquier sitio de Aragon: cuando el usuario se registra en cualquier sitio de Aragon,
              obtiene servicios de Aragon, se pone en contacto con Aragon con consultas o responde a comunicaciones de
              Aragon. Además, el usuario puede registrarse para recibir noticias, eventos o boletines informativos.
            </ListItem>
            <ListItem>
              En relación con los Servicios de Aragon: cuando el usuario visita el Sitio o solicita cualquiera de los
              servicios de Aragon, el usuario puede proporcionar a Aragon información personal relevante para el
              propósito de proporcionar servicios.
            </ListItem>
            <ListItem>
              Información recopilada por terceros: Aragon también recopila datos de terceros, que actúan con ese
              propósito como procesadores de datos, incluidos clientes, proveedores de servicios y otras entidades
              relacionadas con Aragon con el propósito de proporcionar servicios, y sujeto a un acuerdo específico de
              procesamiento de datos.
            </ListItem>
          </UnorderedList>
          <Text>
            Los datos también pueden recopilarse cuando el usuario visita cualquier sitio de Aragon, solicita servicios
            o Aragon interactúa directamente con el usuario. Aragon puede utilizar diferentes tecnologías para recopilar
            y almacenar información, como el tipo de dispositivo utilizado para acceder a los sitios web, el tipo de
            navegador, el contenido visto y las características accedidas en los sitios web de Aragon, las páginas web
            visitadas en los sitios web de Aragon. Con esos fines, Aragon también puede procesar datos recopilados por
            Helpscout (correo electrónico, huella digital del navegador, dirección IP), Hubspot, Typeform y Rudderstack.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            ¿Cómo se recopila la información?
          </Text>
          <Text mb={2}>Aragon puede utilizar la información recopilada para los siguientes propósitos:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>Proporcionar servicios al usuario.</ListItem>
            <ListItem>
              Actividades de marketing y negocios relacionados con los servicios de Aragon, incluido el envío de
              boletines, actualizaciones, comunicaciones de marketing y otra información que pueda ser de interés para
              el usuario.
            </ListItem>
            <ListItem>Cumplir con obligaciones legales y regulatorias.</ListItem>
            <ListItem>Ejercer o defender cualquier derecho legal.</ListItem>
            <ListItem>
              Monitorear el uso de sitios web u otros servicios en línea con fines comerciales, que pueden incluir
              análisis de uso, medición del rendimiento del sitio y generación de informes de marketing.
            </ListItem>
            <ListItem>
              Utilizarlo para los intereses comerciales legítimos de Aragon, como la investigación y análisis de
              negocios, la gestión de los sitios y negocios de Aragon.
            </ListItem>
            <ListItem>Investigar quejas o consultas.</ListItem>
            <ListItem>Prevenir y responder a actividades de fraude o ilegales reales o potenciales.</ListItem>
            <ListItem>
              Revisar y procesar cualquier solicitud de empleo en caso de que algún usuario haya solicitado un puesto.
            </ListItem>
            <ListItem>
              Operar servicios de atención al cliente, soporte, marketing e investigación relacionados con el proyecto
              Aragon.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            ¿Cómo se comparte la información?
          </Text>
          <Text mb={2}>
            Aragon comparte información personal con otras compañías de Aragon, dentro del grupo de la Asociación Aragon
            o proveedores de servicios de terceros que ayudan a Aragon a proporcionar servicios. Esto puede incluir
            compartir información con contratistas de terceros, obligados por obligaciones de confidencialidad, en
            relación con el procesamiento de la información personal del usuario para los propósitos descritos en esta
            Política, como, pero no limitado a, proveedores de servicios de TI y comunicaciones, terceros relevantes
            para los servicios que Aragon proporciona, incluyendo reguladores, autoridades e instituciones
            gubernamentales.
          </Text>
          <Text mb={2}>
            Aragon puede transferir información personal fuera de Europa. En esos casos, Aragon garantizará que esté
            protegida y transferida de manera coherente con los requisitos legales aplicables a la información.
          </Text>
          <Text mb={2}>
            Los datos se compartirán entre Aragon y la Asociación Aragon, así como otros socios de la Red Aragon que
            requieran los datos para cumplir adecuadamente con sus responsabilidades.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Seguridad
          </Text>
          <Text mb={2}>
            Aragon garantiza que la información personal recopilada esté sujeta a medidas de seguridad adecuadas.
          </Text>
          <Text mb={2}>
            Mantiene la información durante un período limitado de tiempo y estrictamente durante el tiempo necesario
            para el propósito relevante, así como durante el tiempo necesario para cumplir con obligaciones legales,
            leyes o regulaciones, que pueden establecer un período mínimo durante el cual Aragon debe conservar la
            información personal del usuario.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Ejercicio de Derechos
          </Text>
          <Text mb={2}>
            El usuario tiene varios derechos legales en relación con la información personal que Aragon puede tener
            sobre el usuario. Estos derechos pueden ejercerse en cualquier momento poniéndose en contacto con Aragon
            utilizando los detalles que se describen a continuación.
          </Text>
          <Text mb={2}>El usuario tiene derecho a:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Obtener información sobre el procesamiento de información personal y acceder a la información personal que
              Aragon tenga sobre el usuario.
            </ListItem>
            <ListItem>
              Solicitar que Aragon corrija cualquier información personal si es inexacta o incompleta.
            </ListItem>
            <ListItem>
              Solicitar que Aragon borre la información personal en ciertas circunstancias. Puede haber circunstancias
              en las que el usuario solicite a Aragon que borre información personal, pero Aragon tiene derecho legal a
              retenerla.
            </ListItem>
            <ListItem>
              Recibir cierta información personal en un formato estructurado, comúnmente utilizado y legible por máquina
              y / o solicitar que Aragon transmita esa información a un tercero.
            </ListItem>
            <ListItem>
              Retirar cualquier consentimiento, aunque en ciertas circunstancias puede ser legal que Aragon continúe
              procesando sin el consentimiento si Aragon tiene otra razón legítima (que no sea el consentimiento) para
              hacerlo.
            </ListItem>
            <ListItem>
              Presentar una queja ante la autoridad de protección de datos relevante, si se han infringido los derechos
              por parte de Aragon.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Contacto
          </Text>
          <Text mb={2}>
            Para obtener más información sobre la recopilación, uso, divulgación, transferencia o procesamiento de
            información personal o para ejercer cualquiera de los derechos enumerados anteriormente, comuníquese con
            Aragon enviando un correo electrónico a{' '}
            <Link href='#' variant='primary'>
              privacy@vocdoni.org
            </Link>
          </Text>
        </ListItem>
      </OrderedList>
    </Box>
  </>
)

export default PrivacyEs
