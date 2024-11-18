import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Routes } from '~src/router/routes'

type UseCasesItem = {
  title: string
  childrens: Array<{ section: string; url: string }>
}

const Footer = () => {
  const { t } = useTranslation()

  const useCasesItems: UseCasesItem[] = [
    {
      title: t('footer.product.title', { defaultValue: 'Product' }),
      childrens: [
        {
          section: t('footer.product.features', { defaultValue: 'Features' }),
          url: Routes.features,
        },
        {
          section: t('footer.product.pricing', { defaultValue: 'Pricing' }),
          url: Routes.pricing,
        },
        {
          section: t('footer.product.security', { defaultValue: 'Security' }),
          url: Routes.security,
        },
      ],
    },
    {
      title: t('footer.company.title', { defaultValue: 'Company' }),
      childrens: [
        {
          section: t('footer.company.about_us', { defaultValue: 'About Us' }),
          url: Routes.aboutUs,
        },
        {
          section: t('footer.company.blog', { defaultValue: 'Blog' }),
          url: Routes.blog,
        },
        {
          section: t('footer.company.careers', { defaultValue: 'Careers' }),
          url: Routes.careers,
        },
      ],
    },
    {
      title: t('footer.legal.title', { defaultValue: 'Resources' }),
      childrens: [
        {
          section: t('footer.resources.documentation', { defaultValue: 'Documentation' }),
          url: Routes.documentation,
        },
        {
          section: t('footer.resources.support', { defaultValue: 'Support' }),
          url: Routes.support,
        },
        {
          section: t('footer.resources.api', { defaultValue: 'API' }),
          url: Routes.api,
        },
      ],
    },
    {
      title: t('footer.legal.title', { defaultValue: 'Legal' }),
      childrens: [
        {
          section: t('footer.legal.privacy_policy', { defaultValue: 'Privacy Policy' }),
          url: Routes.privacy,
        },
        {
          section: t('footer.legal.terms_of_use', { defaultValue: 'Terms of Use' }),
          url: Routes.terms,
        },
        {
          section: t('footer.legal.compliance', { defaultValue: 'Compliance' }),
          url: Routes.compliance,
        },
      ],
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
      <Grid templateColumns='repeat(4, 1fr)'>
        {useCasesItems.map((item, index) => (
          <GridItem key={index} display='flex' flexDirection='column' pl='40%'>
            <Text fontWeight='bold'>{item.title}</Text>
            {item.childrens.map((link, idx) => (
              <Link key={idx} to={link.url}>
                {link.section}
              </Link>
            ))}
          </GridItem>
        ))}
      </Grid>
      <Text pt={20} mx='auto' w='fit-content'>
        {t('footer.rights', { defaultValue: '© 2024 VotePlatform. All rights reserved.' })}
      </Text>
    </Box>
  )
}

export default Footer
