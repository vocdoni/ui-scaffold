import { SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

interface Props {
  displayFullInput?: () => void
  aria: any
}

const SearchButton = ({ displayFullInput, aria }: Props) => (
  <IconButton
    aria-label={aria}
    variant='outline'
    colorScheme='buttons.search'
    borderRadius='50%'
    icon={<SearchIcon />}
    onClick={displayFullInput}
    size='sm'
  />
)
export default SearchButton
