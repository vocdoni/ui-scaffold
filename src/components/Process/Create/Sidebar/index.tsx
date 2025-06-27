import { Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import {
  Sidebar,
  SidebarContents,
  SidebarProps,
  SidebarSubtitle,
  SidebarTitle,
} from '~components/shared/Dashboard/Contents'
import { BasicConfig } from './BasicConfig'
import { ExtraConfig } from './ExtraConfig'

type CreateSidebarProps = {
  onClose?: () => void
} & SidebarProps

export const CreateSidebar = (props: CreateSidebarProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <Sidebar {...props}>
      <SidebarContents borderBottom='1px solid' borderColor='table.border'>
        <SidebarTitle>Settings</SidebarTitle>
        {isMobile && (
          <IconButton
            aria-label='Close sidebar'
            icon={<Icon as={LuX} />}
            variant='ghost'
            size='sm'
            position='absolute'
            top={2}
            right={2}
            onClick={() => props.onClose?.()}
            _hover={{ bg: 'gray.100', _dark: { bg: 'whiteAlpha.200' } }}
          />
        )}
      </SidebarContents>

      <SidebarContents flex='1' overflowY='auto'>
        <SidebarSubtitle>Basic Configuration</SidebarSubtitle>
        <BasicConfig />

        <SidebarSubtitle borderTop='1px solid' borderColor='table.border' mt={4}>
          Extra Configuration
        </SidebarSubtitle>
        <ExtraConfig />
      </SidebarContents>
    </Sidebar>
  )
}
