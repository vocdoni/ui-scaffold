import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { ExplorerBaseURL } from '../../constants'

const AddressBtn = ({ address }: { address: string | undefined }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { onCopy } = useClipboard(address as string)
  return (
    <Menu>
      <MenuButton
        as={Button}
        borderRadius={12}
        variant='link'
        _active={{
          color: 'branding.lightpurple',
        }}
        px={2}
        py={1}
        bgGradient='var(--vcd-gradient-brand)'
        isTruncated
        title={address}
        cursor='pointer'
        color='white'
        fontSize={13}
        mb={2}
        rightIcon={<HiOutlineEllipsisHorizontalCircle style={{ width: '1.2em', height: '1.2em' }} />}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Box maxW={20} isTruncated overflow='hidden'>
          <Text isTruncated as='span'>
            {address}
          </Text>
        </Box>
      </MenuButton>

      <MenuList p='0' position='absolute' top={-28} zIndex='10'>
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
