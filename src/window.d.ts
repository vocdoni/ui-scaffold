export {}

declare global {
  type CrispSetCommand =
    | ['set', `user:${string}`, string]
    | ['set', `session:${string}`, string]
    | ['set', string, ...unknown[]]

  type CrispDoCommand = ['do', string, ...unknown[]]
  type CrispGetCommand = ['get', string, ...unknown[]]
  type CrispOnCommand = ['on', string, (...args: unknown[]) => void]

  type CrispCommand = CrispSetCommand | CrispDoCommand | CrispGetCommand | CrispOnCommand

  type CrispQueue = CrispCommand[]

  interface Window {
    $crisp?: CrispQueue
    CRISP_WEBSITE_ID?: string
  }
}
