import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const Desktop = () => {
  const { t } = useTranslation()
  return (
    <Box display={{ base: 'none', md: 'flex' }}>
      <UnorderedList display='flex' alignItems='center' gap={4}>
        <ListItem listStyleType='none'>
          <NavLink to='/processes/create'>{t('menu.create_process')}</NavLink>
        </ListItem>

        <ListItem listStyleType='none'>
          <ConnectButton
            label={t('menu.connect').toString()}
            chainStatus='none'
            showBalance={false}
          />
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

export default Desktop
