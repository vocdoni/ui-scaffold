import { useDisclosure } from '@chakra-ui/react'
import EditProfile from '@components/Account/EditProfile'
import { createContext, useContext } from 'react'

const OrganizationModalContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
})

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
  const { isOpen, onOpen, onClose } = useContext(OrganizationModalContext)

  return { isOpen, onOpen, onClose }
}
