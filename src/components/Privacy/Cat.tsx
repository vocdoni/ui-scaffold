import { Box, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'

const PrivacyCat = () => (
  <>
    <Heading display='flex' flexDirection='column' alignItems='center' gap={2} fontSize='xl3' mb={10}>
      Aragon<Text as='span'>Política de Privacitat</Text>
    </Heading>
    <Box as='section'>
      <Text mb={2}>
        Aquest document estableix les normes de privadesa pel que fa a l'ús dels llocs i serveis de l'Associació Aragon
        (d'ara endavant 'Aragon'), incloent-hi:
      </Text>
      <UnorderedList mb={5}>
        <ListItem ml={4}>
          Vocdoni.app - per obtenir especificacions sobre la política de processament de dades i els termes i condicions
          del servei a Vocdoni.app, si us plau visita{' '}
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
            Quina informació es recull?
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2}>
            <ListItem>Aragon pot recollir les següents dades personals de l'usuari:</ListItem>
            <UnorderedList>
              <ListItem>
                Adreça de correu electrònic en cas que s'utilitzi una adreça de correu electrònic personal com a adreça
                de correu electrònic de l'organització, la qual cosa no es recomana.
              </ListItem>
            </UnorderedList>
            <ListItem>
              En certs casos, pot ser necessari el consentiment de l'usuari per utilitzar informació personal, el qual
              pot ser revocat en qualsevol moment utilitzant qualsevol de les dades de contacte d'Aragon. Aragon es
              posarà en contacte amb el titular de les dades cada vegada que es requereixi el consentiment per processar
              qualsevol dada.
            </ListItem>
            <ListItem>
              Aragon també pot necessitar recollir i processar informació personal addicional per proporcionar serveis,
              complir amb obligacions contractuals o complir amb la llei o qualsevol ordre judicial. En aquests casos,
              Aragon es posarà en contacte específicament amb el titular de les dades.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Com es recull la informació?
          </Text>
          <Text mb={2}>
            Aragon processa la informació personal que l'usuari proporciona directament a través de diversos canals:
          </Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Registrar-se en qualsevol lloc d'Aragon: quan l'usuari es registra en qualsevol lloc d'Aragon, obté
              serveis d'Aragon, es posa en contacte amb Aragon amb consultes o respon a comunicacions d'Aragon. A més,
              l'usuari es pot registrar per rebre notícies, esdeveniments o butlletins informatius.
            </ListItem>
            <ListItem>
              En relació amb els Serveis d'Aragon: quan l'usuari visita el Lloc o sol·licita qualsevol dels serveis
              d'Aragon, l'usuari pot proporcionar a Aragon informació personal rellevant per al propòsit de proporcionar
              serveis.
            </ListItem>
            <ListItem>
              Informació recollida per tercers: Aragon també recull dades de tercers, que actuen amb aquest propòsit com
              a processadors de dades, incloent-hi clients, proveïdors de serveis i altres entitats relacionades amb
              Aragon amb la finalitat de proporcionar serveis, i subjectes a un acord específic de processament de
              dades.
            </ListItem>
          </UnorderedList>
          <Text>
            Les dades també es poden recollir quan l'usuari visita qualsevol lloc d'Aragon, sol·licita serveis o Aragon
            interactua directament amb l'usuari. Aragon pot utilitzar diferents tecnologies per recollir i emmagatzemar
            informació, com el tipus de dispositiu utilitzat per accedir als llocs web, el tipus de navegador, el
            contingut vist i les característiques a les quals s'accedeix als llocs web d'Aragon, les pàgines web
            visitades als llocs web d'Aragon. Amb aquests fins, Aragon també pot processar dades recollides per
            Helpscout (correu electrònic, empremta digital del navegador, adreça IP), Hubspot, Typeform i Rudderstack.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Com es recull la informació?
          </Text>
          <Text mb={2}>Aragon pot utilitzar la informació recollida per als següents propòsits:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>Proporcionar serveis a l'usuari.</ListItem>
            <ListItem>
              Activitats de màrqueting i negocis relacionats amb els serveis d'Aragon, incloent l'enviament de
              butlletins, actualitzacions, comunicacions de màrqueting i altra informació que pugui ser d'interès per a
              l'usuari.
            </ListItem>
            <ListItem>Cumplir amb obligacions legals i reguladores.</ListItem>
            <ListItem>Exercir o defensar qualsevol dret legal.</ListItem>
            <ListItem>
              Monitoritzar l'ús de llocs web o altres serveis en línia amb finalitats comercials, que poden incloure
              anàlisi d'ús, mesura del rendiment del lloc i generació de informes de màrqueting.
            </ListItem>
            <ListItem>
              Utilitzar-ho per als interessos comercials legítims d'Aragon, com la investigació i anàlisi de negocis, la
              gestió dels llocs i negocis d'Aragon.
            </ListItem>
            <ListItem>Investigar queixes o consultes.</ListItem>
            <ListItem>Prevenir i respondre a activitats de frau o il·legals reals o potencials.</ListItem>
            <ListItem>
              Revisar i processar qualsevol sol·licitud de feina en cas que algun usuari hagi sol·licitat un lloc de
              treball.
            </ListItem>
            <ListItem>
              Operar serveis d'atenció al client, suport, màrqueting i investigació relacionats amb el projecte Aragon.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Com es comparteix la informació?
          </Text>
          <Text mb={2}>
            Aragon comparteix informació personal amb altres companyies d'Aragon, dins del grup de l'Associació Aragon o
            proveïdors de serveis de tercers que ajuden Aragon a proporcionar serveis. Això pot incloure compartir
            informació amb contractistes de tercers, obligats per obligacions de confidencialitat, en relació amb el
            processament de la informació personal de l'usuari pels fins descrits en aquesta Política, com, però no
            limitat a, proveïdors de serveis de TI i comunicacions, tercers rellevants pels serveis que Aragon
            proporciona, incloent reguladors, autoritats i institucions governamentals.
          </Text>
          <Text mb={2}>
            Aragon pot transferir informació personal fora d'Europa. En aquests casos, Aragon garantirà que estigui
            protegida i transferida d'una manera coherent amb els requisits legals aplicables a la informació.
          </Text>
          <Text mb={2}>
            Les dades es compartiran entre Aragon i l'Associació Aragon, així com altres socis de la Xarxa Aragon que
            requereixin les dades per complir adequadament amb les seves responsabilitats.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Seguretat
          </Text>
          <Text mb={2}>
            Aragon garanteix que la informació personal recollida estigui subjecta a mesures de seguretat adequades.
          </Text>
          <Text mb={2}>
            Manté la informació durant un període limitat de temps i estrictament mentre sigui necessari per al propòsit
            pertinent, així com mentre sigui necessari per complir amb obligacions legals, lleis o regulacions, que
            poden establir un període mínim durant el qual Aragon ha de conservar la informació personal de l'usuari.
          </Text>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Exercici de Drets
          </Text>
          <Text mb={2}>
            L'usuari té diversos drets legals en relació amb la informació personal que Aragon pot tenir sobre l'usuari.
            Aquests drets es poden exercir en qualsevol moment posant-se en contacte amb Aragon utilitzant les dades que
            es descriuen a continuació.
          </Text>
          <Text mb={2}>L'usuari té dret a:</Text>
          <UnorderedList display='flex' flexDirection='column' gap={2} mb={2}>
            <ListItem>
              Obtindre informació sobre el processament de informació personal i accedir a la informació personal que
              Aragon tingui sobre l'usuari.
            </ListItem>
            <ListItem>
              Sol·licitar que Aragon corregeixi qualsevol informació personal si és inexacta o incompleta.
            </ListItem>
            <ListItem>
              Sol·licitar que Aragon elimini la informació personal en certes circumstàncies. Pot haver-hi
              circumstàncies en què l'usuari sol·liciti a Aragon que elimini informació personal, però Aragon té el dret
              legal a retenir-la.
            </ListItem>
            <ListItem>
              Rebre certa informació personal en un format estructurat, comúment utilitzat i llegible per a màquines i /
              o sol·licitar que Aragon transmeti aquesta informació a un tercer.
            </ListItem>
            <ListItem>
              Retirar qualsevol consentiment, encara que en certes circumstàncies pot ser legal que Aragon continuï
              processant sense el consentiment si Aragon té una altra raó legítima (que no sigui el consentiment) per
              fer-ho.
            </ListItem>
            <ListItem>
              Presentar una queixa davant l'autoritat de protecció de dades rellevant, si s'han infrès drets per part
              d'Aragon.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text as='h2' fontSize='lg' fontWeight='bold' mb={3}>
            Contacte
          </Text>
          <Text mb={2}>
            Per obtenir més informació sobre la recopilació, ús, divulgació, transferència o processament d'informació
            personal o per exercir qualsevol dels drets enumerats anteriorment, poseu-vos en contacte amb Aragon enviant
            un correu electrònic a{' '}
            <Link href='#' variant='primary'>
              privacy@vocdoni.org
            </Link>
          </Text>
        </ListItem>
      </OrderedList>
    </Box>
  </>
)

export default PrivacyCat
