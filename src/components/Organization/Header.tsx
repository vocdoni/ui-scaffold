import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import ShareButtons from '../Layout/ShareButtons'
import AddressBtn from './AddressBtn'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  return (
    <Flex flexDirection={{ base: 'column', lg: 'row' }} w='100%' justifyContent={{ lg: 'start' }} mb={14}>
      <Box
        minW={{ base: 80, lg: '30%' }}
        p={{ base: 2, sm: 0 }}
        maxW={{ base: 100, lg: '30%' }}
        mx='auto'
        mb={{ base: 8, lg: 0 }}
      >
        <AspectRatio ratio={{ base: 1.8 / 1, sm: 1.25 / 1 }}>
          <Image
            src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='organization X'
            mx='auto'
            borderRadius='md'
          />
        </AspectRatio>
      </Box>

      <Box pl={{ lg: 5 }} maxW={{ lg: '70%' }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-between' }}
          alignItems={{ base: 'center', lg: 'start' }}
          gap={{ base: 2, lg: 0 }}
          mb={{ base: 2, lg: 4 }}
        >
          <Box textAlign={{ base: 'center', lg: 'start' }} w={{ base: 'full', lg: '60%' }}>
            <AddressBtn />

            <Text>{t('organization.dao_title')}</Text>
            <Heading
              as='h1'
              title='The Organization Name'
              w={{ base: '70%', lg: '100%' }}
              mx={{ base: 'auto', lg: 0 }}
              fontSize={{ base: '3xl', md: '4xl' }}
              isTruncated
            >
              {organization?.account.name.default || organization?.address}
            </Heading>
          </Box>
          <Flex flexDirection={{ base: 'row', lg: 'column' }} gap={{ base: 4, lg: 0 }}>
            <Box textAlign='center'>
              <Text fontSize={14} color='organization.header_text'>
                {t('organization.elections')}
              </Text>
              <Text as='span' fontWeight='bold'>
                {organization?.electionIndex}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection={{ base: 'row', lg: 'column' }} alignItems='start' gap={3}>
            <ShareButtons />
          </Flex>
        </Flex>

        <Text mb={3} px={{ md: 10, lg: 0 }} color='organization.header_text'>
          {organization?.account.description.default}
        </Text>
      </Box>
    </Flex>
  )
}

export default OrganizationHeader
