import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
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
      <MenuButton
        as={Button}
        title={address}
        rightIcon={<HiOutlineEllipsisHorizontalCircle style={{ width: '1.2em', height: '1.2em' }} />}
        mb={2}
        py={2}
        px={2.5}
        w={30}
        h={8}
        fontSize='sm'
        borderRadius={18}
        color='organization.button_address.color'
        bgColor='organization.button_address.bg'
        cursor='pointer'
        _hover={{
          textDecoration: 'none',
        }}
        _active={{
          color: 'organization.button_address.active',
        }}
      >
        <Box maxW={20} overflow='hidden' isTruncated>
          <Text as='span'>{address}</Text>
        </Box>
      </MenuButton>

      <MenuList p={0} position='absolute' top={-28} zIndex='10'>
        <MenuItem
          as={Button}
          leftIcon={<CopyIcon />}
          onClick={() => {
            toast({
              status: 'info',
              title: t('copy.copied_title'),
              duration: 3000,
            })
            onCopy()
          }}
          justifyContent='start'
        >
          {t('copy.address')}
        </MenuItem>
        <MenuItem
          as={Button}
          leftIcon={<ExternalLinkIcon />}
          onClick={() => window.open(`${ExplorerBaseURL}/organizations/show/#/${address}`, '_blank')}
          justifyContent='start'
        >
          {t('open_in_explorer')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AddressBtn
