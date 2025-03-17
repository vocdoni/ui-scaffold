import { Icon } from '@chakra-ui/react'
import { CheckCircle, XCircle } from '@untitled-ui/icons-react'

export const BooleanIcon = ({ value, ...props }) => (
  <Icon
    as={value ? CheckCircle : XCircle}
    color={value ? 'text_brand.light' : 'red.500'}
    _dark={{ color: value ? 'text_brand.dark' : 'red.300' }}
    fontSize='xl'
    {...props}
  />
)
