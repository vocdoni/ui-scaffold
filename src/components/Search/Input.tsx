import { SearchIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const SearchInput = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <FormControl {...props}>
      <InputGroup>
        <InputLeftElement
          p={0}
          mt='10px'
          height='10px'
          pointerEvents='none'
          fontSize='1em'
          children={<SearchIcon color='black' />}
        />
        <Input
          variant='unstyled'
          height='30px'
          placeholder={t('search.input_placeholder').toString()}
          pl={10}
          borderRadius={40}
          bgColor='white'
          border='1px solid black'
          _focus={{
            outline: '1px solid black',
            outlineOffset: 0,
          }}
        />
      </InputGroup>
    </FormControl>
  )
}

export default SearchInput
