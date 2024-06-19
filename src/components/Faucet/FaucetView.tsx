import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { Claim } from '~components/Faucet/Claim'

type FaucetViewProps = {
  amount: number
  waitHours: number
}

export const FaucetView = ({ amount, waitHours }: FaucetViewProps) => {
  const { t } = useTranslation()
  const { account } = useClient()

  return (
    <>
      <Grid templateColumns={'repeat(1, 1fr)'} gap={2}>
        <GridItem display='flex' justifyContent='center' alignItems='center'>
          <Box width={'80%'}>
            <Heading as={'h2'} className='brand-theme' size={'xl'} textTransform='uppercase'>
              {t('faucet.title')}
            </Heading>
            <Text variant='p' mt={10} mb={10}>
              {t('faucet.description')}
            </Text>
          </Box>
        </GridItem>
        <GridItem display='flex' justifyContent='center' alignItems='center'>
          <Card width={'80%'}>
            <CardBody display='flex' flexDir='column' gap={3}>
              <Heading as={'h2'} className='brand-theme' size={'sm'} textTransform='uppercase'>
                {t('faucet.request_tokens.title')}
              </Heading>
              <Box>
                {account && (
                  <Text>
                    <Trans i18nKey='faucet.tokens_you_own' values={{ balance: account?.balance }} />
                  </Text>
                )}
              </Box>
              <Claim />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem display='flex' justifyContent='center' alignItems='center' mt={10}>
          <Card width={'80%'}>
            <CardBody display='flex' flexDir='column' gap={3}>
              <Heading as={'h2'} className='brand-theme' size={'sm'} textTransform='uppercase'>
                {t('faucet.general_information.title')}
              </Heading>
              <Text variant='p'>
                {t('faucet.general_information.description', {
                  amount,
                  waitHours,
                })}
              </Text>
              <Text variant='p'>{t('faucet.general_information.description2')}</Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}
