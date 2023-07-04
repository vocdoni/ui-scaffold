import { AspectRatio, Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import {
  OrganizationHeader as Avatar,
  OrganizationDescription,
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
    <Box maxWidth={{ base: '90%', md: 250 }} mx='auto'>
      <AspectRatio
        ratio={1}
        h={{ base: 36, md: 48 }}
        w={{ base: 36, md: 48 }}
        float={{ base: 'none', md: 'left' }}
        mx={{ base: 'auto' }}
        mr={{ md: 8 }}
        mb={{ base: 8, md: 2 }}
      >
        <Avatar
          mx='auto'
          borderRadius='md'
          alt={t('organization.avatar_alt', {
            name: organization?.account.name.default || organization?.address,
          }).toString()}
        />
      </AspectRatio>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        alignItems={{ base: 'center', md: 'start' }}
        gap={{ base: 2, md: 8 }}
        mb={{ base: 2, md: 4 }}
      >
        <Flex flexDirection='column' alignItems={{ base: 'center', md: 'start' }} mt={2}>
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
            <Text fontSize={14} color='brand.color'>
              {t('organization.elections')}
            </Text>
            <Text as='span' fontWeight='bold'>
              {organization?.electionIndex}
            </Text>
          </Flex>

          <Flex flexDirection='column' alignItems='center'>
            <Text fontSize={14} color='brand.color'>
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
