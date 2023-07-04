import { SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

interface Props {
  displayFullInput?: () => void
  aria: any
}

const SearchButton = ({ displayFullInput, aria }: Props) => (
  <IconButton
    aria-label={aria}
    icon={<SearchIcon />}
    onClick={displayFullInput}
    variant='outline'
    size='sm'
    colorScheme='button.search'
    borderRadius='50%'
  />
)
export default SearchButton
