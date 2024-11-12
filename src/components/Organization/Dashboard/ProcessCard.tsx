import { Box, Flex, Text } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle, QuestionsTypeBadge } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x, InvalidElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import { useDateFns } from '~i18n/use-date-fns'
import { Routes } from '~src/router/routes'

const ProcessCard = () => {
  const { election } = useElection()
  const { format } = useDateFns()
  const { t } = useTranslation()

  if (!election || election instanceof InvalidElection) return null

  return (
    <Box
      as={RouterLink}
      to={generatePath(Routes.dashboard.process, { id: ensure0x(election.id) })}
      w='full'
      display='flex'
      gap={5}
      textDecoration='none'
      py='10px'
      borderRadius='xl'
      pl={4}
      _hover={{
        bgColor: 'process.card_hover.light',

        _dark: {
          bgColor: 'process.card_hover.dark',
        },
      }}
    >
      <ElectionTitle
        flexGrow={1}
        flexShrink={0}
        flexBasis={48}
        mb={0}
        mt={1}
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
    </Box>
  )
}

export default ProcessCard
