import {
  Sidebar,
  SidebarContents,
  SidebarProps,
  SidebarSubtitle,
  SidebarTitle,
} from '~components/shared/Dashboard/Contents'
import { BasicConfig } from './BasicConfig'
import { ExtraConfig } from './ExtraConfig'

export const CreateSidebar = (props: SidebarProps) => {
  return (
    <Sidebar {...props}>
      <SidebarContents borderBottom='1px solid' borderColor='table.border'>
        <SidebarTitle>Settings</SidebarTitle>
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
