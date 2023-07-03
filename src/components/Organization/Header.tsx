import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react'
import {
  OrganizationDescription,
  OrganizationHeader as Avatar,
  OrganizationName,
  useOrganization,
} from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import ShareButtons from '../Layout/ShareButtons'
import AddressBtn from './AddressBtn'

const OrganizationHeader = () => {
  const { t } = useTranslation()
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
            <Text fontSize={14} bgGradient='var(--vcd-gradient-brand)' bgClip='text'>
              {t('organization.elections')}
            </Text>
            <Text as='span' fontWeight='bold'>
              {organization?.electionIndex}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={{ base: 'row', md: 'column' }} alignItems='start' gap={3}>
          <ShareButtons />
        </Flex>
      </Flex>
      <OrganizationDescription noOfLines={undefined} />
    </Box>
  )
}

export default OrganizationHeader
