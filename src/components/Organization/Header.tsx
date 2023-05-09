import { AspectRatio, Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/chakra-components'
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
        <Image
          mx='auto'
          borderRadius='md'
          src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='organization X'
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
          <Heading as='h1' fontSize={28} isTruncated title='The Organization Name' maxWidth='90%'>
            {organization?.account.name.default || organization?.address}
          </Heading>
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
      <Flex justifyContent={{ base: 'center', md: 'start' }} alignItems='center' gap={4} mb={{ base: 2, md: 4 }}></Flex>
      <Text noOfLines={readMore ? undefined : 3}>{organization?.account.description.default}</Text>
      <VStack>
        <Button variant='link' onClick={() => setReadMore((prev) => !prev)}>
          {readMore ? t('read_less') : t('read_more')}
        </Button>
      </VStack>
    </Box>
  )
}

export default OrganizationHeader
