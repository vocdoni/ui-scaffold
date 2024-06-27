import { Flex, HStack, Link, Text } from '@chakra-ui/react'
import { ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x, InvalidElection } from '@vocdoni/sdk'
import { Trans, useTranslation } from 'react-i18next'
import { IoIosArrowRoundForward, IoIosCalendar } from 'react-icons/io'
import { MdHowToVote } from 'react-icons/md'
import { Link as RouterLink } from 'react-router-dom'
import { ContentsBox } from '~components/Organization/Dashboard/Box'
import { useDateFns } from '~i18n/use-date-fns'

const ProcessCard = () => {
  const { election } = useElection()
  const { format } = useDateFns()
  const { t } = useTranslation()

  if (!election || election instanceof InvalidElection) return null

  return (
    <Link as={RouterLink} to={`/processes/${ensure0x(election.id)}`} w='full' textDecoration='none'>
      <ContentsBox w='full'>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'start', lg: 'center' }}
          justifyContent='space-between'
        >
          <ElectionStatusBadge fontSize='text-sm' mb={{ base: 3, lg: 0 }} order={{ lg: '2' }} />
          <ElectionTitle fontSize='text' textAlign='left' fontWeight='extrabold' order={{ lg: '1' }} />
        </Flex>
        <HStack mb={3}>
          <MdHowToVote />
          <Text fontWeight='600' fontSize='text-sm' color='dashboard_card_text' className='dashborad_align_card_text'>
            {election.voteCount} ({(election.voteCount / Number(election.census.size)) * 100}%) votes submited
          </Text>
        </HStack>
        <HStack>
          <IoIosCalendar />
          <HStack>
            <Text fontWeight='600' fontSize='text-sm' className='dashborad_align_card_text'>
              <Text as='span' color='gray'>
                {election.startDate.getTime() < new Date().getTime() ? (
                  <Trans i18nKey='dashboard.card.started'>Started</Trans>
                ) : (
                  <Trans i18nKey='dashboard.card.starts'>Starts</Trans>
                )}
                :
              </Text>{' '}
              <Text as='span' color='dashboard_card_text'>
                {format(election.startDate, t('organization.date_format'))}
              </Text>
            </Text>

            <IoIosArrowRoundForward />
            <Text fontWeight='600' fontSize='text-sm' className='dashborad_align_card_text'>
              <Text as='span' color='gray'>
                {election.endDate.getTime() < new Date().getTime() ? (
                  <Trans i18nKey='dashboard.card.finished'>Finished</Trans>
                ) : (
                  <Trans i18nKey='dashboard.card.finish'>Finish</Trans>
                )}
                :
              </Text>{' '}
              <Text as='span' color='dashboard_card_text'>
                {format(election.endDate, t('organization.date_format'))}
              </Text>
            </Text>
          </HStack>
        </HStack>
      </ContentsBox>
    </Link>
  )
}

export default ProcessCard
