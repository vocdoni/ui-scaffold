import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const RegistryCat = () => (
  <>
    <Heading textAlign='center' fontSize='xl3' mb={10}>
      Registre d'Activitat
    </Heading>

    <UnorderedList listStyleType='none' display='flex' flexDirection='column' gap={5}>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Base Legal
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            La base legal per al tractament de dades és l'execució del contracte mencionat a l'article 6.1.b) del RGPD.
          </ListItem>
          <ListItem>
            La base legal per al manteniment de relacions comercials que sol·liciten el procés de votació és l'interès
            legítim d'Aragon mencionat a l'article 6.1.f) del RGPD.
          </ListItem>
          <ListItem>
            La base legal per al manteniment de relacions comercials que sol·liciten el procés de votació és l'interès
            legítim d'Aragon mencionat a l'article 6.1.f) del RGPD.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Propòsit del tractament
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            La prestació adequada de serveis de votació electrònica, el manteniment de relacions comercials, així com
            l'enviament d'informació, assistència i publicitat.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories d'interessats
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>Sol·licitants del servei de votació d'Aragon i entitats que desitgen estar relacionades.</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories de dades personals
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            Per a la prestació del servei de votació, nom i cognom de la persona de contacte, càrrec, correu electrònic
            corporatiu i número de telèfon de contacte corporatiu. Per atendre consultes, enviar publicitat i processar
            un registre als butlletins, els usuaris han d'omplir els següents camps: correu electrònic.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Categories de destinataris als quals es van comunicar o es comunicaran les dades personals
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            En general, les dades personals no es comunicaran a tercers. En alguns casos, pot ser necessari comunicar la
            informació que ha proporcionat a tercers per a proporcionar-li el servei que ha sol·licitat.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Transferències de dades personals a un tercer país o organització internacional
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>No estan previstes transferències de dades.</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Terminis per a l'eliminació de les diferents categories de dades
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            Les dades personals corresponents a la prestació de serveis de votació es conservaran durant el temps mínim
            necessari per al procés de participació tècnica. Les dades personals corresponents a l'avís d'inici de la
            votació electoral en línia es conservaran només durant el dia de la prova.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Mesures de seguretat
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>
            Les mesures implementades es descriuen en els documents que formen part de la documentació de la Política de
            Seguretat d'Aragon en relació amb el servei específic.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <Text as='h2' fontWeight='bold' fontSize='lg' mb={3}>
          Entitat responsable
        </Text>
        <UnorderedList display='flex' flexDirection='column' gap={2} fontWeight='normal'>
          <ListItem>XXXX</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  </>
)

export default RegistryCat
