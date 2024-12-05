import { Box, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Privacy = () => {
  const { t } = useTranslation()
  return (
    <>
      <Box mb={5}>
        <Heading as='h1' size='xl' mb={3}>
          {t('privacyPolicy.title')}
        </Heading>
        <Text>{t('privacyPolicy.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section1Title')}
        </Heading>
        <List spacing={2}>
          <ListItem>
            <Text>
              <strong>1.1</strong> {t('privacyPolicy.section1.item1')}
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>1.2</strong> {t('privacyPolicy.section1.item2')}
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>1.3</strong> {t('privacyPolicy.section1.item3')}
            </Text>
          </ListItem>
        </List>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section2Title')}
        </Heading>
        <Text>{t('privacyPolicy.section2.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section3Title')}
        </Heading>
        <Text>{t('privacyPolicy.section3.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section4Title')}
        </Heading>
        <Text>{t('privacyPolicy.section4.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section5Title')}
        </Heading>
        <Text>{t('privacyPolicy.section5.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section6Title')}
        </Heading>
        <Text>{t('privacyPolicy.section6.description')}</Text>
      </Box>

      <Box mb={5}>
        <Heading as='h2' size='lg' mb={2}>
          {t('privacyPolicy.section7Title')}
        </Heading>
        <Text>
          {t('privacyPolicy.section7.description')}{' '}
          <Link href='mailto:privacy@vocdoni.org' color='teal.500'>
            privacy@vocdoni.org
          </Link>
          .
        </Text>
      </Box>
    </>
  )
}

export default Privacy
