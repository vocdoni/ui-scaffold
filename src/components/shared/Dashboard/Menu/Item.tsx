import { Button, ButtonProps, Icon, Tooltip, forwardRef } from '@chakra-ui/react'
import { ForwardedRef } from 'react'
import { Link as ReactRouterLink, generatePath } from 'react-router-dom'

export type DashboardMenuItem = {
  label: string
  icon?: any
  route?: string
}

type DashboardMenuItemButtonProps = ButtonProps & {
  item: DashboardMenuItem
  reduced: boolean
}

export const DashboardMenuItemButton = forwardRef(
  ({ item, reduced, ...buttonProps }: DashboardMenuItemButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const isDisabled = !item.route
    const as = isDisabled ? 'button' : ReactRouterLink

    const button = (
      <Button
        ref={ref}
        as={as}
        {...(!isDisabled && { to: generatePath(item.route) })}
        onClick={(e) => {
          if (isDisabled) e.preventDefault()
        }}
        variant='listmenu'
        size='sm'
        colorScheme='gray'
        justifyContent='start'
        gap={4}
        p={2}
        fontWeight={400}
        isDisabled={isDisabled}
        {...buttonProps}
      >
        <Icon as={item.icon} />
        {!reduced && item.label}
      </Button>
    )

    return reduced ? (
      <Tooltip label={item.label} placement='right-end'>
        {button}
      </Tooltip>
    ) : (
      button
    )
  }
)
