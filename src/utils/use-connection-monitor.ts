import { useCallback, useRef, useState } from 'react'

export interface ConnectionStatus {
  isOffline: boolean
  failureCount: number
  lastFailureTime: number | null
}

// Set as 1 because this is used in react query error handling, which already does retries
const failureThreshold = 1

/**
 * Hook to monitor API connection status based on consecutive failures
 * Shows toast notifications when connection issues are detected
 */
export const useConnectionMonitor = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isOffline: false,
    failureCount: 0,
    lastFailureTime: null,
  })

  // Track if we've already notified about being offline to prevent duplicate notifications
  const hasNotifiedOffline = useRef(false)

  /**
   * Record a failed API request
   * After failureThreshold consecutive failures, marks connection as offline
   */
  const recordFailure = useCallback(() => {
    setStatus((prev) => {
      const newFailureCount = prev.failureCount + 1
      const newStatus: ConnectionStatus = {
        isOffline: newFailureCount >= failureThreshold,
        failureCount: newFailureCount,
        lastFailureTime: Date.now(),
      }

      // Track if we just crossed the threshold
      if (!prev.isOffline && newStatus.isOffline) {
        hasNotifiedOffline.current = true
      }

      return newStatus
    })
  }, [])

  /**
   * Record a successful API request
   * Resets failure count and marks connection as online
   */
  const recordSuccess = useCallback(() => {
    setStatus((prev) => {
      // Only trigger recovery notification if we were previously offline
      const wasOffline = prev.isOffline
      const newStatus: ConnectionStatus = {
        isOffline: false,
        failureCount: 0,
        lastFailureTime: null,
      }

      // Reset notification flag when connection is restored
      if (wasOffline) {
        hasNotifiedOffline.current = false
      }

      return newStatus
    })
  }, [])

  /**
   * Reset the connection monitor state
   */
  const reset = useCallback(() => {
    setStatus({
      isOffline: false,
      failureCount: 0,
      lastFailureTime: null,
    })
    hasNotifiedOffline.current = false
  }, [])

  return {
    status,
    recordFailure,
    recordSuccess,
    reset,
    hasNotifiedOffline: hasNotifiedOffline.current,
  }
}
