import { AspectRatio, Box, Button, Flex, IconButton } from '@chakra-ui/react'
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

  const {
    containerRef: containerRefTitle,
    noOfLines: noOfLinesTitle,
    readMore: readMoreTitle,
    handleReadMore: handleReadMoreTitle,
    isTruncated: isTruncatedTitle,
  } = useReadMore(96, 1, 'p')

  const {
    containerRef: containerRefDesc,
    noOfLines: noOfLinesDesc,
    readMore: readMoreDesc,
    handleReadMore: handleReadMoreDesc,
    isTruncated: isTruncatedDesc,
  } = useReadMore(139, 4, 'p')

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
            ref={containerRefTitle}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              p: {
                noOfLines: noOfLinesTitle,
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
            {isTruncatedTitle && (
              <IconButton
                icon={readMoreTitle ? <FaEyeSlash /> : <FaEye />}
                variant='ghost'
                alignSelf='start'
                color='primary.main'
                title={t('organization.title.read_more')}
                aria-label={t('organization.title.read_more')}
                onClick={handleReadMoreTitle}
              />
            )}
            {areEqualHexStrings(account?.address, organization?.address) && (
              <IconButton
                icon={<IoMdCreate />}
                alignSelf='start'
                variant='ghost'
                color='primary.main'
                title={t('organization.title.edit')}
                aria-label={t('organization.title.edit')}
                onClick={onOpen}
              />
            )}
          </Flex>

          <Flex
            ref={containerRefDesc}
            flexDirection='column'
            sx={{
              div: {
                p: {
                  noOfLines: noOfLinesDesc,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 'var(--chakra-line-clamp)',
                },
              },
            }}
          >
            <OrganizationDescription fontSize='lg' lineHeight={1.7} />
            {isTruncatedDesc && (
              <Button float='right' variant='link' colorScheme='primary' alignSelf='end' onClick={handleReadMoreDesc}>
                {readMoreDesc ? ' Read less' : 'Read more'}
              </Button>
            )}
          </Flex>
        </Flex>
        <AddressBtn />
      </Flex>
    </Flex>
  )
}

const useReadMore = (containerHeight: number, lines: number, tag: string) => {
  const [readMore, setReadMore] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const containerRef = useRef<HTMLParagraphElement>(null)
  const noOfLines = isTruncated ? (readMore ? 'none' : lines) : 'none'

  const handleReadMore = () => setReadMore((prev) => !prev)

  useEffect(() => {
    if (containerRef.current) {
      const text = containerRef.current.querySelector(tag)

      if (text) {
        const textHeight = text.getBoundingClientRect().height

        const isTextTaller = textHeight > containerHeight

        if (isTextTaller) setIsTruncated(true)
      }
    }
  }, [])

  return {
    containerRef,
    noOfLines,
    readMore,
    handleReadMore,
    isTruncated,
  }
}

export default OrganizationHeader
