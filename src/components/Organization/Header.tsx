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
    <Flex flexDirection={{ base: 'column', lg: 'row' }}>
      <Box minW={{ base: 'full', sm: 100 }} p={{ base: 2, sm: 0 }} maxW={100} mx='auto'>
        <AspectRatio ratio={{ base: 1.8 / 1, sm: 1.25 / 1 }}>
          <Image
            mx='auto'
            borderRadius='md'
            src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='organization X'
          />
        </AspectRatio>
      </Box>

      <Box pl={{ lg: 5 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-between' }}
          alignItems={{ base: 'center', lg: 'start' }}
          gap={{ base: 0, lg: 0 }}
          mb={{ base: 2, lg: 4 }}
          flexGrow={1}
        >
          <Flex flexDirection='column' alignItems={{ base: 'center', lg: 'start' }} mt={2}>
            <AddressBtn />

          <Text>{t('organization.dao_title')}</Text>
          <OrganizationName
            fontSize={28}
            isTruncated
            title={organization?.account.name.default || organization?.address}
          />
        </Flex>
        <Flex flexDirection={{ base: 'row', md: 'column' }} gap={{ base: 4, md: 0 }}>
          <Flex flexDirection='column' alignItems='center'>
            <Text fontSize={14} bgGradient='var(--vcd-gradient-brand)' bgClip='text'>
              {t('organization.elections')}
            </Text>
            <Text as='span' fontWeight='bold'>
              {organization?.electionIndex}
            </Text>
          </Flex>

          <Flex flexDirection='column' alignItems='center'>
            <Text fontSize={14} bgGradient='var(--vcd-gradient-brand)' bgClip='text'>
              {t('organization.members')}
            </Text>
            <Text as='span' fontWeight='bold'>
              ∞
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={{ base: 'row', md: 'column' }} alignItems='start' gap={3}>
          <ShareButtons />
        </Flex>
      </Flex>
      <OrganizationDescription noOfLines={readMore ? undefined : 3} />
      <VStack>
        <Button variant='link' onClick={() => setReadMore((prev) => !prev)}>
          {readMore ? t('read_less') : t('read_more')}
        </Button>
      </VStack>
    </Box>
  )
}

export default OrganizationHeader
