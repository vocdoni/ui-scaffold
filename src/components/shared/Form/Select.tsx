import { Select as ChakraSelect } from 'chakra-react-select'
import { selectStyles } from '~theme/selectStyles'

export const Select = (props) => {
  return <ChakraSelect chakraStyles={selectStyles} {...props} />
}
