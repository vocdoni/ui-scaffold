import { Badge, Box, HStack, Link, Text } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { IoIosArrowRoundForward, IoIosCalendar } from 'react-icons/io'
import { MdHowToVote } from 'react-icons/md'
import { Link as RouterLink } from 'react-router-dom'
import { ContentsBox } from '~components/Organization/Dashboard/Box'

const ProcessCard = () => {
  const { election } = useElection()

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

  if (!election) return null

  return (
    <Link as={RouterLink} to={`/processes/${ensure0x(election.id)}`} w='full' textDecoration='none'>
      <ContentsBox w='full'>
        <Box mb={3}>
          {(election as any).status === 'UPCOMING' ? (
            <Badge colorScheme='blue' px={2} py={1} borderRadius='lg' textTransform='lowercase' fontWeight='600'>
              <Text as='span' textTransform='capitalize'>
                Starting
              </Text>{' '}
              in {calculateDaysUntil((election as any).startDate)} days
            </Badge>
          ) : (
            <ElectionStatusBadge />
          )}
        </Box>
        <ElectionTitle fontSize='lg' textAlign='left' fontWeight='extrabold' />
        <HStack mb={3}>
          <MdHowToVote />
          <Text fontWeight='600' fontSize='sm'>
            {(election as any).voteCount} ({((election as any).voteCount / (election as any).census.size) * 100}%) votes
            submited
          </Text>
        </HStack>
        <HStack>
          <IoIosCalendar />
          <HStack>
            <Text fontWeight='600' fontSize='sm'>
              <Text as='span' color='gray'>
                {(election as any).startDate.getTime() < new Date().getTime() ? 'Started:' : 'Starts:'}
              </Text>{' '}
              {formatDate((election as any).startDate)}
            </Text>

            <IoIosArrowRoundForward />
            <Text fontWeight='600' fontSize='sm'>
              <Text as='span' color='gray'>
                {(election as any).endDate.getTime() < new Date().getTime() ? 'Finished:' : 'Finish:'}
              </Text>{' '}
              {formatDate((election as any).endDate)}
            </Text>
          </HStack>
        </HStack>
      </ContentsBox>
    </Link>
  )
}

export default ProcessCard
