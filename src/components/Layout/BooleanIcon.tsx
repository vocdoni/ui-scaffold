import { Icon } from '@chakra-ui/react'
import { CheckCircle, XCircle } from '@untitled-ui/icons-react'

export const BooleanIcon = ({ value, ...props }) => (
  <Icon
    as={value ? CheckCircle : XCircle}
    color={value ? 'table.variant.striped.light.icon_check' : 'table.variant.striped.light.icon_cross'}
    mt={'2px'}
    _dark={{ color: value ? 'table.variant.striped.dark.icon_check' : 'table.variant.striped.dark.icon_cross' }}
    fontSize='xl'
    className={value ? 'check' : 'cross'}
    {...props}
  />
)
