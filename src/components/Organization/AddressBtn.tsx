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
        borderRadius={18}
        py={2}
        px={2.5}
        bgColor='organization.button_address.bg'
        w={30}
        h={8}
        isTruncated
        title={address}
        cursor='pointer'
        color='organization.button_address.color'
        fontSize='sm'
        mb={2}
        rightIcon={<HiOutlineEllipsisHorizontalCircle style={{ width: '1.2em', height: '1.2em' }} />}
        _hover={{
          textDecoration: 'none',
        }}
        _active={{
          color: 'organization.button_address.active',
        }}
      >
        <Box maxW={20} isTruncated overflow='hidden'>
          <Text isTruncated as='span'>
            {address}
          </Text>
        </Box>
      </MenuButton>

      <MenuList p={0} position='absolute' top={-28} zIndex='10'>
        <MenuItem
          as={Button}
          justifyContent='start'
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
          justifyContent='start'
          as={Button}
          onClick={() => window.open(`${ExplorerBaseURL}/organizations/show/#/${address}`, '_blank')}
          leftIcon={<ExternalLinkIcon />}
        >
          {t('open_in_explorer')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AddressBtn
