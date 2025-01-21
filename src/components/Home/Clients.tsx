import { Card, CardBody, CardHeader, Grid, GridProps, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import bloock from '/assets/bloock.png'
import coec from '/assets/coec.png'
import decidim from '/assets/decidim.png'
import erc from '/assets/erc.svg'
import omnium from '/assets/omnium.png'
import ticanoia from '/assets/ticanoia.png'

const Clients = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text textAlign='center' mb='52px' fontFamily='basier' fontSize='23px'>
        {t('home.clients_title')}
      </Text>
      <ClientsGrid />
    </>
  )
}

export const ClientsGrid = (props: GridProps) => (
  <Grid
    as='section'
    width='full'
    m='0 auto'
    maxW={{ base: '100%', sm: '80%', lg: '900px' }}
    flexDirection={{ base: 'column', sm: 'row' }}
    justifyContent='center'
    mb={{ base: '60px', lg: '100px' }}
    gridTemplateColumns='repeat(5, 1fr)'
    gridRowGap={{ base: '0px', sm: '30px', lg: '50px' }}
    {...props}
  >
    <Card variant='client'>
      <CardHeader>
        <Image src={barca} h={{ base: '45.5px', sm2: '65px', lg: '70px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>F.C. Barcelona</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={omnium} h={{ base: '52.5px', sm2: '75px', lg: '87px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Omnium Cultural</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={berga} h={{ base: '49px', sm2: '70px', lg: '81px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament Berga</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bisbal} h={{ base: '50px', sm2: '72px', lg: '83px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament la Bisbal</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={coec} h={{ base: '24.5px', sm2: '35px', lg: '45px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>COEC</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={erc} h={{ base: '26.5px', sm2: '38px', lg: '52px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Esquerra Republicana</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bellpuig} h={{ base: '50px', sm2: '72px', lg: '83px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament Bellpuig</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={ticanoia} h={{ base: '18px', sm2: '26px', lg: '32px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>TIC Anoia</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={decidim} h={{ base: '43.5px', sm2: '62px', lg: '70px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Decidim</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bloock} h={{ base: '24.5px', sm2: '35px', lg: '33px' }} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Bloock</Text>
      </CardBody>
    </Card>
  </Grid>
)

export default Clients
