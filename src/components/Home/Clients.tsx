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
      <Text textAlign='center' mb={'40px'} fontFamily='basier' fontSize='23px' fontWeight='400'>
        {t('home.clients_title')}
      </Text>
      <ClientsGrid />
    </>
  )
}

export const ClientsGrid = (props: GridProps) => (
  <Grid
    as='section'
    maxWidth={'1400px'}
    mx='auto'
    mb={{ base: '45px', lg: '60px' }}
    px={{
      base: 2,
      sm: 4,
      lg: 6,
    }}
    gridTemplateColumns={{ base: 'repeat(5, 1fr)', md: 'repeat(10, 1fr)' }}
    justifyContent={'end'}
    {...props}
  >
    <Card variant='client'>
      <CardHeader>
        <Image src={barca} h={'40px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>F.C. Barcelona</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={omnium} h={'57px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Omnium Cultural</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={berga} h={'41px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament Berga</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bisbal} h={'33px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament la Bisbal</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={coec} h={'20px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>COEC</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={erc} h={'32px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Esquerra Republicana</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bellpuig} h={'33px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Ajuntament Bellpuig</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={ticanoia} h={'18px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>TIC Anoia</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={decidim} h={'30px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Decidim</Text>
      </CardBody>
    </Card>
    <Card variant='client'>
      <CardHeader>
        <Image src={bloock} h={'17px'} />
      </CardHeader>
      <CardBody>
        <Text as='span'>Bloock</Text>
      </CardBody>
    </Card>
  </Grid>
)

export default Clients
