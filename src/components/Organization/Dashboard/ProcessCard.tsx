import { Box, HStack, Link, Text } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { Trans } from 'react-i18next'
import { IoIosArrowRoundForward, IoIosCalendar } from 'react-icons/io'
import { MdHowToVote } from 'react-icons/md'
import { Link as RouterLink } from 'react-router-dom'
import { ContentsBox } from '~components/Organization/Dashboard/Box'

const ProcessCard = () => {
  const { election } = useElection()

  if (!election) return null

  return (
    <Link as={RouterLink} to={`/processes/${ensure0x(election.id)}`} w='full' textDecoration='none'>
      <ContentsBox w='full'>
        <Box mb={3}>
          <ElectionStatusBadge />
        </Box>
        <ElectionTitle fontSize='lg' textAlign='left' fontWeight='extrabold' />
        <HStack mb={3}>
          <MdHowToVote />
          <Text fontWeight='600' fontSize='sm' color='dashboard_card_text' className='dashborad_align_card_text'>
            {(election as any).voteCount} ({((election as any).voteCount / (election as any).census.size) * 100}%) votes
            submited
          </Text>
        </HStack>
        <HStack>
          <IoIosCalendar />
          <HStack>
            <Text fontWeight='600' fontSize='sm' className='dashborad_align_card_text'>
              <Text as='span' color='gray'>
                {(election as any).startDate.getTime() < new Date().getTime() ? (
                  <Trans i18nKey='dashboard.card.started'>Started</Trans>
                ) : (
                  <Trans i18nKey='dashboard.card.starts'>Starts</Trans>
                )}
                :
              </Text>{' '}
              <Text as='span' color='dashboard_card_text'>
                {formatDate((election as any).startDate)}
              </Text>
            </Text>

            <IoIosArrowRoundForward />
            <Text fontWeight='600' fontSize='sm' className='dashborad_align_card_text'>
              <Text as='span' color='gray'>
                {(election as any).endDate.getTime() < new Date().getTime() ? (
                  <Trans i18nKey='dashboard.card.finished'>Finished</Trans>
                ) : (
                  <Trans i18nKey='dashboard.card.finish'>Finish</Trans>
                )}
                :
              </Text>{' '}
              <Text as='span' color='dashboard_card_text'>
                {formatDate((election as any).endDate)}
              </Text>
            </Text>
          </HStack>
        </HStack>
      </ContentsBox>
    </Link>
  )
}

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const localeDateString = date.toLocaleString('en-US', options)

  const [monthDay, year, time] = localeDateString.split(', ')
  const [month, day] = monthDay.split(' ')

  return `${month} ${day} - ${year} (${time})`
}

const calculateDaysUntil = (startDate: Date) => {
  const now = new Date()
  const timeDiff = startDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return daysDiff
}

export default ProcessCard
