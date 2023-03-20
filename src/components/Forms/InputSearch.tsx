import { SearchIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const InputSearch = ({ ...props }) => {
  const { t } = useTranslation()

  const placeholder = t('input_search')
  
  return (
    <FormControl mb={4} {...props}>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children={<SearchIcon color='gray.300' />}
        />
        <Input placeholder={placeholder} pl={10} borderRadius={10} />
      </InputGroup>
    </FormControl>
  )
}

export default InputSearch
