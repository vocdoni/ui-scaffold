import { Card, CardBody, CardHeader, Grid, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import bloock from '/assets/bloock.png'
import coec from '/assets/coec.png'
import decidim from '/assets/decidim.jpg'
import erc from '/assets/erc.svg'
import omnium from '/assets/omnium.png'
import pirates from '/assets/pirates.svg'

const Clients = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text color='#666' textAlign='center' mb='32px' fontWeight='bold' fontSize='18px'>
        {t('home.clients_title')}
      </Text>
      <Grid
        as='section'
        className='site-wrapper'
        maxW={{ base: '100%', sm: '70%', sm2: '60%', lg: '640px' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='center'
        mb={{ base: '60px', lg: '100px' }}
        gridTemplateColumns='repeat(5, 1fr)'
      >
        <Card variant='client'>
          <CardHeader>
            <Image src={barca} h={{ base: '35px', lg: '40px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>F.C. Barcelona</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={omnium} h={{ base: '35px', lg: '50px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Omnium Cultural</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={berga} h={{ base: '35px', lg: '45px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Berga</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bisbal} h={{ base: '35px', lg: '35px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament la Bisbal</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={coec} h={{ base: '35px', lg: '22px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>COEC</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={erc} h={{ base: '35px', lg: '25px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Esquerra Republicana</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bellpuig} h={{ base: '35px', lg: '35px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Bellpuig</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={pirates} h={{ base: '35px', lg: '35px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Partit Pirata</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={decidim} h={{ base: '35px', lg: '40px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Decidim</Text>
          </CardBody>
        </Card>

        <Card variant='client'>
          <CardHeader>
            <Image src={bloock} h={{ base: '35px', lg: '15px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Bloock</Text>
          </CardBody>
        </Card>
      </Grid>
    </>
  )
}
export default Clients
