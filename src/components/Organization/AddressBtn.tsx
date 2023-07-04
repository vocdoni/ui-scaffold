import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
import { enforceHexPrefix, useOrganization } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { ExplorerBaseURL } from '../../constants'

const AddressBtn = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const toast = useToast()
  const { onCopy } = useClipboard(organization?.address as string)

  const address = enforceHexPrefix(organization?.address)

  return (
    <Menu variant='address'>
      <MenuButton title={address}>
        <Text isTruncated>{address}</Text>
        <Icon as={HiOutlineEllipsisHorizontalCircle} />
      </MenuButton>

      <MenuList>
        <MenuItem
          as={Button}
          variant='dropdown'
          leftIcon={<CopyIcon />}
          onClick={() => {
            toast({
              status: 'info',
              title: t('copy.copied_title'),
              duration: 3000,
            })
            onCopy()
          }}
        >
          {t('copy.address')}
        </MenuItem>
        <MenuItem
          as={Button}
          variant='dropdown'
          leftIcon={<ExternalLinkIcon />}
          onClick={() => window.open(`${ExplorerBaseURL}/organizations/show/#/${address}`, '_blank')}
        >
          {t('open_in_explorer')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AddressBtn
