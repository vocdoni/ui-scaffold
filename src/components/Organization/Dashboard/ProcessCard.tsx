import { Box, Td, Tr, useColorMode } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle, QuestionsTypeBadge } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x, InvalidElection } from '@vocdoni/sdk'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import { useDateFns } from '~i18n/use-date-fns'
import { Routes } from '~src/router/routes'

const ProcessCard = () => {
  const { election } = useElection()
  const { format } = useDateFns()
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const [isHovered, setIsHovered] = useState(false)

  if (!election || election instanceof InvalidElection) return null

  return (
    <Tr position='relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Td>
        <Box
          as={RouterLink}
          to={generatePath(Routes.dashboard.process, { id: ensure0x(election.id) })}
          position='absolute'
          w='full'
          h='full'
          left={0}
          top={0}
        />
        <ElectionTitle mb={0} fontSize='md' textAlign='left' fontWeight='500' isTruncated />
      </Td>
      <Td>
        {format(election.startDate, t('organization.date_format'))} -{' '}
        {format(election.endDate, t('organization.date_format'))}
      </Td>
      <Td>
        <QuestionsTypeBadge sx={{ '& label': { fontWeight: 'normal' } }} />
      </Td>
      <Td>
        <ElectionStatusBadge colorScheme={colorMode === 'dark' && isHovered ? 'black' : 'green'} />
      </Td>
      <Td>
        {election.voteCount}/{election.census.size}
      </Td>
    </Tr>
  )
}

export default ProcessCard
