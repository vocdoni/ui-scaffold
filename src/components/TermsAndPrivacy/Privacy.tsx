import React from 'react'
import { Flex, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react'

const Privacy = () => {
  return (
    <Flex flexDirection='column' gap={5} width='800px' mx='auto' textAlign='justify'>
      <Heading as='h1' size='md'>
        Política de Privacitat
      </Heading>
      <Text>Efectiu a partir del 01/03/2025</Text>

      <Text>
        La vostra privacitat és fonamental per a nosaltres. Aquesta Política de Privacitat descriu de manera clara i
        senzilla com recollim, utilitzem, compartim i protegim les vostres dades personals quan utilitzeu els nostres
        serveis de votació digital ("Serveis").
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        1. Qui recopila les vostres dades?
      </Heading>
      <Heading as='h3' size='xs'>
        1.1 Synergize SL com a Responsable del Tractament
      </Heading>
      <Text>
        Synergize SL és el responsable del tractament de les dades, és a dir, és qui determina com i per què es recullen
        i utilitzen les vostres dades personals.
      </Text>
      <Text>Qui som:</Text>
      <UnorderedList>
        <ListItem>Synergize SL</ListItem>
        <ListItem>Jaume I 65, Sant Celoni, Espanya</ListItem>
        <ListItem>CIF: B75576322</ListItem>
      </UnorderedList>

      <Heading as='h3' size='xs'>
        1.2 En cas que utilitzeu els nostres Serveis per a tractar dades en nom d'una altra entitat
      </Heading>
      <Text>
        {' '}
        Aquesta serà el responsable (Controlador) i Synergize actuarà com a Processador, d'acord amb el nostre Acord de
        Tractament de Dades.
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        2. Quines dades recopilem?
      </Heading>
      <Heading as='h3' size='xs'>
        2.1 Dades que ens proporcioneu directament
      </Heading>
      <UnorderedList>
        <ListItem>Dades d'identificació i contacte: Nom, cognoms, adreça electrònica, número de telèfon, etc.</ListItem>
        <ListItem>Dades de registre: Informació introduïda en crear el vostre compte per accedir als Serveis.</ListItem>
        <ListItem>
          Dades de votació: Informació necessària per validar la vostra identitat i garantir la integritat del procés de
          votació (per exemple, identificadors de votant, registre de votacions, etc.).
        </ListItem>
        <ListItem>
          Comunicacions: Dades proporcionades a través de formularis de contacte, suport tècnic o altres interaccions
          amb nosaltres.
        </ListItem>
      </UnorderedList>

      <Heading as='h3' size='xs'>
        2.2 Dades recollides automàticament
      </Heading>
      <UnorderedList>
        <ListItem>
          Dades tècniques: Adreça IP, tipus de navegador, dispositiu utilitzat, i altres dades similars.
        </ListItem>
        <ListItem>
          Registres i cookies: Informació sobre l'ús dels Serveis per millorar la seguretat i l'experiència d'usuari.
        </ListItem>
      </UnorderedList>

      <Heading as='h3' size='xs'>
        2.3 Dades indirectament proporcionades
      </Heading>
      <UnorderedList>
        <ListItem>
          Dades públiques: Informació que es trobi pública a internet i que, en ocasions, pot contenir dades personals,
          tot i que treballem per filtrar-ne l'ús.
        </ListItem>
        <ListItem>
          Informació de tercers: Dades que ens facilitin altres entitats per a la verificació d'identitat o per a
          complir obligacions legals.
        </ListItem>
      </UnorderedList>

      <Heading as='h2' size='md' mt='50px'>
        3. Per què fem servir les vostres dades?
      </Heading>
      <Text>Utilitzem les vostres dades personals per a diversos fins, entre els quals s'inclou:</Text>
      <UnorderedList>
        <ListItem>Prestació i millora dels Serveis:</ListItem>
        <UnorderedList>
          <ListItem>Gestionar el vostre registre i autenticació al sistema.</ListItem>
          <ListItem>Processar i validar els vostres vots en els processos de decisió.</ListItem>
          <ListItem>Assegurar la integritat, confidencialitat i seguretat del sistema de votació digital.</ListItem>
        </UnorderedList>
        <ListItem>Administració i seguretat:</ListItem>
        <UnorderedList>
          <ListItem>
            Monitoritzar i gestionar la seguretat del sistema per prevenir fraus o accessos no autoritzats.
          </ListItem>
          <ListItem>Realitzar anàlisis tècniques i generar estadístiques agregades per millorar els Serveis.</ListItem>
        </UnorderedList>
        <ListItem>Compliment legal:</ListItem>
        <UnorderedList>
          <ListItem>Atendre les obligacions legals i regulatòries en matèria de protecció de dades.</ListItem>
          <ListItem>Resoldre disputes i respondre a les vostres sol·licituds d'assistència.</ListItem>
        </UnorderedList>
        <ListItem>Comunicacions:</ListItem>
        <UnorderedList>
          <ListItem>
            Enviar-vos informació rellevant sobre el funcionament dels Serveis (notificacions de manteniment,
            actualitzacions importants, codis d’accés, etc.).
          </ListItem>
          <ListItem>Si ho heu autoritzat, enviar-vos newsletter o comunicacions de màrqueting.</ListItem>
        </UnorderedList>
      </UnorderedList>
      <Text>
        Base legal per al tractament: La prestació dels Serveis, el vostre consentiment (quan sigui necessari), els
        nostres interessos legítims per millorar la seguretat i funcionalitat dels Serveis, i el compliment
        d'obligacions legals.
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        4. Cookies
      </Heading>
      <Text>
        Quan visiteu el nostre lloc web, utilitzem cookies i tecnologies similars per millorar la vostra experiència.
        Aquestes es poden classificar en:
      </Text>
      <UnorderedList>
        <ListItem>
          Cookies tècniques: Necessàries per al funcionament correcte del lloc (no requereixen consentiment explícit).
        </ListItem>
        <ListItem>
          Cookies d'anàlisi i rendiment: Per analitzar l'ús del lloc i millorar els Serveis, que requereixen el vostre
          consentiment previ.
        </ListItem>
      </UnorderedList>
      <Text>
        Podeu gestionar les vostres preferències de cookies mitjançant la configuració del vostre navegador o el nostre
        gestor de cookies.
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        5. Amb qui compartim les vostres dades?
      </Heading>
      <Text>Podem compartir les vostres dades personals amb:</Text>
      <UnorderedList>
        <ListItem>
          Equip intern: Només amb aquells membres del nostre equip que necessitin accedir a la informació per dur a
          terme les seves funcions.
        </ListItem>
        <ListItem>
          Proveïdors de serveis: Entitats externes que ens ajudin en la prestació dels Serveis (p. ex., emmagatzematge
          en núvol, seguretat, gestió de pagaments), amb qui establim acords per garantir la seguretat i
          confidencialitat de les dades.
        </ListItem>
        <ListItem>
          Autoritats legals: Quan sigui necessari per complir amb obligacions legals o per respondre a requeriments
          d'autoritats competents.
        </ListItem>
        <ListItem>
          Transferències internacionals: En cas que les dades es transfereixin fora de la Unió Europea, adoptarem les
          garanties necessàries (com clàusules contractuals tipus) per assegurar un nivell de protecció adequat.
        </ListItem>
      </UnorderedList>

      <Heading as='h2' size='md' mt='50px'>
        6. Transferències de dades fora de la UE
      </Heading>
      <Text>
        En ocasions, podríem transferir les vostres dades personals fora de la Unió Europea. En aquests casos, Synergize
        SL s'assegurarà que es posin en marxa les salvaguardes necessàries per garantir la protecció adequada de les
        dades, conforme a l'article 46 del RGPD.
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        7. Quant de temps conservem les vostres dades?
      </Heading>
      <Text>
        Conservem les vostres dades personals durant el temps necessari per a la prestació dels Serveis i per complir
        amb les obligacions legals. Alguns exemples són:
      </Text>
      <UnorderedList>
        <ListItem>
          Dades de compte: Durant el temps que mantingueu el vostre compte actiu i durant un període addicional (d’un
          any) després de la seva finalització, segons les obligacions legals.
        </ListItem>
        <ListItem>
          Dades de votació: Es conservaran el temps necessari per validar i auditar els processos de votació, per la
          seguretat i transparència del sistema, i posteriorment es suprimiran o anonimitzaran d'acord amb la normativa.
        </ListItem>
        <ListItem>
          Dades tècniques i cookies: Conservades segons el seu ús específic i les configuracions del vostre navegador.
        </ListItem>
      </UnorderedList>

      <Heading as='h2' size='md' mt='50px'>
        8. Els vostres drets
      </Heading>
      <Text>Teniu els següents drets respecte a les vostres dades personals:</Text>
      <UnorderedList>
        <ListItem>Accés: Dret a sol·licitar informació sobre les dades que tenim sobre vosaltres.</ListItem>
        <ListItem>Rectificació: Dret a actualitzar o corregir dades personals incorrectes o incompletes.</ListItem>
        <ListItem>Supressió: Dret a demanar l'eliminació de les vostres dades en certes circumstàncies.</ListItem>
        <ListItem>Oposició: Dret a oposar-vos al tractament de les vostres dades per motius legítims.</ListItem>
        <ListItem>Limitació: Dret a demanar que es limiti el tractament de les vostres dades.</ListItem>
        <ListItem>
          Portabilitat: Dret a rebre les vostres dades en un format estructurat i a transferir-les a un altre
          responsable.
        </ListItem>
        <ListItem>
          Retirada del consentiment: Si el tractament es basa en el vostre consentiment, podeu retirar-lo en qualsevol
          moment.
        </ListItem>
        <ListItem>
          Presentació d'una reclamació: Dret a presentar una reclamació davant de l'autoritat de protecció de dades
          competent (p.ex., la CNPD a Espanya).
        </ListItem>
      </UnorderedList>

      <Heading as='h2' size='md' mt='50px'>
        9. Canvis a aquesta Política de Privacitat
      </Heading>
      <Text>
        Podem actualitzar aquesta Política de Privacitat periòdicament per reflectir canvis en les nostres pràctiques o
        en la legislació aplicable. Us recomanem que consulteu aquesta pàgina amb regularitat. Les modificacions
        entraran en vigor des del moment de la seva publicació.
      </Text>

      <Heading as='h2' size='md' mt='50px'>
        10. Contacte
      </Heading>
      <Text>
        Per a qualsevol consulta sobre aquesta Política de Privacitat, o per exercir els vostres drets, podeu posar-vos
        en contacte amb nosaltres a:
      </Text>
      <UnorderedList>
        <ListItem>Correu electrònic: legal@synergize.dev</ListItem>
        <ListItem>Adreça postal: Synergize SL, Jaume I 65, Sant Celoni, Espanya</ListItem>
      </UnorderedList>
    </Flex>
  )
}

export default Privacy
