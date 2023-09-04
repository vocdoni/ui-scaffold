import { useDisclosure } from '@chakra-ui/react'
import EditProfile from '@components/Account/EditProfile'
import { createContext, useContext } from 'react'

type OrganizationModalState = Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpen' | 'onClose'>

const OrganizationModalContext = createContext<OrganizationModalState | undefined>(undefined)

export const OrganizationModalProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalValues = {
    isOpen,
    onOpen,
    onClose,
  }

  return (
    <OrganizationModalContext.Provider value={modalValues}>
      <EditProfile />
      {children}
    </OrganizationModalContext.Provider>
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
