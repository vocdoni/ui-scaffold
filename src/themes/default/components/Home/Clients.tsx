import { Card, CardBody, CardHeader, Grid, Image, Text } from '@chakra-ui/react'
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
      <Text color='home.description' textAlign='center' mb='52px' mt='100px' fontFamily='basier' fontSize='23px'>
        {t('home.clients_title')}
      </Text>
      <Grid
        as='section'
        className='site-wrapper'
        maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '900px' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='center'
        mb={{ base: '60px' }}
        gridTemplateColumns='repeat(5, 1fr)'
        gridRowGap='50px'
      >
        <Card variant='client'>
          <CardHeader>
            <Image src={barca} h={{ base: '32.5px', sm2: '65px', lg: '70px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>F.C. Barcelona</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={omnium} h={{ base: '27.5px', sm2: '75px', lg: '87px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Omnium Cultural</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={berga} h={{ base: '35px', sm2: '70px', lg: '81px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Berga</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bisbal} h={{ base: '36px', sm2: '72px', lg: '83px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament la Bisbal</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={coec} h={{ base: '17.5px', sm2: '35px', lg: '45px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>COEC</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={erc} h={{ base: '19px', sm2: '38px', lg: '52px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Esquerra Republicana</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bellpuig} h={{ base: '36px', sm2: '72px', lg: '83px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Bellpuig</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={ticanoia} h={{ base: '13px', sm2: '26px', lg: '32px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>TIC Anoia</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={decidim} h={{ base: '31px', sm2: '62px', lg: '70px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Decidim</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bloock} h={{ base: '17.5px', sm2: '35px', lg: '33px' }} />
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
