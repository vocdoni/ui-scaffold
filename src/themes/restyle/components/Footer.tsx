import { Box, Button, Flex, Icon, Image, Input, Link, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaStar } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import vcdLogo from '/assets/logo-classic.svg'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <>
      <Flex
        className='site-wrapper'
        py={{ base: '60px', md: '120px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '60px', lg: 0 }}
      >
        <Box flex='1 1 33%'>
          <Image src={vcdLogo} w='125px' mb='24px' />
          <Text fontSize='16px' lineHeight='28px' mb='24px' color='gray'>
            {t('footer.newsletter')}
          </Text>
          <Flex alignItems='center' gap='10px' mb='24px'>
            <Input placeholder='Enter your email' h='48px' />
            <Button>{t('footer.newsletter_btn')}</Button>
          </Flex>
          <Text fontWeight='bold' color='#575757' fontSize='17px' lineHeight='20px' mb='5px'>
            {t('footer.overall')}
          </Text>
          <Flex gap={1}>
            <FaStar color='#FFB116' /> <FaStar color='#FFB116' /> <FaStar color='#FFB116' /> <FaStar color='#FFB116' />{' '}
            <FaStar color='#FFB116' />
          </Flex>
        </Box>
        <Flex
          flex='1 1 67%'
          flexDirection={{ base: 'column', sm2: 'row' }}
          justifyContent={{ sm2: 'space-between', lg: 'space-around' }}
          gap={{ base: '30px', sm2: 0 }}
        >
          <Flex flexDirection='column' gap='10px'>
            <Link fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              Primary Pages
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              Home
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              About Us
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              Services
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              Career
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              Integrations
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              Integrations Single
            </Link>
          </Flex>
          <Flex flexDirection='column' gap='10px'>
            <Link fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              {t('footer.pages')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.pricing')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.blog')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.blog_details')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.contact')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.career_single')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.service_single')}
            </Link>
          </Flex>
          <Flex flexDirection='column' gap='10px'>
            <Link fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              {t('footer.template')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.contact')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.support')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.support_single')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.request_for_demo')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.coming_soon')}
            </Link>
            <Link fontSize='15px' lineHeight='26px' color='gray'>
              {t('footer.career_single')}
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        className='site-wrapper'
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '20px', md: '10px' }}
        justifyContent='space-between'
        alignItems='center'
        py='24px'
        borderTop='1px solid rgb(229, 229, 229)'
      >
        <Text as='span' color='gray' textAlign='center'>
          <Trans
            i18nKey='footer.terms_and_privacy'
            components={{
              link1: <Link href='https://aragon.org/terms-and-conditions' target='_blank' />,
              link2: <Link href='https://aragon.org/privacy-policy' target='_blank' />,
            }}
          />
        </Text>
        <Flex gap='10px'>
          <Link
            href='https://twitter.com/vocdoni'
            target='_blank'
            display='flex'
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <Icon aria-label={t('link.twitter').toString()} as={FaXTwitter} w={4} h={4} cursor='pointer' color='gray' />
          </Link>

          <Link
            href='https://chat.vocdoni.io/'
            target='_blank'
            display='flex'
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <Icon aria-label={t('link.discord').toString()} as={FaDiscord} w={4} h={4} cursor='pointer' color='gray' />
          </Link>

          <Link
            href='https://github.com/vocdoni'
            target='_blank'
            display='flex'
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <Icon aria-label={t('link.github').toString()} as={FaGithub} w={4} h={4} cursor='pointer' color='gray' />
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
