import { SearchIcon } from '@chakra-ui/icons'
import { FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const SearchInput = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <FormControl {...props}>
      <InputGroup>
        <InputLeftElement mt={-1} pointerEvents='none' children={<SearchIcon color='black' />} />
        <Input
          placeholder={t('search.input_placeholder').toString()}
          variant='unstyled'
          height={8}
          bgColor='white'
          borderRadius={40}
          borderWidth={1}
          borderColor='black'
          borderStyle='solid'
          _focus={{
            borderWidth: 1.5,
            outlineOffset: 0,
          }}
        />
      </InputGroup>
    </FormControl>
  )
}

export default SearchInput
