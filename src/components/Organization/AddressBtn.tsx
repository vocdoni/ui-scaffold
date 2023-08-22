import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
import { ExplorerBaseURL, addressTextOverflow } from '@constants'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'

const AddressBtn = ({ ...props }) => {
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const toast = useToast()
  const { onCopy } = useClipboard(organization?.address as string)

  const address = enforceHexPrefix(organization?.address)

  return (
    <Menu {...props}>
      <MenuButton as={Button} rightIcon={<HiOutlineEllipsisHorizontalCircle />} minW={44}>
        <Text isTruncated>{addressTextOverflow(address as string)}</Text>
      </MenuButton>

      <MenuList position='absolute' top='-32' left={{ md: -9 }} zIndex={30}>
        <MenuItem
          display='flex'
          justifyContent='start'
          alignItems='center'
          gap={2}
          onClick={() => {
            toast({
              title: t('copy.copied_title'),
              duration: 3000,
            })
            onCopy()
          }}
        >
          <CopyIcon /> {t('copy.address')}
        </MenuItem>

        <MenuItem
          display='flex'
          justifyContent='start'
          alignItems='center'
          gap={2}
          onClick={() => window.open(`${ExplorerBaseURL}/organizations/show/#/${address}`, '_blank')}
        >
          <ExternalLinkIcon />
          {t('open_in_explorer')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AddressBtn
