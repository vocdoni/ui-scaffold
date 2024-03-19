import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Icon, Img, Text, Link } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import onvote from '/assets/governance-onvote.png'
import farcaster from '/assets/governance-farcaster.png'
import daoplugins from '/assets/governance-daoplugins.png'
import others from '/assets/governance-others.png'

interface IGovernanceCardProps {
  buttonText: string
  buttonColor: string
  buttonLink: string
  title: string
  description: string
  image: string
}

const governanceCards = (): IGovernanceCardProps[] => {
  return [
    {
      buttonText: 'web3cards.try',
      buttonColor: 'web3_cta.onvote',
      buttonLink: 'processes/create',
      title: 'web3cards.onvote.title',
      description: 'web3cards.onvote.description',
      image: onvote,
    },
    {
      buttonText: 'web3cards.try',
      buttonColor: 'web3_cta.farcaster',
      buttonLink: 'https://farcaster.vote',
      title: 'web3cards.farcaster.title',
      description: 'web3cards.farcaster.description',
      image: farcaster,
    },
    {
      buttonText: 'web3cards.try',
      buttonColor: 'web3_cta.plugins',
      buttonLink: 'https://app.aragon.org',
      title: 'web3cards.plugins.title',
      description: 'web3cards.plugins.description',
      image: daoplugins,
    },
    {
      buttonText: 'web3cards.contact',
      buttonColor: 'web3_cta.others',
      buttonLink: 'mailto:info@vocdoni.org',
      title: 'web3cards.others.title',
      description: 'web3cards.others.description',
      image: others,
    },
  ]
}

const Governance = () => {
  const { t } = useTranslation()
  const cards = useMemo(governanceCards, [])

  return (
    <Flex className='voting-type' maxW={'100%'} gap={8} justifyContent={'center'}>
      {cards.map((card, i) => {
        return (
          <Card key={i} variant='image-card'>
            <CardHeader>
              <Box>
                <Img src={card.image} position='absolute' />
              </Box>
            </CardHeader>
            <CardBody>
              <Text>{t(card.title)}</Text>
              <Text>
                <Trans
                  i18nKey={t(card.description)}
                  components={{
                    b: <strong />,
                    br: <br />,
                  }}
                />
              </Text>
            </CardBody>
            <CardFooter>
              <Button variant={'try-it-now'} bgColor={card.buttonColor}>
                {t(card.buttonText)}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </Flex>
  )
}

export default Governance
