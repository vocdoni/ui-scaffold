import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const PxLL = () => {
  return (
    <Flex flexDirection='column' gap={10} maxW='900px' mx='auto' p={5} minH='100vh'>
      <Image src="https://cdn.discordapp.com/attachments/1077657962404925583/1210156328253661217/votacions_cap.jpg?ex=65e988e8&is=65d713e8&hm=e4d3249fc3c2cdc01431a1910830d1b2c2c73bb946c1031facfd0e97b8897561&" alt='Assemblea General de socis' mx='auto' />
      <Box>
        <Text as='h1' fontWeight='bold' fontSize='36px' textAlign='center'>
          Assemblea General Ordinària
        </Text>
        <Text as='h2' fontSize='16px' textAlign='center'>
          Plataforma per la Llengua <i>(16/03/2024)</i>
        </Text>
      </Box>
      <Text>
        <Text as='h3' fontWeight='bold'>
          Ordre del dia de l’Assemblea General Ordinària<br /><br />
        </Text>
        <Text>
          <ul style={{ marginLeft: '30px' }}>
            <li>Pregunta 1: Aprovació, si escau, de l'acta de l'anterior assemblea.</li>
            <li>Pregunta 2: Aprovació, si escau, del Reglament electoral.</li>
            <li>Pregunta 3: Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.</li>
            <li>Pregunta 4: Aprovació, si escau, del projecte d'activitats 2023.</li>
            <li>Pregunta 5: Aprovació, si escau, de l'estat de comptes 2023.</li>
            <li>Pregunta 6: Aprovació, si escau, del Pla d'activitats 2024.</li>
            <li>Pregunta Pregunta 7: Aprovació, si escau, del Pressupost de l'entitat 2024.</li>
            <li>Pregunta 8: Ratificació de les incorporacions per substitució a l'Executiva 2024-2026.</li>
            <li>Pregunta 9: Elecció de nous membres de l'Executiva 2024-2028.</li>
          </ul>
        </Text>
      </Text>
      <Text>
        <Text as='h3' fontWeight='bold'>
          Extra<br /><br />
        </Text>
        <Text style={{ marginLeft: '30px' }}>
          - Enllaç a documentació externa: <a href='https://www.plataforma-llengua.cat/ago-2024-documentacio/' target='_blank'>Documentació</a>
          <br />
          - Enllaç a plataforma de precs i preguntes: <a href='www.plataforma-llengua.cat/ago-2024-precs-i-preguntes' target='_blank'>Precs i Preguntes</a>
        </Text>
      </Text>
      <Box style={{ margin: '0px auto' }}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ydYDqZQpim8?si=uW5Rm_QpzMjklFee" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </Box>
      <Box>
        <Text alignSelf='start' mb={10} as='h3' fontWeight='bold'>
          <br />Votacions:
        </Text>
        <Flex gap={5} flexDirection={{ base: 'column' }}>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/4ae20a8eb4ca63ca71be6765bc582f254eb1c49cf9739bbf798e020400000001'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 1: Aprovació, si escau, de l'acta de l'anterior assemblea.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4ca802371242855fb0f936714040c24d7dd6f0c9233020400000001'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 2: Aprovació, si escau, del Reglament electoral.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4ca802371242855fb0f936714040c24d7dd6f0c9233020400000000'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 3: Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4ca56b4f11f211c1681b5a7d4b692e4cf8917473f2b020400000001'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 4: Aprovació, si escau, del projecte d'activitats 2023.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4ca56b4f11f211c1681b5a7d4b692e4cf8917473f2b020400000000'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 5: Aprovació, si escau, de l'estat de comptes 2023.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4caf3acd866acef2f606cacc7070903bbcc36b841bc020400000001'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 6: Aprovació, si escau, del Pla d'activitats 2024.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4caf3acd866acef2f606cacc7070903bbcc36b841bc020400000000'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 7: Aprovació, si escau, del Pressupost de l'entitat 2024.</Text>
            </Box>
          </Link>

          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4cad3b60bc14cefdb184e8a7a05c537429c486fd629020400000001'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 8: Ratificació de les incorporacions per substitució a l'Executiva 2024-2026.</Text>
            </Box>
          </Link>


          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            mb={{ md: 50 }}
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='https://65e5b71855889b0b69cec810--vocdoni-app-stg.netlify.app/processes/0x4ae20a8eb4cad3b60bc14cefdb184e8a7a05c537429c486fd629020400000000'
            target='_blank'
          >
            <Box>
              <Text fontSize='18px'>Pregunta 9: Elecció de nous membres de l'Executiva 2024-2028.</Text>
            </Box>
          </Link>
        </Flex>
      </Box>
      <Text style={{ marginBottom: '150px' }}>
        Per poder accedir a la votació, heu de pulsar sobre "Identificar-se", us demanarem el vostre número de DNI (Document Nacional d'Identitat). Posteriorment, podreu seleccionar les vostres opcions i enviar el vot de forma segura.
      </Text>
    </Flex>
  )
}

export default PxLL
