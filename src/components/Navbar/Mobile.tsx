import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, ListItem, UnorderedList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'

const Mobile = () => {
  const { t } = useTranslation()

  return (
    <Flex
      display={{ md: 'none' }}
      position='absolute'
      left={0}
      bg='white'
      _dark={{
        bg: 'black.c60',
        borderBottomColor: 'black.c90',
      }}
      width='100%'
      zIndex={10}
      borderBottom='2px solid white'
      borderBottomColor='gray.100'
    >
      <UnorderedList
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap={4}
        pb={8}
      >
        <ListItem listStyleType='none'>
          <ConnectButton
            label={t('menu.connect').toString()}
            chainStatus='none'
            showBalance={false}
          />
        </ListItem>
        <ListItem listStyleType='none' display='flex'>
          <FaGlobeAmericas />
          <ChevronDownIcon />
        </ListItem>
      </UnorderedList>
    </Flex>
  )
}

export default Mobile
