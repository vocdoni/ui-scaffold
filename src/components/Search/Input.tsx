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
          variant='unstyled'
          height={8}
          placeholder={t('search.input_placeholder').toString()}
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
