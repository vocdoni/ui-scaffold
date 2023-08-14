import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionDescription,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  OrganizationName,
} from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProcessDate } from './Date'

const ProcessHeader = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { account } = useClient()

  const { readMore, isTruncated, containerRef, noOfLines, handleReadMore } = useReadMore(770, 20, 'p')

  return (
    <Box mb={4}>
      <Link to={`/organization/0x${election?.organizationId}`}>
        <Button leftIcon={<FaRegArrowAltCircleLeft />} mb={5} maxW={40}>
          <OrganizationName as='span' overflow='hidden' fontSize='sm' isTruncated />
        </Button>
      </Link>
      <Flex direction={{ base: 'column', xl: 'row' }} mb={7} gap={{ base: 2, xl: 10 }}>
        <Box flexBasis='70%' flexGrow={0} flexShrink={0}>
          <ElectionTitle fontSize='xl5' textAlign='left' mb={5} />
          <Flex
            gap={4}
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'start', md: 'center' }}
            mb={4}
          >
            <ElectionStatusBadge />
            <ElectionSchedule textAlign='left' color='process.date' />
          </Flex>

          <Flex
            ref={containerRef}
            flexDirection='column'
            sx={{
              p: {
                noOfLines: noOfLines,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 'var(--chakra-line-clamp)',
              },
            }}
          >
            <ElectionDescription mb={0} fontSize='lg' lineHeight={2} color='process.description' />
            {isTruncated && (
              <Button variant='link' colorScheme='primary' alignSelf='center' onClick={handleReadMore}>
                {readMore ? ' Read less' : 'Read more'}
              </Button>
            )}
          </Flex>
        </Box>

        <Flex flexDirection='column' alignItems='start' gap={4} pl={{ xl: 5 }}>
          {election?.status !== ElectionStatus.CANCELED ? (
            <ProcessDate />
          ) : (
            <Text color='process.canceled' fontWeight='bold'>
              {t('process.status.canceled')}
            </Text>
          )}
          {election?.meta?.token && (
            <Box>
              <Text color='process.date' fontWeight='bold'>
                {t('process.voting_type')}
              </Text>
              <Text>{election.meta.token.defaultStrategy === 1 && 'Single choice'}</Text>
            </Box>
          )}
          {election?.meta?.token && (
            <Box>
              <Text color='process.date' fontWeight='bold'>
                {t('process.strategy')}
              </Text>
              <Text textTransform='capitalize'>{election.meta?.token.type}</Text>
            </Box>
          )}
          <Box>
            <Text color='process.date' fontWeight='bold'>
              {t('process.created_by')}
            </Text>
            <OrganizationName isTruncated maxW={76} />
          </Box>
          {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
            <Flex
              color='process.paused'
              gap={2}
              alignItems='center'
              border='1px solid'
              borderColor='process.paused'
              borderRadius='lg'
              p={2}
            >
              <Icon as={WarningIcon} />
              <Box>
                <Text>{t('process.status.paused')}</Text>
                <Text>{t('process.status.paused_description')}</Text>
              </Box>
            </Flex>
          )}
          <ElectionActions sx={{ '& div': { flexDirection: 'row', justifyContent: 'start' } }} />
        </Flex>
      </Flex>
    </Box>
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

export default ProcessHeader
