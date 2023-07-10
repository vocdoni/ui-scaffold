import { SearchIcon } from '@chakra-ui/icons'
import { FormControl, FormControlProps, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type InputProps = FormControlProps & {
  autofocus?: boolean
}

const SearchInput = ({ autofocus, ...props }: InputProps) => {
  const { t } = useTranslation()

  return (
    <FormControl {...props}>
      <InputGroup>
        <InputLeftElement mt={-1} pointerEvents='none' children={<SearchIcon color='black' />} />
        <Input
          autoFocus={autofocus}
          placeholder={t('search.input_placeholder').toString()}
          variant='unstyled'
          height={8}
          borderRadius={40}
          borderWidth={1}
          borderColor='input_search.border'
          borderStyle='solid'
          _focus={{
            bgColor: 'input_search.bg',
            borderWidth: 1.5,
            outlineOffset: 0,
          }}
        />
      </InputGroup>
    </FormControl>
  )
}

export default SearchInput
