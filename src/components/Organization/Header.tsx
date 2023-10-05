import { AspectRatio, Box, Flex, IconButton } from '@chakra-ui/react'
import { useReadMoreMarkdown } from '@components/Layout/use-read-more'
import { OrganizationAvatar as Avatar, OrganizationDescription, OrganizationName } from '@vocdoni/chakra-components'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import { areEqualHexStrings } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoMdCreate } from 'react-icons/io'
import AddressBtn from './AddressBtn'
import { useOrganizationModal } from './OrganizationModalProvider'
import fallback from '/assets/default-avatar.png'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const { onOpen } = useOrganizationModal()
  const { account } = useClient()

  const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(110)

  const { containerRef, isTruncated, readMore, handleReadMore } = useReadMoreTitle()

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'center', md: 'start' }}
      gap={{ base: 2, md: 8 }}
      mb={10}
      p={3}
      borderRadius='lg'
      boxShadow='var(--box-shadow)'
      bgColor='organization.header_bg'
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
        >
          <Flex
            w='100%'
            ref={containerRef}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              p: {
                noOfLines: readMore ? 1 : 'none',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 'var(--chakra-line-clamp)',
              },
            }}
          >
            <OrganizationName
              as='p'
              fontSize={32}
              lineHeight={1.5}
              title={organization?.account.name.default || organization?.address}
            />
            {isTruncated && (
              <IconButton
                icon={readMore ? <FaEye /> : <FaEyeSlash />}
                variant='ghost'
                alignSelf='start'
                color='primary.500'
                title={t('organization.title.read_more')}
                aria-label={t('organization.title.read_more')}
                onClick={handleReadMore}
              />
            )}
            {areEqualHexStrings(account?.address, organization?.address) && (
              <IconButton
                icon={<IoMdCreate />}
                alignSelf='start'
                variant='ghost'
                color='primary.500'
                title={t('organization.title.edit')}
                aria-label={t('organization.title.edit')}
                onClick={onOpen}
              />
            )}
          </Flex>
          <ReadMoreMarkdownWrapper>
            <OrganizationDescription fontSize='lg' lineHeight={1.7} />
          </ReadMoreMarkdownWrapper>
          <ReadMoreMarkdownButton colorScheme='primary' alignSelf='center' />
        </Flex>
        <AddressBtn />
      </Flex>
    </Flex>
  )
}

const useReadMoreTitle = () => {
  const [readMore, setReadMore] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const containerRef = useRef<HTMLParagraphElement>(null)

  const handleReadMore = () => setReadMore((prev) => !prev)

  useEffect(() => {
    if (!containerRef.current) return
    const containerHeight = containerRef.current.getBoundingClientRect().height
    const text = containerRef.current.querySelector('p')

    if (!text) return
    const fontSizeTitle = Number(getComputedStyle(text).fontSize.split('px')[0])

    if (containerHeight > fontSizeTitle * 2) {
      setReadMore(true)
      setIsTruncated(true)
    }
  }, [])

  return {
    containerRef,
    readMore,
    isTruncated,
    handleReadMore,
  }
}

export default OrganizationHeader
