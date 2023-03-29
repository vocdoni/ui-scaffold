import {
  Box,
  Code,
  Flex,
  Grid,
  Icon,
  Img,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { HR } from '@vocdoni/react-components'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import vocdoni_logo from '../../assets/vocdoni_logo.svg'

const Footer = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <Box pt='20px' {...props}>
      <Grid
        gridTemplateColumns={{
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gridTemplateRows={{
          base: 'min-content',
          md: 'repeat(2, 1fr)',
          lg: 'auto',
        }}
        gap={{ base: '20px', md: '40px', lg: 0 }}
      >
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
          px={4}
          gap={2}
          gridColumn={{ base: '1/2', sm: '1/3', md: '1/5', lg: '1/2' }}
          gridRow={{ base: '5/6', md: '2/3', lg: '1/2' }}
        >
          <Img src={vocdoni_logo} maxW='140px'></Img>
          <Img
            src={`${process.env.PUBLIC_URL}/assets/powered_by_aragon.png`}
            maxW='140px'
          ></Img>
        </Flex>
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold' mb={4}>
            {t('footer.company').toUpperCase()}
          </Text>
          <UnorderedList
            display='flex'
            flexDirection='column'
            alignItems={{ base: 'center', lg: 'start' }}
            ml={0}
          >
            <ListItem listStyleType='none'>
              <Link to='#'> {t('footer.about')} </Link>
            </ListItem>

            <ListItem listStyleType='none'>
              <Link to='#'>{t('footer.how_we_work')}</Link>
            </ListItem>

            <ListItem listStyleType='none'>
              <Link to='#'>{t('footer.blog')} </Link>
            </ListItem>
          </UnorderedList>
        </Flex>
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold' mb={4}>
            {t('footer.developers').toUpperCase()}
          </Text>
          <UnorderedList
            display='flex'
            flexDirection='column'
            alignItems={{ base: 'center', lg: 'start' }}
            ml={0}
          >
            <ListItem listStyleType='none'>
              <Link to='https://developer.vocdoni.io/' target='_blank'>
                {t('footer.developer_portal')}
              </Link>
            </ListItem>
            <ListItem listStyleType='none'>
              <Link to='https://vocdoni.io/api' target='_blank'>
                {t('footer.vocdoni_api')}
              </Link>
            </ListItem>

            <ListItem listStyleType='none'>
              <Link to='https://vocdoni.app/' target='_blank'>
                {t('footer.vocdoni_app')}
              </Link>
            </ListItem>
          </UnorderedList>
        </Flex>
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold' mb={4}>
            {t('footer.resources').toUpperCase()}
          </Text>
          <UnorderedList
            display='flex'
            flexDirection='column'
            alignItems={{ base: 'center', lg: 'start' }}
            ml={0}
          >
            <ListItem listStyleType='none'>
              <Link to='#'>{t('footer.guides')}</Link>
            </ListItem>
            <ListItem listStyleType='none'>
              <Link to='#'>{t('footer.tutorials')}</Link>
            </ListItem>
          </UnorderedList>
        </Flex>
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold' mb={4}>
            {t('footer.contact').toUpperCase()}
          </Text>
          <UnorderedList
            display='flex'
            flexDirection='column'
            alignItems={{ base: 'center', lg: 'start' }}
            ml={0}
          >
            <ListItem listStyleType='none'>
              <Link to='mailto:info@vocdoni.com'>info@vocdoni.io</Link>
            </ListItem>
          </UnorderedList>
        </Flex>
      </Grid>
      <HR bgColor='black' />
      <Flex
        justifyContent={{ base: 'center', lg: 'space-between' }}
        alignItems={{ base: 'center', lg: 'start' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={4}
      >
        <Code bg='white'>
          <Text textAlign='center'>
            Copyrights 2022 Vocdoni, Inc. All rights reserved
          </Text>
        </Code>
        <Code bg='white'>
          <Link to='#'>
            <Text>Terms of use & Privacy Policy</Text>
          </Link>
        </Code>

        <Flex justifyContent='center' alignItems='center' gap={6} mb={4}>
          <Link to='#'></Link>
          <Icon
            aria-label={t('link', { link: 'twitter' }).toString()}
            as={FaTwitter}
            w={6}
            h={6}
            cursor='pointer'
            mb={2}
          />
          <Link to='#'>
            <Icon
              aria-label={t('link', { link: 'discord' }).toString()}
              as={FaDiscord}
              w={6}
              h={6}
              cursor='pointer'
            />
          </Link>
          <Link to='#'>
            <Icon
              aria-label={t('link', { link: 'github' }).toString()}
              as={FaGithub}
              w={6}
              h={6}
              cursor='pointer'
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
