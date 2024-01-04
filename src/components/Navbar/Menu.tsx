import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Icon, IconButton, Link, MenuItem, MenuList, Text, useClipboard } from '@chakra-ui/react'
import { Balance, HR } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaWallet } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { MdOutlineLogout } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useDisconnect } from 'wagmi'
import { useOrganizationModal } from '~components/Organization/OrganizationModalProvider'
import { addressTextOverflow } from '~constants'
import { LanguagesList } from './LanguagesList'

const MenuDropdown = () => {
  const { t } = useTranslation()
  const { disconnect } = useDisconnect()
  const { account, clear } = useClient()
  const { onCopy } = useClipboard(account?.address as string)

  const [isOpenMenuLanguages, setIsOpenMenuLanguages] = useState(false)

  const { onOpen } = useOrganizationModal()

  return (
    <MenuList
      py={4}
      px={6}
      minW={{ base: '100vw', sm: 'min-content' }}
      boxShadow={{ base: '0px 10px 12px -7px gray', sm: '0px 0px 10px -3px gray' }}
      border='none'
      _hover={{
        bgColor: 'none',
      }}
    >
      {account && (
        <>
          <MenuItem
            as='div'
            display='flex'
            flexDirection='column'
            alignItems='start'
            gap={2}
            closeOnSelect={false}
            _hover={{
              bgColor: 'white',
            }}
            _active={{
              '& button': {
                outline: '2px solid transparent !important',
                bgColor: 'lightgray',
              },
            }}
            _focus={{
              '& button': {
                outline: '2px solid #8DC2ED',
              },
            }}
            onClick={() => {
              onCopy()
            }}
          >
            <Text fontWeight='bold'>{t('menu.wallet')}</Text>
            <Box display='flex' alignItems='center' gap={2}>
              <HStack justifyContent='center' bgColor='primary.main' width={8} height={8} borderRadius='50%'>
                <FaWallet size={18} color='white' />
              </HStack>
              {addressTextOverflow((account?.address as string) || '', 10)}
              <IconButton
                onClick={() => {
                  onCopy()
                }}
                aria-label={t('menu.copy_aria_label')}
                icon={<CopyIcon />}
                bgColor='white'
                w={5}
                h={5}
                minW={0}
              />
            </Box>
          </MenuItem>
          <MenuItem
            as='div'
            _hover={{
              bgColor: 'white',
            }}
            _focus={{
              '& button': {
                outline: '2px solid #8DC2ED',
              },
            }}
            mb={3}
          >
            <Flex alignItems='center' gap={7}>
              <Flex>
                <Balance p={0} bg='white' fontWeight='bold' />
              </Flex>

              <Link
                as={ReactRouterLink}
                to='/faucet'
                variant='rounded'
                colorScheme='primary'
                aria-label={t('menu.get_more')}
                title={t('menu.get_more')}
                p={2}
              >
                <Icon as={HiShoppingCart} mt={1} mr={1} />
                {t('menu.get_more')}
              </Link>
            </Flex>
          </MenuItem>
          <MenuItem onClick={onOpen}>{t('menu.organization')}</MenuItem>
        </>
      )}

      {import.meta.env.features.languages.length > 1 && (
        <>
          <MenuItem
            closeOnSelect={false}
            onClick={() => setIsOpenMenuLanguages((prev) => !prev)}
            display='flex'
            flexDirection='column'
            px={0}
            pb={0}
          >
            <Box as='span' px={3} display='flex' w='full' pb={2}>
              <Text>{t('menu.languages')}</Text>
              {isOpenMenuLanguages ? <ChevronUpIcon mt='5px' /> : <ChevronDownIcon mt='5px' />}
            </Box>
          </MenuItem>
          {isOpenMenuLanguages && <LanguagesList closeOnSelect={false} />}
        </>
      )}
      <MenuItem
        as={Link}
        href='https://developer.vocdoni.io/'
        target='_blank'
        _hover={{
          textDecoration: 'none',
        }}
      >
        {t('menu.documentation')}
      </MenuItem>
      <HR h={0} my={2} />
      <MenuItem
        onClick={() => {
          disconnect()
          clear()
        }}
        fontWeight='bold'
      >
        <Icon as={MdOutlineLogout} mr={1} />
        {t('menu.logout')}
      </MenuItem>
      <MenuItem
        fontSize='xs'
        color='blackAlpha.700'
        as={Link}
        href='https://aragon.org/terms-and-conditions'
        target='_blank'
      >
        {t('menu.terms')}
      </MenuItem>
      <MenuItem fontSize='xs' color='blackAlpha.700' as={Link} href='https://aragon.org/privacy-policy' target='_blank'>
        {t('menu.privacy')}
      </MenuItem>
    </MenuList>
  )
}

export default MenuDropdown
