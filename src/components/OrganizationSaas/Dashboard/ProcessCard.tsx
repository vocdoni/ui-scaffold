import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle, QuestionsTypeBadge } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x, InvalidElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { FaEye } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import { useDateFns } from '~i18n/use-date-fns'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const ProcessCard = () => {
  const { election, participation } = useElection()
  const { textColor } = useDarkMode()
  const { format } = useDateFns()
  const { t } = useTranslation()

  if (!election || election instanceof InvalidElection) return null

  return (
    <Box w='full' display='flex' gap={5} textDecoration='none' py='10px' color={textColor}>
      <ElectionTitle
        flexGrow={1}
        flexShrink={0}
        flexBasis={48}
        m={0}
        fontSize='md'
        textAlign='left'
        fontWeight='500'
        isTruncated
      />
      <Box flexGrow={1} flexShrink={0} flexBasis={60} whiteSpace='nowrap' fontWeight='500'>
        <Text as='span'>{format(election.startDate, t('organization.date_format'))}</Text> -{' '}
        <Text as='span'>{format(election.endDate, t('organization.date_format'))}</Text>
      </Box>
      <Box
        flexGrow={1}
        flexShrink={0}
        flexBasis={36}
        sx={{
          label: {
            fontWeight: 500,
          },
        }}
      >
        <QuestionsTypeBadge />
      </Box>
      <Flex flexGrow={1} flexShrink={0} flexBasis={24}>
        <ElectionStatusBadge />
      </Flex>
      <Flex flexGrow={1} flexShrink={0} flexBasis={24} fontWeight='500'>
        {election.voteCount}/{election.census.size}
      </Flex>
      <Link
        as={RouterLink}
        to={`/processes/${ensure0x(election.id)}`}
        display='flex'
        flexGrow={1}
        flexShrink={0}
        flexBasis={5}
        justifyContent='center'
        alignItems='center'
      >
        <FaEye />
      </Link>
    </Box>
  )
}

export default ProcessCard
