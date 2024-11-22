import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { t } from 'i18next'

const Terms = () => (
  <>
    <Heading as='h1' size='xl'>
      {t('terms.title')}
    </Heading>

    <Heading as='h2' size='lg'>
      {t('terms.section1Title')}
    </Heading>
    <Text>{t('terms.section1.description1')}</Text>
    <Text>{t('terms.section1.description2')}</Text>

    <Heading as='h2' size='lg'>
      {t('terms.section2Title')}
    </Heading>
    <Text>{t('terms.section2.description')}</Text>
    <UnorderedList>
      <ListItem>{t('terms.section2.item1')}</ListItem>
      <ListItem>{t('terms.section2.item2')}</ListItem>
      <ListItem>{t('terms.section2.item3')}</ListItem>
      <ListItem>{t('terms.section2.item4')}</ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      {t('terms.section3Title')}
    </Heading>
    <UnorderedList>
      <ListItem>{t('terms.section3.item1')}</ListItem>
      <ListItem>{t('terms.section3.item2')}</ListItem>
      <ListItem>{t('terms.section3.item3')}</ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      {t('terms.section4Title')}
    </Heading>
    <UnorderedList>
      <ListItem>{t('terms.section4.item1')}</ListItem>
      <ListItem>{t('terms.section4.item2')}</ListItem>
      <ListItem>{t('terms.section4.item3')}</ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      {t('terms.section5Title')}
    </Heading>
    <Text>{t('terms.section5.description1')}</Text>
    <Text>{t('terms.section5.description2')}</Text>

    <Heading as='h2' size='lg'>
      {t('terms.section6Title')}
    </Heading>
    <UnorderedList>
      <ListItem>{t('terms.section6.item1')}</ListItem>
      <ListItem>{t('terms.section6.item2')}</ListItem>
      <ListItem>{t('terms.section6.item3')}</ListItem>
      <ListItem>{t('terms.section6.item4')}</ListItem>
      <ListItem>{t('terms.section6.item5')}</ListItem>
      <ListItem>{t('terms.section6.item6')}</ListItem>
      <ListItem>{t('terms.section6.item7')}</ListItem>
    </UnorderedList>
    <Text>{t('terms.section6.description')}</Text>

    <Heading as='h2' size='lg'>
      {t('terms.section7Title')}
    </Heading>
    <Text>{t('terms.section7.description1')}</Text>
    <Text>{t('terms.section7.description2')}</Text>

    <Heading as='h2' size='lg'>
      {t('terms.section8Title')}
    </Heading>
    <UnorderedList>
      <ListItem>{t('terms.section8.item1')}</ListItem>
      <ListItem>{t('terms.section8.item2')}</ListItem>
    </UnorderedList>

    <Heading as='h2' size='lg'>
      {t('terms.section9Title')}
    </Heading>
    <Text>{t('terms.section9.description1')}</Text>
    <Text>{t('terms.section9.description2')}</Text>
  </>
)

export default Terms
