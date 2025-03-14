import React from 'react';
import { Flex, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const Terms = () => {
    return (
        <Flex flexDirection='column' gap={5} width='800px' mx='auto' textAlign='justify'>
          <Heading as='h1' size='lg'>
              Termes i Condicions
          </Heading>
          <Text>Última actualització: 01/03/2025</Text>

          <Heading as='h2' size='md' mt='50px'>
              1. Informació General
          </Heading>
          <Heading as='h3' size='xs'>
              1.1 Objectiu i Abast
          </Heading>
          <Text>Aquests Termes i Condicions regulen l'ús del lloc web, plataformes i serveis de votació digital proporcionats per Synergize SL (“Empresa”), una societat limitada espanyola degudament constituïda amb domicili social a Jaume I 65, Sant Celoni, Espanya i CIF: B75576322. El nostre objectiu és facilitar processos de votació digital segurs, transparents i digitals per a entitats, associacions o altres organitzacions.</Text>

          <Heading as='h3' size='xs'>
              1.2 Plataformes Operades
          </Heading>
          <Text>L'Empresa utilitza el protocol de votació digital Vocdoni i utilitza serveis de tercers degudament documentats per completar la seva oferta de serveis relacionats amb els processos de votació, prioritzant la privacitat i la seguretat de les dades, i complint amb el Reglament General de Protecció de Dades (RGPD), la LOPDGDD i la legislació espanyola aplicable.</Text>

          <Heading as='h3' size='xs'>
              1.3 Definicions
          </Heading>
          <UnorderedList>
              <ListItem>Empresa: Synergize SL, els seus successors o assignats.</ListItem>
              <ListItem>Usuari: Qualsevol persona física o jurídica que accedeix o utilitza els serveis de votació digital, ja sigui en qualitat de votant, administrador o organitzador.</ListItem>
              <ListItem>Serveis: Tots els productes, continguts i serveis relacionats amb la votació digital proporcionats per l'Empresa.</ListItem>
              <ListItem>Compte d'Usuari: El registre personal o institucional necessari per accedir als serveis, quan sigui aplicable.</ListItem>
          </UnorderedList>

          <Heading as='h3' size='xs'>
              1.4 Marc Legal
          </Heading>
          <Text>Aquests Termes es regeixen per la legislació espanyola. Quan es tractin dades personals de ciutadans de la UE, també s'aplicaran les disposicions del RGPD, amb la interpretació més protectora per als drets dels usuaris.</Text>

          <Heading as='h2' size='md' mt='50px'>
              2. Acceptació i Modificació dels Termes
          </Heading>
          <Heading as='h3' size='xs'>
              2.1 Acceptació
          </Heading>
          <Text>En accedir o utilitzar els serveis, l'usuari confirma que ha llegit, entès i accepta aquests Termes en la seva totalitat. Si no està d'acord, haurà d'abstenir-se d'utilitzar els serveis.</Text>

          <Heading as='h3' size='xs'>
              2.2 Modificació
          </Heading>
          <Text>Vegi apartat 9. Canvis als termes i modificacions.</Text>

          <Heading as='h2' size='md' mt='50px'>
              3. Ús dels Serveis i Comptes d'Usuari
          </Heading>
          <Heading as='h3' size='xs'>
              3.1 Prestació dels Serveis
          </Heading>
          <Text>L'Empresa proporciona serveis de votació digital per facilitar processos de decisió i participació. L'usuari es compromet a utilitzar els serveis d'acord amb aquests Termes, totes les lleis aplicables i qualsevol altra normativa o política que l'Empresa pugui establir.</Text>

          <Heading as='h3' size='xs'>
              3.2 Comptes d'Usuari
          </Heading>
          <UnorderedList>
              <ListItem>Creació i Gestió: Alguns serveis requereixen la creació d'un compte d'usuari. L'usuari haurà de proporcionar informació exacta i actualitzada, i es compromet a mantenir la confidencialitat de les seves credencials.</ListItem>
              <ListItem>Restriccions d'Accés: Cada compte és personal i no pot ser compartit sense el consentiment de l'usuari o d'un representant. L'usuari és responsable de totes les activitats que es duguin a terme des del seu compte.</ListItem>
          </UnorderedList>

          <Heading as='h3' size='xs'>
              3.3 Restriccions d'Ús
          </Heading>
          <Text>L'usuari no podrà:</Text>
          <UnorderedList>
              <ListItem>Utilitzar els serveis per a finalitats il·legals o contràries a aquests Termes.</ListItem>
              <ListItem>Compartir o vendre les seves credencials o comptes d'accés.</ListItem>
              <ListItem>Interferir amb la seguretat, integritat o funcionament dels serveis.</ListItem>
              <ListItem>Utilitzar les dades o els resultats dels processos de votació per a fins que puguin infringir drets de tercers o vulnerar la privacitat d'altres usuaris.</ListItem>
          </UnorderedList>

          <Heading as='h2' size='md' mt='50px'>
              4. Propietat Intel·lectual
          </Heading>
          <Heading as='h3' size='xs'>
              4.1 Drets de Propietat
          </Heading>
          <Text>Tot el contingut, incloent textos, gràfics, logotips, imatges, i programari relacionats amb els serveis, és propietat de l'Empresa o dels seus llicenciadors i està protegit per la legislació espanyola i internacional de propietat intel·lectual.</Text>

          <Heading as='h3' size='xs'>
              4.2 Restriccions
          </Heading>
          <Text>L'usuari no pot reproduir, distribuir, modificar o explotar cap contingut sense el consentiment previ i per escrit de l'Empresa, llevat que la llei ho permeti.</Text>

          <Heading as='h2' size='md' mt='50px'>
              5. Protecció de Dades i Privacitat
          </Heading>
          <Heading as='h3' size='xs'>
              5.1 Recollida i Emmagatzematge de Dades
          </Heading>
          <UnorderedList>
              <ListItem>Dades Necessàries: Es recullen i processen les dades personals estrictament necessàries per a la prestació dels serveis de votació digital.</ListItem>
              <ListItem>Emmagatzematge Segur: Totes les dades es guarden de forma xifrada per garantir la seva seguretat i s'eliminen un cop finalitzats els serveis.</ListItem>
              <ListItem>Metadades: En alguns casos, les metadades relacionades amb els processos de votació (p. ex., informació sobre organitzadors o votants) podrien ser emmagatzemades de manera pública en sistemes descentralitzats, sempre complint amb la normativa vigent.</ListItem>
              <ListItem>Dades Addicionals: Es podrà recollir informació addicional per complir amb obligacions legals o per oferir serveis especialitzats.</ListItem>
          </UnorderedList>

          <Heading as='h3' size='xs'>
              5.2 Ús i Consentiment
          </Heading>
          <Text>Les dades personals es processen exclusivament per proporcionar i millorar els serveis. Abans de realitzar tractaments addicionals (com activitats de màrqueting), es sol·licitarà el consentiment explícit de l'usuari.</Text>

          <Heading as='h3' size='xs'>
              5.3 Drets dels Usuaris
          </Heading>
          <Text>Els usuaris tenen dret a:</Text>
          <UnorderedList>
              <ListItem>Accedir a les seves dades.</ListItem>
              <ListItem>Sol·licitar-ne la correcció o eliminació.</ListItem>
              <ListItem>Demanar la restricció del tractament.</ListItem>
              <ListItem>Rebre les seves dades en un format estructurat.</ListItem>
              <ListItem>Oposar-se al tractament basat en interessos legítims.</ListItem>
              <ListItem>Presentar una queixa davant de l'autoritat de protecció de dades corresponent.</ListItem>
          </UnorderedList>

          <Heading as='h2' size='md' mt='50px'>
              6. Limitació i Exempció de Responsabilitat
          </Heading>
          <Heading as='h3' size='xs'>
              6.1 Descàrrec de Responsabilitat
          </Heading>
          <Text>L'Empresa es compromet a oferir serveis de qualitat, però no garanteix que els serveis siguin ininterromputs, lliures d'errors o complets. L'usuari assumeix el risc associat a l'ús dels serveis.</Text>

          <Heading as='h3' size='xs'>
              6.2 Limitació de Responsabilitat
          </Heading>
          <Text>En la màxima mesura permesa per la legislació espanyola, la responsabilitat total de l'Empresa (incloent-hi la dels seus afiliats, empleats i llicenciadors) per qualsevol reclamació no excedirà, en el període de 12 mesos, la quantitat que hagi abonat l'usuari pel servei que va donar lloc a la reclamació. Aquesta limitació inclou, sense que s'hi limiti, danys indirectes, accidentals o consequencials.</Text>

          <Heading as='h2' size='md' mt='50px'>
              7. Indemnització
          </Heading>
          <Heading as='h3' size='xs'>
              7.1 Indemnització per Part de l'Usuari
          </Heading>
          <Text>L'usuari es compromet a indemnitzar, defensar i mantenir indemne l'Empresa, així com els seus afiliats i proveïdors, davant qualsevol reclamació, dany o despesa (incloent els honoraris raonables d'advocats) derivada de:</Text>
          <UnorderedList>
              <ListItem>L'ús indegut dels serveis en contravenç d'aquests Termes.</ListItem>
              <ListItem>La presentació de dades o informació per part de l'usuari sense disposar dels drets o permisos necessaris.</ListItem>
          </UnorderedList>

          <Heading as='h3' size='xs'>
              7.2 Procediment d'Indemnització
          </Heading>
          <Text>L'usuari haurà de notificar de forma immediata qualsevol reclamació a l'Empresa, cooperant en la seva defensa. L'Empresa no podrà establir cap acord de resolució sense el previ consentiment per escrit de l'usuari, excepte si la resolució implica que l'usuari no rebi cap responsabilitat.</Text>

          <Heading as='h2' size='md' mt='50px'>
              8. Durada, Suspensió i Terminació
          </Heading>
          <Heading as='h3' size='xs'>
              8.1 Durada
          </Heading>
          <Text>Aquest acord entra en vigor en el moment que l'usuari comença a utilitzar els serveis i romandrà en vigor fins que sigui resolt per alguna de les parts.</Text>

          <Heading as='h3' size='xs'>
              8.2 Suspensió i Terminació
          </Heading>
          <Text>L'Empresa es reserva el dret de suspendre o resoldre l'accés als serveis en cas de:</Text>
          <UnorderedList>
              <ListItem>Incompliment d'aquests Termes per part de l'usuari.</ListItem>
              <ListItem>Incompliment de les obligacions de pagament, quan s'apliqui.</ListItem>
              <ListItem>Necessitat de complir amb obligacions legals o per motius de seguretat.</ListItem>
              <ListItem>Activitats que posin en risc la integritat o seguretat dels serveis, dels usuaris o de tercers.</ListItem>
          </UnorderedList>

          <Heading as='h3' size='xs'>
              8.3 Efectes de la Terminació
          </Heading>
          <Text>La terminació dels serveis no eximeix l'usuari de les obligacions acumulades fins a la data de terminació, incloent-hi les obligacions de pagament i els drets de propietat intel·lectual. Les clàusules que, per la seva naturalesa, han de romandre en vigor continuaran aplicant-se.</Text>

          <Heading as='h2' size='md' mt='50px'>
              9. Canvis als Termes i Notificacions
          </Heading>
          <Heading as='h3' size='xs'>
              9.1 Canvis als Termes
          </Heading>
          <Text>L'Empresa pot actualitzar aquests Termes periòdicament. Per canvis materials, es notificarà a l'usuari amb antelació (mínim 30 dies) mitjançant correu electrònic o notificació directa a la plataforma.</Text>

          <Heading as='h3' size='xs'>
              9.2 Notificacions
          </Heading>
          <Text>Qualsevol notificació o comunicació relativa als Termes es realitzarà a través dels canals oficials indicats per l'Empresa o al correu electrònic registrat per l'usuari.</Text>

          <Heading as='h2' size='md' mt='50px'>
              10. Disposicions Generals
          </Heading>
          <Heading as='h3' size='xs'>
              10.1 Assignació
          </Heading>
          <Text>L'usuari no pot cedir ni transferir cap dret o obligació derivada d'aquests Termes sense el consentiment previ i per escrit de l'Empresa. L'Empresa podrà cedir els seus drets a qualsevol afiliat, subsidiària o successor.</Text>

          <Heading as='h3' size='xs'>
              10.2 Força Major
          </Heading>
          <Text>Cap de les parts serà responsable per retards o incompliments derivats d'esdeveniments fora del seu control raonable, com ara desastres naturals, conflictes laborals o restriccions governamentals.</Text>

          <Heading as='h3' size='xs'>
              10.3 Relació entre les Parts
          </Heading>
          <Text>La relació establerta per aquests Termes és la d'un contracte independent. Cap clàusula d'aquests Termes implica la creació d'una relació de societat, associació, representació o agència entre les parts.</Text>

          <Heading as='h3' size='xs'>
              10.4 Drets de Tercers
          </Heading>
          <Text>Aquest acord no crea drets o beneficis a favor de tercers.</Text>

          <Heading as='h3' size='xs'>
              10.5 Renúncies i Acord Complet
          </Heading>
          <Text>La no aplicació o el retard en l'exercici d'algun dret en virtut d'aquests Termes no constitueix una renúncia a aquest dret. Aquests Termes constitueixen l'acord complet entre l'usuari i l'Empresa, substituint qualsevol acord o comunicació prèvia, ja sigui oral o escrita, rellevant al tema.</Text>

          <Heading as='h2' size='md' mt='50px'>
              11. Llei Aplicable i Jurisdicció
          </Heading>
          <Heading as='h3' size='xs'>
              11.1 Llei Aplicable
          </Heading>
          <Text>Aquests Termes es regiran per la legislació espanyola.</Text>

          <Heading as='h3' size='xs'>
              11.2 Jurisdicció
          </Heading>
          <Text>Qualsevol disputa derivada de l'ús dels serveis o d'aquests Termes serà sotmesa als tribunals de Catalunya, amb renúncia a qualsevol altre fur que pogués correspondre.</Text>

          <Heading as='h2' size='md' mt='50px'>
              12. Informació de Contacte
          </Heading>
          <Text>Per a qualsevol consulta o dubte relacionat amb aquests Termes o amb les pràctiques de seguretat i protecció de dades, si us plau, poseu-vos en contacte amb:</Text>
          <UnorderedList>
              <ListItem>Synergize SL</ListItem>
              <ListItem>Jaume I 65, Sant Celoni, Espanya</ListItem>
              <ListItem>legal@synergize.dev</ListItem>
          </UnorderedList>
        </Flex>
    );
};

export default Terms;
