import { createContext } from '@chakra-ui/react-utils'
import { ReactNode } from 'react'

// Define the context type
type CallbackContextType = {
  success: () => void
  error: () => void
}

// Use `createContext` to initialize the context and its provider
const [CallbackContextProvider, _useCallbackContext] = createContext<CallbackContextType>({
  name: 'CallbackContext',
  errorMessage: 'useCallbackContext must be used within a CallbackProvider',
})

// Wrapper hook to make the context optional
export const useCallbackContext = (): CallbackContextType => {
  try {
    return _useCallbackContext()
  } catch {
    return {
      success: () => {}, // default no-op function
      error: () => {}, // default no-op function
    }
  }
}

// CallbackProvider component to wrap around components needing callback functionality
export const CallbackProvider = ({
  children,
  success,
  error = () => {}, // default to a no-op if not provided
}: {
  children: ReactNode
  success: () => void
  error?: () => void
}) => {
  const value = { success, error }

  return <CallbackContextProvider value={value}>{children}</CallbackContextProvider>
}
