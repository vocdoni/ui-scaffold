import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { addressTextOverflow, ExplorerBaseURL } from '~constants'

const AddressBtn = ({ ...props }) => {
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const toast = useToast()
  const { onCopy } = useClipboard(organization?.address as string)

  const address = enforceHexPrefix(organization?.address)

  return (
    <Menu {...props}>
      <MenuButton as={Button} variant='address-dropdown'>
        <Flex alignItems='center' gap={4}>
          <Text isTruncated>{addressTextOverflow(address as string, 3)}</Text>
          <HiOutlineEllipsisHorizontalCircle />
        </Flex>
      </MenuButton>

      <MenuList position='absolute' top='-32' left={{ md: -9 }} zIndex={30}>
        <MenuItem
          as={Button}
          variant='transparent'
          leftIcon={<CopyIcon />}
          onClick={() => {
            toast({
              title: t('copy.copied_title'),
              duration: 3000,
            })
            onCopy()
          }}
          display='flex'
          justifyContent='start'
          alignItems='center'
          borderRadius='none'
          mb={1}
          _hover={{
            bgColor: 'lightgray',
          }}
        >
          {t('copy.address')}
        </MenuItem>

        <MenuItem
          as={Button}
          variant='transparent'
          leftIcon={<ExternalLinkIcon />}
          onClick={() => window.open(`${ExplorerBaseURL}/organizations/show/#/${address}`, '_blank')}
          display='flex'
          justifyContent='start'
          alignItems='center'
          borderRadius='none'
          _hover={{
            bgColor: 'lightgray',
          }}
        >
          {t('open_in_explorer')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AddressBtn
