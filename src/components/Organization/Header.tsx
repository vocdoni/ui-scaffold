import { AspectRatio, Box, Flex } from '@chakra-ui/react'
import {
  OrganizationAvatar as Avatar,
  OrganizationDescription,
  OrganizationName,
  useOrganization,
} from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import AddressBtn from './AddressBtn'
import fallback from '/assets/default-avatar.png'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'center', md: 'start' }}
      gap={{ base: 2, md: 8 }}
      mb={10}
      p={3}
      borderRadius='lg'
      boxShadow='var(--box-shadow)'
    >
      <Box flex='1 1 20%' minW={40}>
        <AspectRatio ratio={1.25 / 1} maxW={56} mx='auto'>
          <Avatar
            mx='auto'
            borderRadius='md'
            fallbackSrc={fallback}
            alt={t('organization.avatar_alt', {
              name: organization?.account.name.default || organization?.address,
            }).toString()}
          />
        </AspectRatio>
      </Box>

      <Flex
        flex='1 1 80%'
        justifyContent='space-between'
        alignItems={{ base: 'center', md: 'start' }}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: 2 }}
        minW={0}
        maxW='100%'
      >
        <Flex
          flex='1 1 100%'
          direction='column'
          justifyContent={{ md: 'space-between' }}
          alignItems={{ base: 'center', md: 'start' }}
          gap={2}
          order={{ base: 2, md: 0 }}
          maxW={{ base: '100%', md: '75%' }}
        >
          <Box maxW='100%'>
            <OrganizationName
              as='h1'
              fontSize={32}
              isTruncated
              title={organization?.account.name.default || organization?.address}
            />
          </Box>
          <OrganizationDescription />
        </Flex>
        <AddressBtn />
      </Flex>
    </Flex>
  )
}

export default OrganizationHeader
