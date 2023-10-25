import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { Claim } from '~components/Faucet/Claim'

const Faucet = () => {
  const { t } = useTranslation()
  const { account } = useClient()

  return (
    <Flex direction='column' gap={4}>
      <Grid templateColumns={'repeat(1, 1fr)'} gap={2}>
        <GridItem display='flex' justifyContent='center' alignItems='center'>
          <Box width={'80%'}>
            <Heading as={'h1'} size={'xl'}>
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
              <Heading as={'h2'} size={'sm'}>
                {t('faucet.request_tokens.title')}
              </Heading>
              <Text>
                {account ? (
                  <Text>
                    <Trans i18nKey='faucet.tokens_you_own' values={{ balance: account?.balance }} />
                    {` `}
                    <Trans
                      i18nKey='faucet.request_description'
                      components={{
                        span: <Text as='span' />,
                      }}
                      values={{ balance: account?.balance }}
                    />
                  </Text>
                ) : (
                  <Trans i18nKey='faucet.login_first' />
                )}
              </Text>
              <Claim />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem display='flex' justifyContent='center' alignItems='center' mt={10}>
          <Card width={'80%'}>
            <CardBody display='flex' flexDir='column' gap={3}>
              <Heading as={'h2'} size={'sm'}>
                {t('faucet.general_information.title')}
              </Heading>
              <Text variant='p'>
                {t('faucet.general_information.description', {
                  amount: import.meta.env.FAUCET_AMOUNT,
                })}
              </Text>
              <Text variant='p'>
                {t('faucet.general_information.description2', {
                  amount: import.meta.env.FAUCET_AMOUNT,
                })}
              </Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Faucet
