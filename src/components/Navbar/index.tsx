import { Box, Flex, HStack, Img, List, Text, useOutsideClick } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SearchInputContext } from '../../Providers'
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
      <NavLink to='/'>
        <HStack>
          <Img src={`${process.env.PUBLIC_URL}/assets/vocdoni_icon.png`} alt='vocdoni icon' maxWidth={12} />
          <Text
            display={{ base: 'none', md: 'flex' }}
            flexDirection={searchInputValues?.isSearchInScreen ? 'row' : 'column'}
            gap={searchInputValues?.isSearchInScreen ? 1 : 0}
            fontSize='sm'
            fontWeight='bold'
            lineHeight={1.1}
          >
            <Text as='span'>Public </Text> <Text as='span'>voting</Text> <Text as='span'>protocol</Text>
          </Text>
        </HStack>
      </NavLink>

      {searchInputValues?.isFullInput && !searchInputValues?.isSearchInScreen && location.pathname === '/' ? (
        <Box ref={refSearchInput} width='full'>
          <SearchInput autofocus />
        </Box>
      ) : (
        <>
          {!searchInputValues?.isSearchInScreen && location.pathname === '/' && (
            <SearchInput
              display={{ base: 'none', md: 'inline-block' }}
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
