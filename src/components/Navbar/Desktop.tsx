import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NavLink } from 'react-router-dom'

const Desktop = () => (
  <Box display={{ base: 'none', md: 'flex' }}>
    <UnorderedList display='flex' alignItems='center' gap={4}>
      <ListItem listStyleType='none'>
        <NavLink to='/processes/create'>Create process</NavLink>
      </ListItem>

      <ListItem listStyleType='none'>
        <ConnectButton chainStatus='none' showBalance={false} />
      </ListItem>
    </UnorderedList>
  </Box>
)

export default Desktop
