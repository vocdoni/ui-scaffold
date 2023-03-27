import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEllipsisV } from 'react-icons/fa'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const [readMore, setReadMore] = useState(false)

  return (
    <Box maxWidth={{ base: '90%', md: '1000px' }} m='auto'>
      <AspectRatio
        ratio={1}
        height={{ base: '150px', md: '200px' }}
        width={{ base: '150px', md: '200px' }}
        float={{ base: 'none', md: 'left' }}
        margin={{ base: 'auto' }}
        marginRight={{ md: 8 }}
        marginBottom={{ base: 8, md: 2 }}
      >
        <Image
          mx='auto'
          borderRadius='md'
          src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='organization X'
        />
      </AspectRatio>
      <>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'center', md: 'center' }}
          gap={{ base: 2, md: 4 }}
          mb={{ base: 2, md: 4 }}
        >
          <Flex
            flexDirection='column'
            alignItems={{ base: 'center', md: 'start' }}
          >
            <Button
              borderRadius='30px'
              variant='link'
              px={2}
              py={1}
              bgGradient='linear(to-r, #9526FC, #2ED3BF)'
              maxWidth='130px'
              isTruncated
              title='Ox431277732423bh4234'
              cursor='pointer'
              color='white'
              fontSize='.8em'
              mb={2}
              rightIcon={<FaEllipsisV />}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Text isTruncated maxW='80%' as='span'>
                0x431277732423bh4234
              </Text>
            </Button>
            <Text>DAO</Text>
            <Heading
              as='h1'
              fontSize='2em'
              isTruncated
              title='The Organization Name'
              maxWidth='90%'
            >
              The Organization Name
            </Heading>
          </Flex>
          <Flex
            flexDirection={{ base: 'row', md: 'column' }}
            gap={{ base: 4, md: 0 }}
          >
            <Box>
              <Text
                fontSize='.8em'
                bgGradient='linear(to-r, #9526FC, #2ED3BF)'
                bgClip='text'
              >
                {t('organization.elections')}
              </Text>
              <Text as='span' fontWeight='bold'>
                20
              </Text>
            </Box>

            <Box>
              <Text
                fontSize='.8em'
                bgGradient='linear(to-r, #9526FC, #2ED3BF)'
                bgClip='text'
              >
                {t('organization.members')}
              </Text>
              <Text as='span' fontWeight='bold'>
                627
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          justifyContent={{ base: 'center', md: 'start' }}
          alignItems='center'
          gap={4}
          mb={{ base: 2, md: 4 }}
        ></Flex>
        <Text noOfLines={readMore ? undefined : 3}>
          {' '}
          <Text
            as='span'
            color='branding.pink'
            fontWeight='bold'
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            The Organization Name
          </Text>{' '}
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut laboliquip ex ea
          commodo const dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut labore exercitation
          ullamco laboris.ncididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut labore
          exercitation ullamco laboris
        </Text>
        <VStack>
          <Button
            variant='underline'
            onClick={() => setReadMore((prev) => !prev)}
          >
            {readMore ? t('read_less') : t('read_more')}
          </Button>
        </VStack>
      </>
    </Box>
  )
}

export default OrganizationHeader
