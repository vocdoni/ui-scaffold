import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import ShareButtons from '../Layout/ShareButtons'
import AddressBtn from './AddressBtn'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'start' }} gap={2} mb={10}>
      <Box flex='1 1 30%' minW={60}>
        <AspectRatio ratio={{ base: 1.8 / 1, md: 1.25 / 1 }}>
          <Image
            src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='organization X'
            mx='auto'
            borderRadius='md'
          />
        </AspectRatio>
      </Box>

      <Box flex='1 1 70%' maxW={{ base: '90%', md: '70%' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          alignItems={{ base: 'center', md: 'start' }}
          gap={{ base: 2, md: 0 }}
          mb={{ base: 2, md: 4 }}
        >
          <Box textAlign={{ base: 'center', md: 'start' }} w={{ base: 'full', md: '60%' }} minW={0}>
            <AddressBtn />

            <Text>{t('organization.dao_title')}</Text>
            <Heading as='h1' title='The Organization Name' fontSize={{ base: '3xl', md: '4xl' }} isTruncated>
              {organization?.account.name.default || organization?.address}
            </Heading>
          </Box>
          <Flex flexDirection={{ base: 'row', md: 'column' }} gap={{ base: 4, md: 0 }}>
            <Box textAlign='center'>
              <Text fontSize={14} color='organization.header_text'>
                {t('organization.elections')}
              </Text>
              <Text as='span' fontWeight='bold'>
                {organization?.electionIndex}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection={{ base: 'row', md: 'column' }} alignItems='start' gap={3}>
            <ShareButtons />
          </Flex>
        </Flex>

        <Text mb={3} color='organization.header_text'>
          {organization?.account.description.default}
        </Text>
      </Box>
    </Flex>
  )
}

export default OrganizationHeader
