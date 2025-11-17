import {
  Box,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { ElectionStatusBadge, QuestionsTypeBadge } from '@vocdoni/chakra-components'
import { ElectionProvider, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, ensure0x, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { Trans, useTranslation } from 'react-i18next'
import { LuCopy, LuEllipsisVertical, LuExternalLink, LuInfo, LuSearch } from 'react-icons/lu'
import { createSearchParams, generatePath, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDateFns } from '~i18n/use-date-fns'
import RoutedPaginatedTableFooter from '~shared/Pagination/PaginatedTableFooter'
import { Routes } from '~src/router/routes'
import { useCreateProcess } from '../Create'
import { defaultProcessValues } from '../Create/common'

type Election = PublishedElection | InvalidElection

type ProcessesListProps = {
  processes?: Election[]
}

const ProcessesTable = ({ processes }: ProcessesListProps) => {
  const { t } = useTranslation()

  return (
    <Box border='1px solid' borderColor='table.border' borderRadius='sm' w='full'>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>{t('process_list.title', { defaultValue: 'Title' })}</Th>
              <Th>{t('process_list.start_date', { defaultValue: 'Start date' })}</Th>
              <Th>{t('process_list.end_date', { defaultValue: 'End date' })}</Th>
              <Th>{t('process_list.type', { defaultValue: 'Type' })}</Th>
              <Th>{t('process_list.status', { defaultValue: 'Status' })}</Th>
              <Th isNumeric>{t('process_list.recount', { defaultValue: 'Recount' })}</Th>
              <Th>{t('process_list.results', { defaultValue: 'Results' })}</Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {processes &&
              !!processes.length &&
              processes?.map((election) => (
                <ElectionProvider election={election} id={election.id} key={election.id}>
                  <ProcessRow />
                </ElectionProvider>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box p={4}>
        <RoutedPaginatedTableFooter />
      </Box>
    </Box>
  )
}

const ProcessRow = () => {
  const { election } = useElection()
  const { format } = useDateFns()
  const { t } = useTranslation()

  if (!election || election instanceof InvalidElection) return null

  return (
    <Tr position='relative'>
      <Td>
        <Link
          as={RouterLink}
          to={generatePath(Routes.dashboard.process, { id: ensure0x(election.id) })}
          _hover={{ textDecoration: 'underline' }}
          fontWeight='medium'
        >
          {election.title.default}
        </Link>
      </Td>
      <Td>{format(election.startDate, t('organization.date_format'))}</Td>
      <Td>{format(election.endDate, t('organization.date_format'))}</Td>
      <Td>
        <QuestionsTypeBadge sx={{ '& label': { fontWeight: 'normal' } }} />
      </Td>
      <Td>
        <ElectionStatusBadge size='sm' />
      </Td>
      <Td isNumeric>{election.voteCount}</Td>
      <Td>
        {ElectionStatus.RESULTS === election.status ||
        ([ElectionStatus.ENDED, ElectionStatus.ONGOING].includes(election.status) &&
          !election.electionType.secretUntilTheEnd) ? (
          <Tag colorScheme='black' variant='solid' size='sm'>
            <Trans i18nKey='process_list.results_live'>Live</Trans>
          </Tag>
        ) : (
          <Tag colorScheme='gray' size='sm'>
            <Trans i18nKey='process_list.not_yet'>Not yet</Trans>
          </Tag>
        )}
      </Td>
      <Td isNumeric>
        <ProcessContextMenu />
      </Td>
    </Tr>
  )
}

const ProcessContextMenu = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const { election, client } = useElection()
  const createProcess = useCreateProcess()

  if (!election || election instanceof InvalidElection) return null

  const cloneAsDraft = async () => {
    const metadata = {
      ...defaultProcessValues,
      title: election.title.default,
      description: election.description.default,
      questions: election.questions.map((question) => {
        return {
          title: question.title.default,
          description: question.description.default,
          options: question.choices.map((option) => ({
            option: option.title.default,
          })),
        }
      }),
    }

    try {
      const clonedDraftId = await createProcess.mutateAsync({
        metadata,
        orgAddress: ensure0x(election.organizationId),
      })

      toast({
        title: t('drafts.cloned_draft', {
          defaultValue: 'Draft cloned successfully',
        }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate(
        {
          pathname: generatePath(Routes.processes.create, { page: 1 }),
          search: createSearchParams({ draftId: clonedDraftId }).toString(),
        },
        { replace: true }
      )
    } catch (error) {
      toast({
        title: t('drafts.cloned_draft_error', {
          defaultValue: 'Error cloning draft',
        }),
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<LuEllipsisVertical />} variant='ghost' size='sm' />
      <Portal>
        <MenuList>
          <MenuItem
            as={RouterLink}
            to={generatePath(Routes.dashboard.process, { id: ensure0x(election.id) })}
            icon={<Icon as={LuInfo} boxSize={4} />}
          >
            <Trans i18nKey='process_context.more_info'>More info</Trans>
          </MenuItem>
          <MenuItem
            as={RouterLink}
            to={generatePath(Routes.processes.view, { id: ensure0x(election.id) })}
            icon={<Icon as={LuExternalLink} boxSize={4} />}
            target='_blank'
          >
            <Trans i18nKey='process_context.public_voting_page'>Public voting page</Trans>
          </MenuItem>
          <MenuItem
            as={Link}
            href={`${client.explorerUrl}/process/${election.id}`}
            icon={<Icon as={LuSearch} boxSize={4} />}
            isExternal
          >
            <Trans i18nKey='process_context.explorer'>Explorer</Trans>
          </MenuItem>
          <MenuItem onClick={cloneAsDraft} icon={<Icon as={LuCopy} boxSize={4} />}>
            <Trans i18nKey='process_context.clone_as_draft'>Clone as draft</Trans>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default ProcessesTable
