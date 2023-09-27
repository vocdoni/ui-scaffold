import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Claim } from '@components/Faucet/Claim'

const Faucet = () => {
  const { t } = useTranslation()

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
            <CardBody>
              <Heading as={'h2'} size={'sm'}>
                {t('faucet.request_tokens.title')}
              </Heading>
              <Text variant='p' mb={5} mt={5}>
                {t('faucet.request_tokens.description')}
              </Text>

              <Claim />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem display='flex' justifyContent='center' alignItems='center' mt={10}>
          <Card width={'80%'}>
            <CardBody>
              <Heading as={'h2'} size={'sm'}>
                {t('faucet.general_information.title')}
              </Heading>
              <Text variant='p' mb={5} mt={5}>
                {t('faucet.general_information.description')}
              </Text>
              <Text variant='p' mb={10}>
                {t('faucet.general_information.description2')}
              </Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Faucet
