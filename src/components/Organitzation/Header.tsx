import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useClipboard,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { ExplorerBaseURL } from '../../constants'

const OrganizationHeader = ({ address }: { address: string | undefined }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const [readMore, setReadMore] = useState(false)
  const { onCopy } = useClipboard(address as string)

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
          justifyContent={{ md: 'space-between' }}
          alignItems='center'
          gap={{ base: 2, md: 8 }}
          mb={{ base: 2, md: 4 }}
        >
          <Flex
            flexDirection='column'
            alignItems={{ base: 'center', md: 'start' }}
          >
            <Menu>
              <MenuButton
                as={Button}
                borderRadius={12}
                variant='link'
                _active={{
                  color: 'branding.lightpurple',
                }}
                px={2}
                py={1}
                bgGradient='var(--vcd-gradient-brand)'
                maxWidth='130px'
                isTruncated
                title={address}
                cursor='pointer'
                color='white'
                fontSize={13}
                mb={2}
                rightIcon={
                  <HiOutlineEllipsisHorizontalCircle
                    style={{ width: '1.2em', height: '1.2em' }}
                  />
                }
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Box maxW='120px' isTruncated overflow='hidden'>
                  <Text isTruncated as='span'>
                    {address}
                  </Text>
                </Box>
              </MenuButton>
              <MenuList p='0' position='absolute' top='-120px' zIndex='10'>
                <MenuItem
                  as={Button}
                  justifyContent='start'
                  leftIcon={<CopyIcon />}
                  onClick={() => {
                    toast({
                      status: 'info',
                      title: t('copy.copied_title'),
                      duration: 3000,
                    })
                    onCopy()
                  }}
                >
                  {t('copy.address')}
                </MenuItem>
                <MenuItem
                  justifyContent='start'
                  as={Button}
                  onClick={() =>
                    window.open(
                      `${ExplorerBaseURL}/organizations/show/#/${address}`,
                      '_blank'
                    )
                  }
                  leftIcon={<ExternalLinkIcon />}
                >
                  {t('open_in_explorer')}
                </MenuItem>
              </MenuList>
            </Menu>

            <Text>{t('organization.dao_title')}</Text>
            <Heading
              as='h1'
              fontSize={28}
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
            <Flex flexDirection='column' alignItems='center'>
              <Text
                fontSize={14}
                bgGradient='linear(to-r, #9526FC, #2ED3BF)'
                bgClip='text'
              >
                {t('organization.elections')}
              </Text>
              <Text as='span' fontWeight='bold'>
                20
              </Text>
            </Flex>

            <Flex flexDirection='column' alignItems='center'>
              <Text
                fontSize={14}
                bgGradient='linear(to-r, #9526FC, #2ED3BF)'
                bgClip='text'
              >
                {t('organization.members')}
              </Text>
              <Text as='span' fontWeight='bold'>
                627
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection={{ base: 'row', md: 'column' }} pt='1'>
            <Link to='#'></Link>
            <Icon
              aria-label={t('link', { link: 'twitter' }).toString()}
              as={FaTwitter}
              w={6}
              h={6}
              cursor='pointer'
            />
            <Link to='#'>
              <Icon
                aria-label={t('link', { link: 'discord' }).toString()}
                as={FaDiscord}
                w={6}
                h={6}
                cursor='pointer'
                mt={{ md: 1 }}
                mx={{ base: 5, md: 0 }}
              />
            </Link>
            <Link to='#'>
              <Icon
                aria-label={t('link', { link: 'github' }).toString()}
                as={FaGithub}
                w={6}
                h={6}
                cursor='pointer'
              />
            </Link>
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
