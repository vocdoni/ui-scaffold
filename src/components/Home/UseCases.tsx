import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type UseCasesItem = {
  tab: string
  title: string
  description: string
}

const UseCases = () => {
  const { t } = useTranslation()
  const useCasesItems: UseCasesItem[] = [
    {
      tab: t('use_cases.insitutions_tab', { defaultValue: 'Institutions' }),
      title: t('use_cases.insitutions_title', { defaultValue: 'Universities & Governemnts' }),
      description: t('use_cases.insitutions_description', {
        defaultValue:
          'Streamline student body elections, faculty votes, and public referendums with our secure and scalable platform.',
      }),
    },
    {
      tab: t('use_cases.cooperatives_tab', { defaultValue: 'Cooperatives' }),
      title: t('use_cases.cooperatives_title', { defaultValue: 'Cooperatives' }),
      description: t('use_cases.cooperatives_description', {
        defaultValue:
          'Streamline student body elections, faculty votes, and public referendums with our secure and scalable platform.',
      }),
    },
    {
      tab: t('use_cases.organizations_tab', { defaultValue: 'Organizations' }),
      title: t('use_cases.organizations_title', { defaultValue: 'Organizations' }),
      description: t('use_cases.organizations_description', {
        defaultValue:
          'Streamline student body elections, faculty votes, and public referendums with our secure and scalable platform.',
      }),
    },
    {
      tab: t('use_cases.sports_and_recreations_tab', { defaultValue: 'Sports and Recreations' }),
      title: t('use_cases.sports_and_recreations_title', { defaultValue: 'Sports and Recreations' }),
      description: t('use_cases.sports_and_recreations_description', {
        defaultValue:
          'Streamline student body elections, faculty votes, and public referendums with our secure and scalable platform.',
      }),
    },
    {
      tab: t('use_cases.community_groups_tab', { defaultValue: 'Community Groups' }),
      title: t('use_cases.community_groups_title', { defaultValue: 'Community Groups' }),
      description: t('use_cases.community_groups_description', {
        defaultValue:
          'Streamline student body elections, faculty votes, and public referendums with our secure and scalable platform.',
      }),
    },
  ]
  return (
    <Box
      as='section'
      width='full'
      m='0 auto'
      maxW='1920px'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      py={10}
    >
      <Text mx='auto' w='fit-content' mb={10}>
        {t('use_cases', { defaultValue: 'Use Cases' })}
      </Text>
      <Tabs variant='use-cases'>
        <TabList>
          {useCasesItems.map((item, index) => (
            <Tab key={index}>{item.tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {useCasesItems.map((item, index) => (
            <TabPanel key={index}>
              <Heading>{item.title}</Heading>
              <Text>{item.description}</Text>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default UseCases
