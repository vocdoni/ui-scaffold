import {
  As,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuListProps,
} from '@chakra-ui/react'
import { ActionsProvider } from '@vocdoni/chakra-components'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { FaCog } from 'react-icons/fa'
import { RiCloseCircleLine, RiPauseCircleLine, RiPlayCircleLine, RiStopCircleLine } from 'react-icons/ri'

export const ActionsMenu = (props: MenuListProps) => {
  const { account } = useClient()
  const { election } = useElection()

  if (!election || (election && election?.organizationId !== account?.address)) return null

  // canceled and ended elections cannot be acted upon
  if ([ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)) return null

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={IconButton} aria-label='Actions' icon={<FaCog />} variant='ghost' />
      <ActionsProvider>
        <ActionsMenuList {...props} />
      </ActionsProvider>
    </Menu>
  )
}

const ActionsMenuList = (props: MenuListProps) => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { cancel, end, pause, resume, loading } = useActions()

  if (!election) return null

  return (
    <MenuList p={0}>
      {election.status === ElectionStatus.PAUSED && (
        <MenuItem
          as={Button}
          leftIcon={<ActionIcon icon={RiPlayCircleLine} />}
          onClick={resume}
          justifyContent='start'
          isLoading={loading.continue}
          variant=''
        >
          {t('process_actions.start')}
        </MenuItem>
      )}
      {election.status === ElectionStatus.ONGOING && (
        <MenuItem
          as={Button}
          leftIcon={<ActionIcon icon={RiPauseCircleLine} />}
          onClick={pause}
          justifyContent='start'
          isLoading={loading.pause}
          variant=''
        >
          {t('process_actions.pause')}
        </MenuItem>
      )}
      <MenuItem
        as={Button}
        leftIcon={<ActionIcon icon={RiStopCircleLine} />}
        onClick={end}
        justifyContent='start'
        isLoading={loading.end}
        variant=''
      >
        {t('process_actions.end')}
      </MenuItem>
      <MenuDivider m={1} />
      <MenuItem
        as={Button}
        leftIcon={<ActionIcon icon={RiCloseCircleLine} />}
        onClick={cancel}
        justifyContent='start'
        isLoading={loading.cancel}
        variant=''
      >
        {t('process_actions.cancel')}
      </MenuItem>
    </MenuList>
  )
}

const ActionIcon = ({ icon }: { icon: As }) => {
  return <Icon as={icon} w={6} h={6} />
}
