import { Box, Flex, Grid, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import demoImg from '/assets/demo.png'
import vocdoniIcon from '/assets/vocdoni.png'
import { Trans, useTranslation } from 'react-i18next'
import { DemoData } from '~elements/landings/data'
import ProcessCardDetailed from '~components/Process/CardDetailed'
import { ElectionProvider, useElection } from '@vocdoni/react-providers'

const Demo = () => {
  const { t } = useTranslation()

  const startDate = new Date(DemoData.date)

  return (
    <Flex flexDirection='column' gap={10} maxW='900px' mx='auto' p={5} minH='100vh'>
      <Image src={demoImg} width='300px' alt='ajuntament berga escut' mx='auto' />
      <Box>
        <Text as='h1' fontWeight='bold' fontSize='36px' textAlign='center'>
          {DemoData.mainTitle}
        </Text>
        <Text as='h2' fontSize='16px' textAlign='center'>
          {DemoData.orgName}
        </Text>
      </Box>
      <Text>
        <Text as='h3' fontWeight='bold'>
          {t('demo.desc_title')}
        </Text>
        <Text>
          <Trans
            i18nKey='demo.desc_body'
            components={{
              br: <br />,
            }}
            values={{
              orgName: DemoData.orgName,
              date: startDate.toLocaleDateString(),
              time: startDate.toLocaleTimeString(),
            }}
          />
        </Text>
      </Text>
      <Box>
        <Text alignSelf='start' mb={10}>
          <Trans
            i18nKey='demo.select_an_option'
            components={{
              strong: <strong />,
            }}
          />
        </Text>
        <Grid templateColumns='repeat(auto-fill, minmax(350px, 1fr))' columnGap={{ base: 3, lg: 4 }} rowGap={12}>
          {DemoData.elections.map((election, idx) => (
            <ElectionProvider id={election}>
              <ElectionCard />
            </ElectionProvider>
          ))}
        </Grid>
      </Box>
      <Text>{t('demo.desc_footer')}</Text>
      <Flex justifyContent='center' mt='auto'>
        <Image src={vocdoniIcon} width='200px' alt='vocdoni logo' />
      </Flex>
    </Flex>
  )
}

const ElectionCard = () => {
  const { election } = useElection()
  if (!election) return
  return <ProcessCardDetailed election={election} />
}

export default Demo
