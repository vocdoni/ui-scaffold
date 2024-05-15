import { useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { createContext, useContext, useState } from 'react'
import EditProfileModal from '~components/Account/EditProfile'

type OrganizationModalState = Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpen' | 'onClose'> & {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const OrganizationModalContext = createContext<OrganizationModalState | undefined>(undefined)

export const OrganizationModalProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState<boolean>(false)
  const { account } = useClient()

  const modalValues = {
    isOpen,
    onOpen,
    onClose,
    loading,
    setLoading,
  }

  return (
    <OrganizationProvider organization={account}>
      <OrganizationModalContext.Provider value={modalValues}>
        <EditProfileModal />
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
