import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Icon, Img, Text, Link } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import onvote from '/assets/governance-onvote.png'
import farcaster from '/assets/governance-farcaster.png'
import daoplugins from '/assets/governance-daoplugins.png'
import others from '/assets/governance-others.png'
import { Link as ReactRouterLink } from 'react-router-dom'
import { TFunction } from 'i18next'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

interface IGovernanceCardProps {
  buttonText: string
  buttonColor: string
  buttonAction: string | (() => void)
  title: string
  description: string
  image: string
}

const Governance = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const cards: IGovernanceCardProps[] = useMemo(
    () => [
      {
        buttonText: !isConnected ? t('menu.login') : t('web3cards.onvote.btn'),
        buttonColor: 'web3_cta.onvote',
        buttonAction: !isConnected
          ? () => {
              if (openConnectModal) openConnectModal()
            }
          : 'processes/create',
        title: t('web3cards.onvote.title'),
        description: t('web3cards.onvote.description'),
        image: onvote,
      },
      {
        buttonText: t('web3cards.farcaster.btn'),
        buttonColor: 'web3_cta.farcaster',
        buttonAction: 'https://farcaster.vote',
        title: t('web3cards.farcaster.title'),
        description: t('web3cards.farcaster.description'),
        image: farcaster,
      },
      {
        buttonText: t('web3cards.plugins.btn'),
        buttonColor: 'web3_cta.plugins',
        buttonAction: 'https://app.aragon.org',
        title: t('web3cards.plugins.title'),
        description: t('web3cards.plugins.description'),
        image: daoplugins,
      },
      {
        buttonText: t('web3cards.others.btn'),
        buttonColor: 'web3_cta.others',
        buttonAction: 'mailto:info@vocdoni.org',
        title: t('web3cards.others.title'),
        description: t('web3cards.others.description'),
        image: others,
      },
    ],
    [t, isConnected, openConnectModal]
  )

  return (
    <>
      <Text
        as='h1'
        fontSize={{ base: '25px', lg: '35px' }}
        textAlign='center'
        lineHeight='44px'
        fontFamily='pixeloidsans'
        fontWeight={'bold'}
        mb={14}
      >
        {t('web3cards.title')}
      </Text>
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
                <Text>{card.title}</Text>
                <Text>
                  <Trans
                    i18nKey={card.description}
                    components={{
                      b: <strong />,
                      br: <br />,
                    }}
                  />
                </Text>
              </CardBody>
              <CardFooter>
                {typeof card.buttonAction === 'string' ? (
                  <Button as={ReactRouterLink} variant={'try-it-now'} bgColor={card.buttonColor} to={card.buttonAction}>
                    {card.buttonText}
                  </Button>
                ) : (
                  <Button variant={'try-it-now'} bgColor={card.buttonColor} onClick={card.buttonAction}>
                    {card.buttonText}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </Flex>
    </>
  )
}

export default Governance
