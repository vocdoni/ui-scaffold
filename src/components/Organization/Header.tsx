import { AspectRatio, Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import {
  OrganizationDescription,
  OrganizationHeader as Avatar,
  OrganizationName,
  useOrganization,
} from '@vocdoni/chakra-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ShareButtons from '../Layout/ShareButtons'
import AddressBtn from './AddressBtn'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const [readMore, setReadMore] = useState(false)
  const { organization } = useOrganization()

  return (
    <Flex flexDirection={{ base: 'column', lg: 'row' }} mb={14}>
      <Box minW={{ base: 'full', sm: 100 }} p={{ base: 2, sm: 0 }} maxW={100} mx='auto' mb={{ base: 8, lg: 0 }}>
        <AspectRatio ratio={{ base: 1.8 / 1, sm: 1.25 / 1 }}>
          <Image
            src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='organization X'
            mx='auto'
            borderRadius='md'
          />
        </AspectRatio>
      </Box>

      <Box pl={{ lg: 5 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-between' }}
          alignItems={{ base: 'center', lg: 'start' }}
          flexGrow={1}
          gap={{ base: 2, lg: 0 }}
          mb={{ base: 2, lg: 4 }}
        >
          <Box textAlign={{ base: 'center', lg: 'start' }} w={{ base: 'full', lg: '60%' }}>
            <AddressBtn address={address} />

            <Text>{t('organization.dao_title')}</Text>
            <Heading
              as='h1'
              title='The Organization Name'
              mx={{ base: 'auto', lg: 0 }}
              width='90%'
              fontSize={{ base: '3xl', md: '4xl' }}
              isTruncated
            >
              The Organization Name
            </Heading>
          </Box>
          <Flex flexDirection={{ base: 'row', lg: 'column' }} gap={{ base: 4, lg: 0 }}>
            <Box textAlign='center'>
              <Text fontSize={14} color='organization.header_text'>
                {t('organization.elections')}
              </Text>
              <Text as='span' fontWeight='bold'>
                20
              </Text>
            </Box>

            <Flex flexDirection='column' alignItems='center'>
              <Text fontSize={14} color='organization.header_text'>
                {t('organization.members')}
              </Text>
              <Text as='span' fontWeight='bold'>
                627
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection={{ base: 'row', lg: 'column' }} alignItems='start' gap={3}>
            <ShareButtons />
          </Flex>
        </Flex>

        <Text mb={3} px={{ md: 10, lg: 0 }} color='organization.header_text' noOfLines={readMore ? undefined : 3}>
          The Organization Name ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut laboliquip ex ea commodo const dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor
        </Text>
        <VStack>
          <Button variant='link' onClick={() => setReadMore((prev) => !prev)} color='black'>
            {readMore ? t('read_less') : t('read_more')}
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}

export default OrganizationHeader
