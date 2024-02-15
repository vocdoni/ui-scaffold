import { Card, CardBody, CardHeader, Grid, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import decidim from '/assets/decidim.jpg'
import omnium from '/assets/omnium.png'
import pirates from '/assets/pirates.svg'
import erc from '/assets/erc.svg'
import coec from '/assets/coec.png'
import bloock from '/assets/bloock.png'

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
            <Image src={barca} w={{ base: '30px', lg: '45px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>F.C. Barcelona</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={berga} w={{ base: '17.4px', lg: '26px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Berga</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={omnium} w={{ base: '30px', lg: '48px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Omnium Cultural</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={decidim} w={{ base: '30px', lg: '45px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Decidim</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={coec} w={{ base: '30px', lg: '58px' }} mt="3" />
          </CardHeader>
          <CardBody>
            <Text as='span'>COEC</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={erc} w={{ base: '30px', lg: '48px' }} mt="1" />
          </CardHeader>
          <CardBody>
            <Text as='span'>Esquerra Republicana</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bellpuig} w={{ base: '24px', lg: '36px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament Bellpuig</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={pirates} w={{ base: '72px', lg: '108px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Partit Pirata</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bisbal} w={{ base: '22px', lg: '33px' }} />
          </CardHeader>
          <CardBody>
            <Text as='span'>Ajuntament la Bisbal</Text>
          </CardBody>
        </Card>
        <Card variant='client'>
          <CardHeader>
            <Image src={bloock} w={{ base: '44px', lg: '58px' }} mt="3" />
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
