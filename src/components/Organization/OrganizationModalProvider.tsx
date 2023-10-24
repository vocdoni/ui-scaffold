import { useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { createContext, useContext } from 'react'
import EditProfile from '~components/Account/EditProfile'

type OrganizationModalState = Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpen' | 'onClose'>

const OrganizationModalContext = createContext<OrganizationModalState | undefined>(undefined)

export const OrganizationModalProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account, fetchAccount } = useClient()

  const modalValues = {
    isOpen,
    onOpen,
    onClose,
  }

  return (
    <OrganizationProvider organization={account}>
      <OrganizationModalContext.Provider value={modalValues}>
        <EditProfile callback={fetchAccount} />
        {children}
      </OrganizationModalContext.Provider>
    </OrganizationProvider>
  )
}

export const useOrganizationModal = () => {
  const ctx = useContext(OrganizationModalContext)

  if (!ctx) {
    throw new Error(
      'useOrganizationModal returned `undefined`, maybe you forgot to wrap the component within <OrganizationModalProvider />?'
    )
  }

  return ctx
}
