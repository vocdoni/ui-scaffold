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

import { Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const OrganizationHeader = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  const {
    containaerRef: containerRefTitle,
    noOfLines: noOfLinesTitle,
    readMore: readMoreTitle,
    handleReadMore: handleReadMoreTitle,
    isTruncated: isTruncatedTitle,
  } = useReadMore(4, 1, 'h1')

  console.log(noOfLinesTitle)

  const {
    containaerRef: containerRefDesc,
    noOfLines: noOfLinesDesc,
    readMore: readMoreDesc,
    handleReadMore: handleReadMoreDesc,
    isTruncated: isTruncatedDesc,
  } = useReadMore(30, 4, 'p')

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
          <Flex
            maxW='100%'
            ref={containerRefTitle}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              h1: {
                maxW: { base: '75%', sm: '80%', lg: '85%' },
                noOfLines: noOfLinesTitle,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 'var(--chakra-line-clamp)',
              },
            }}
          >
            <OrganizationName
              as='h1'
              fontSize={32}
              lineHeight={1.5}
              title={organization?.account.name.default || organization?.address}
            />
            {isTruncatedTitle && (
              <Button float='right' variant='link' colorScheme='primary' alignSelf='end' onClick={handleReadMoreTitle}>
                {readMoreTitle ? ' Read less' : 'Read more'}
              </Button>
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
            {/* <ElectionDescription mb={0} fontSize='lg' lineHeight={2} color='process.description' /> */}
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

const useReadMore = (conatinerHeight: number, lines: number, tag: string) => {
  const [readMore, setReadMore] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const containaerRef = useRef<HTMLParagraphElement>(null)
  const noOfLines = isTruncated ? (readMore ? 'none' : lines) : 'none'

  const handleReadMore = () => setReadMore((prev) => !prev)

  useEffect(() => {
    if (containaerRef.current) {
      const text = containaerRef.current.querySelector(tag)

      if (text) {
        const containerHeight = conatinerHeight
        const textHeight = text.getBoundingClientRect().height

        const isTextTaller = textHeight > containerHeight

        if (isTextTaller) setIsTruncated(true)
      }
    }
  }, [])

  return {
    containaerRef,
    noOfLines,
    readMore,
    handleReadMore,
    isTruncated,
  }
}

export default OrganizationHeader
