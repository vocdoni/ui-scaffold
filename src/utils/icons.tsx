import { Icon, IconProps } from '@chakra-ui/react'
import { CheckCircle, XCircle } from '@untitled-ui/icons-react'

export const renderBooleanIcon = (value: boolean, props?: IconProps) => (
  <Icon as={value ? CheckCircle : XCircle} color={value ? 'green.500' : 'red.500'} fontSize='xl' {...props} />
)
