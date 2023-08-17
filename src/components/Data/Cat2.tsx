import { Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const Data2Cat = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={5}>
      Informació Secundària de Protecció de Dades
    </Heading>
    <Text as='h2' fontWeight='bold' fontSize='xl2' textAlign='center' mb={10}>
      Responsable del tractament
    </Text>
    <Text mb={2}>
      Les dades personals que es puguin recopilar directament de l'interessat seran tractades de manera confidencial i
      s'incorporaran a la corresponent activitat de tractament propietat d'Aragon.
    </Text>
    <Text mb={5}>
      La llista actualitzada de les activitats de tractament que realitza Aragon està disponible al següent enllaç al
      registre d'activitats d'Aragon: <Link variant='primary'>https://vocdoni.app/registry</Link>
    </Text>
    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5} ml={0}>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Qui és responsable del tractament de les seves dades?
        </Text>
        <UnorderedList listStyleType='none' ml={0} display='flex' flexDirection='column' gap={2}>
          <ListItem>Identitat: XXXX</ListItem>
          <ListItem>Número de registre: XXXX</ListItem>
          <ListItem>Adreça postal: XXXX</ListItem>
          <ListItem>Telèfon: XXXX</ListItem>
          <ListItem>Correu electrònic: XXXX</ListItem>
          <ListItem>Contacte de DPD: XXXX</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Propòsit
        </Text>
        <Text>
          El propòsit del tractament de dades correspon a cadascuna de les activitats de tractament realitzades per
          Aragon, accessibles en el corresponent registre d'activitats de tractament esmentat en el paràgraf anterior.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Legitimació
        </Text>
        <Text>
          El tractament de les seves dades es realitza per al compliment d'obligacions legals per part d'Aragon.
        </Text>
        <Text>
          La legitimació específica per al tractament de les seves dades és la prestació i execució deguda del contracte
          de serveis de votació, pel qual vostè accepta les condicions generals d'aquest servei. Si escau, l'enviament
          de comunicacions publicitàries o promocionals de productes i serveis com a sol·licitant del procés de votació
          es basa en l'interès legítim d'Aragon. L'enviament d'informació, publicitat, subscripció al butlletí
          informatiu i assistència a entitats diferents dels sol·licitants està legitimat pel seu consentiment.
        </Text>
        <Text>
          Pot consultar la base legal de cadascuna de les activitats de tractament realitzades per Aragon a l'enllaç al
          registre d'activitats d'Aragon indicat anteriorment. Pot consultar la base legal de cadascuna de les
          activitats de tractament realitzades per Aragon a l'enllaç al registre d'activitats d'Aragon indicat
          anteriorment.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Conservació de dades
        </Text>
        <Text>
          Les dades personals corresponents a la prestació del servei es conservaran mentre estigui en vigor la relació
          contractual.
        </Text>
        <Text>
          Les dades personals corresponents a la resta dels serveis es conservaran durant el temps necessari per complir
          amb la finalitat per a la qual es van recopilar i per determinar les possibles responsabilitats que puguin
          sorgir de la finalitat, a més dels terminis que resultin de l'exercici de les corresponents accions de
          reclamació en els canals administratius i judicials. En tots els casos, un cop finalitzat el servei, Aragon
          mantindrà les seves dades personals bloquejades durant els períodes legals de prescripció. Després d'aquests
          períodes de prescripció, les seves dades es destruiran.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Comunicació de dades
        </Text>
        <Text>
          En general, les dades personals no es comunicaran a tercers. En alguns casos, pot ser necessari comunicar la
          informació que ha proporcionat a tercers per a proporcionar-li el servei que ha sol·licitat.
        </Text>
        <Text>
          Pot consultar els destinataris de cadascuna de les activitats de tractament realitzades per Aragon a l'enllaç
          al registre d'activitats d'Aragon.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Drets dels interessats
        </Text>
        <Text>
          Qualsevol persona té dret a obtenir confirmació sobre el tractament de les seves dades que realitza Aragon.
        </Text>
        <Text>
          Pot exercir els seus drets d'accés, rectificació, supressió i portabilitat de les seves dades, de limitació i
          oposició al seu tractament, així com a no ser objecte de decisions basades únicament en el tractament
          automatitzat de les seves dades, quan sigui apropiat, davant d'Aragon, Bahnhofstrasse 20, 6300 Zug, Suïssa, o
          a l'adreça de correu electrònic privacy@aragon.org.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Quina informació es requereix?
        </Text>
        <Text>
          Les dades sol·licitades als interessats són estrictament les necessàries per a la subscripció del contracte i
          la prestació del servei. La falta de comunicació de les dades implicaria la impossibilitat de prestar el
          servei.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Seguretat
        </Text>
        <Text>
          Les mesures implementades es descriuen en els documents que formen part de la Documentació de la Política de
          Seguretat d'Aragon en relació amb el servei específic.
        </Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Es prenen decisions automatitzades?
        </Text>
        <Text>Aragon no pren decisions automatitzades ni realitza perfils.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Es realitzen transferències internacionals de dades?
        </Text>
        <Text>Aragon no transfereix dades personals a països tercers als quals no s'apliqui el RGPD.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          En cas que les dades personals no s'hagin obtingut directament de vostè
        </Text>
        <Text>Les dades personals s'obtenen únicament de l'interessat.</Text>
      </ListItem>
      <ListItem>
        <Text as='h3' fontSize='lg' mb={3} fontWeight='bold'>
          Dret a presentar una reclamació davant l'autoritat de control:
        </Text>
        <Text>
          Té dret a presentar una reclamació davant l'autoritat de control en cas que consideri que s'han violat alguns
          dels seus drets de protecció de dades. L'autoritat de control a Espanya és l'Agència Espanyola de Protecció de
          Dades, accessible a: <Link variant='primary'>https://www.aepd.es</Link>
        </Text>
      </ListItem>
    </UnorderedList>
  </>
)

export default Data2Cat
