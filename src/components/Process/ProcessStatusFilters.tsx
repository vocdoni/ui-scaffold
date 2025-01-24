import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'
import { Routes } from '~routes'

type ProcessStatusFilterProps = ButtonGroupProps & {
  status?: string
}

const ProcessStatusFilter = ({ status, ...rest }: ProcessStatusFilterProps) => (
  <ButtonGroup isAttached {...rest}>
    <Button
      size='xs'
      as={NavLink}
      to={generatePath(Routes.dashboard.processes, { page: 1 })}
      isActive={status === undefined}
    >
      <Trans i18nKey='all'>All</Trans>
    </Button>
    <Button
      size='xs'
      as={NavLink}
      to={generatePath(Routes.dashboard.processes, { status: 'ready', page: 1 })}
      isActive={status === 'ready'}
    >
      <Trans i18nKey='active'>Active</Trans>
    </Button>
    <Button
      size='xs'
      as={NavLink}
      to={generatePath(Routes.dashboard.processes, { status: 'results', page: 1 })}
      isActive={status === 'results'}
    >
      <Trans i18nKey='finished'>Finished</Trans>
    </Button>
  </ButtonGroup>
)

export default ProcessStatusFilter
