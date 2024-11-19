import { Card, CardBody, CardHeader, Grid, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Wrapper from '~components/Layout/Wrapper'

type FeaturesItem = {
  title: string
  description: string
}

const Features = () => {
  const { t } = useTranslation()
  const featuresItems: FeaturesItem[] = [
    {
      title: t('features.secure_voting_title', { defaultValue: 'Secure Voting' }),
      description: t('features.secure_voting_description', {
        defaultValue: 'End-to-end encryption ensures the integrity and confidentiality of every vote.',
      }),
    },
    {
      title: t('features.real_time_results_title', { defaultValue: 'Real-time Results' }),
      description: t('features.real_time_results_description', {
        defaultValue: 'Instally vote tallying and result visualization as the election progresses.',
      }),
    },
    {
      title: t('features.customizable_ballots_title', { defaultValue: 'Customizable Ballots' }),
      description: t('features.customizable_ballots_description', {
        defaultValue: 'Create complex voting scenarios with our flexible ballot designer.',
      }),
    },
    {
      title: t('features.voter_authentication_title', { defaultValue: 'Voter Authentication' }),
      description: t('features.voter_authentication_description', {
        defaultValue: 'Multi-factor authentication options to verify voter identity.',
      }),
    },
    {
      title: t('features.audit_trail_title', { defaultValue: 'Audit Trail' }),
      description: t('features.voter_authentication_description', {
        defaultValue: 'Comprehensive logs and resports for full transparency and verifiability.',
      }),
    },
    {
      title: t('features.accesibility_title', { defaultValue: 'Accesibility' }),
      description: t('features.accesibility_description', {
        defaultValue: 'WCAG 2.1 compliant interface, ensuring voting access for all users.',
      }),
    },
  ]
  return (
    <Wrapper as='section' display={'block'} py={10}>
      <Text mx='auto' w='fit-content' mb={10}>
        {t('features', { defaultValue: 'Key Features' })}
      </Text>
      <Grid gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
        {featuresItems.map((item, index) => (
          <Card key={index} variant={'features'}>
            <CardHeader>{item.title}</CardHeader>
            <CardBody>{item.description}</CardBody>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default Features
