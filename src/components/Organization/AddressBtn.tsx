import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
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
    <Menu>
      <MenuButton as={Button} rightIcon={<HiOutlineEllipsisHorizontalCircle />} maxW={44}>
        <Text isTruncated>{address}</Text>
      </MenuButton>

      <MenuList position='absolute' top='-32' zIndex={30}>
        <MenuItem
          display='flex'
          justifyContent='start'
          alignItems='center'
          as={Button}
          variant='dropdown'
          textAlign='start'
          leftIcon={<CopyIcon />}
          onClick={() => {
            toast({
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
          display='flex'
          justifyContent='start'
          alignItems='center'
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
