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
      <Text textAlign='center' mb={'40px'} fontFamily='basier' fontSize='18px' fontWeight='400'>
        {t('home.clients_title')}
      </Text>
      <ClientsGrid />
    </>
  )
}

export const ClientsGrid = (props: GridProps) => {
  const { t } = useTranslation()

  return (
    <Grid
      as='section'
      maxWidth={'1400px'}
      mx='auto'
      mb={{ base: '40px', lg: '80px' }}
      px={{
        base: 2,
        sm: 4,
        lg: 6,
      }}
      gridTemplateColumns={{ base: 'repeat(5, 1fr)', md: 'repeat(10, 1fr)' }}
      justifyContent={'end'}
      w='full'
      {...props}
    >
      <Card variant='client'>
        <CardHeader>
          <Image src={barca} h={'40px'} alt={t('alt.images.barca')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>F.C. Barcelona</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={omnium} h={'57px'} alt={t('alt.images.omnium')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Omnium Cultural</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={berga} h={'41px'} alt={t('alt.images.berga')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Ajuntament Berga</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={bisbal} h={'33px'} alt={t('alt.images.bisbal')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Ajuntament la Bisbal</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={coec} h={'20px'} alt={t('alt.images.coec')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>COEC</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={erc} h={'32px'} alt={t('alt.images.esquerra')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Esquerra Republicana</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={bellpuig} h={'33px'} alt={t('alt.images.bellpuig')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Ajuntament Bellpuig</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={ticanoia} h={'18px'} alt={t('alt.images.ticanoia')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>TIC Anoia</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={decidim} h={'30px'} alt={t('alt.images.decidim')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Decidim</Text>
        </CardBody>
      </Card>
      <Card variant='client'>
        <CardHeader>
          <Image src={bloock} h={'17px'} alt={t('alt.images.bloock')} />
        </CardHeader>
        <CardBody>
          <Text as='span'>Bloock</Text>
        </CardBody>
      </Card>
    </Grid>
  )
}

export default Clients
