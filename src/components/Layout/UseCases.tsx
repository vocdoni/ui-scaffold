import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Routes } from '~src/router/routes'
import cityCouncilImg from '/assets/city_council.png'
import coopsImg from '/assets/coop.png'
import organizationsImg from '/assets/org.png'
import politicalPartyImg from '/assets/political_party.png'
import sportClubsImg from '/assets/sport_club.png'
import web3Img from '/assets/web3.png'

type UseCasesItem = {
  category: string
  label: string
  description: string
  url: string
  route: string
}

const UseCases = () => {
  return <Box>Use Cases</Box>
}

export const useCases = (): UseCasesItem[] => {
  const { t } = useTranslation()

  return [
    {
      category: t('use_cases.insitutions_tab', { defaultValue: 'Institutions and Public Sector' }),
      label: t('use_cases.insitutions_label', { defaultValue: 'City Councils' }),
      description: t('use_cases.insitutions_description', {
        defaultValue: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      }),
      url: cityCouncilImg,
      route: Routes.useCases.cityCouncils,
    },
    {
      category: t('use_cases.cooperatives_tab', { defaultValue: 'Professional Colleges' }),
      label: t('use_cases.cooperatives_label', { defaultValue: 'Organizations' }),
      description: t('use_cases.cooperatives_description', {
        defaultValue:
          "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      }),
      url: organizationsImg,
      route: Routes.useCases.organizations,
    },
    {
      category: t('use_cases.organizations_tab', { defaultValue: 'Software Engineering' }),
      label: t('use_cases.organizations_label', { defaultValue: 'Political Parties' }),
      description: t('use_cases.organizations_description', {
        defaultValue:
          'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      }),
      url: politicalPartyImg,
      route: Routes.useCases.politicalParties,
    },
    {
      category: t('use_cases.sports_and_recreations_tab', { defaultValue: 'Product' }),
      label: t('use_cases.sports_and_recreations_label', { defaultValue: 'Co-ops' }),
      description: t('use_cases.sports_and_recreations_description', {
        defaultValue: 'Mental models are simple expressions of complex processes or relationships.',
      }),
      url: coopsImg,
      route: Routes.useCases.coOps,
    },
    {
      category: t('use_cases.community_groups_tab', { defaultValue: 'Design' }),
      label: t('use_cases.community_groups_label', { defaultValue: 'Web3' }),
      description: t('use_cases.community_groups_description', {
        defaultValue: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
      }),
      url: web3Img,
      route: Routes.useCases.web3,
    },
    {
      category: t('use_cases.community_groups_tab', { defaultValue: 'Software Engineering' }),
      label: t('use_cases.community_groups_label', { defaultValue: 'Sport Clubs' }),
      description: t('use_cases.community_groups_description', {
        defaultValue: 'Javascript frameworks make development easy with extensive features and functionalities.',
      }),
      url: sportClubsImg,
      route: Routes.useCases.sportClubs,
    },
  ]
}

export default UseCases
