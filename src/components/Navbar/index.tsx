import { Box, Flex, List, useOutsideClick } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchInputContext } from '../../Providers'
import Logo from '../Layout/Logo'
import SearchInput from '../Search/Input'
import NavList from './List'

const Navbar = ({ ...props }) => {
  const searchInputValues = useContext(SearchInputContext)

  const location = useLocation()

  const refSearchInput = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: refSearchInput,
    handler: () => searchInputValues?.removeFullInput(),
  })

  return (
    <Flex as='nav' justifyContent='space-between' alignItems='center' gap={4} {...props}>
      <Logo
        flexDirection={searchInputValues?.isSearchInScreen || location.pathname !== '/' ? 'row' : 'column'}
        gap={searchInputValues?.isSearchInScreen || location.pathname !== '/' ? 1 : 0}
      />

      {searchInputValues?.isFullInput && !searchInputValues?.isSearchInScreen && location.pathname === '/' ? (
        <Box ref={refSearchInput} width='full'>
          <SearchInput autofocus />
        </Box>
      ) : (
        <>
          {!searchInputValues?.isSearchInScreen && location.pathname === '/' && (
            <SearchInput
              display={{ base: 'none', lg: 'inline-block' }}
              width={95}
              onClick={searchInputValues?.displayFullInput}
            />
          )}

          <List display='flex' alignItems='center' gap={4}>
            <NavList displayFullInput={searchInputValues?.displayFullInput} />
          </List>
        </>
      )}
    </Flex>
  )
}

export default Navbar
