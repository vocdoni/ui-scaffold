import { AspectRatio, Box, Flex } from '@chakra-ui/react'
import {
  OrganizationAvatar as Avatar,
  OrganizationDescription,
  OrganizationName,
  useOrganization,
} from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import AddressBtn from './AddressBtn'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'center', md: 'start' }}
      gap={{ base: 2, md: 10 }}
      mb={10}
    >
      <Box flex='1 1 20%' minW={40}>
        <AspectRatio ratio={1.25 / 1} maxW={56} mx='auto'>
          <Avatar
            mx='auto'
            borderRadius='md'
            fallbackSrc={`/assets/default-avatar.png`}
            alt={t('organization.avatar_alt', {
              name: organization?.account.name.default || organization?.address,
            }).toString()}
          />
        </AspectRatio>
      </Box>

      <Box flex='1 1 80%' maxW={{ base: '90%', md: '80%' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          alignItems={{ base: 'center', md: 'start' }}
          mb={{ base: 2, md: 4 }}
        >
          <Box textAlign={{ base: 'center', md: 'start' }} w={{ base: 'full', md: '80%' }} minW={0}>
            <AddressBtn />

            <OrganizationName
              mt={2}
              fontSize={28}
              isTruncated
              title={organization?.account.name.default || organization?.address}
            />
          </Box>
        </Flex>

        <OrganizationDescription />
      </Box>
    </Flex>
  )
}

export default OrganizationHeader
