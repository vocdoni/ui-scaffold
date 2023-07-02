import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form'

export const FormatDate = 'dd/MM/yyyy'

const evocdoni = process.env.REACT_APP_VOCDONI_ENVIRONMENT || 'stg'
let explorer = 'https://explorer.vote'
if (['stg', 'dev'].includes(evocdoni)) {
  explorer = `https://${evocdoni}.explorer.vote`
}

export const ExplorerBaseURL = explorer
export const VocdoniEnvironment = evocdoni

/**
 * Given an object of react-hook-form errors, determines if the specified mapped field is invalid (returns an error)
 *
 * @param {FieldErrors<FieldValues>} errors Object of errors obtained from formState in `useFormContext`.
 * @param {string} map The field map in dot notation.
 * @returns {boolean}
 */
export const isInvalidFieldMap = (errors: FieldErrors<FieldValues>, map: string) => {
  return !!fieldMapErrorMessage(errors, map)
}

/**
 * Given an object of react-hook-form errors, returns the specified mapped field error message.
 *
 * @param {FieldErrors<FieldValues>} errors Object of errors obtained from formState in `useFormContext`.
 * @param {string} map The field map in dot notation.
 * @returns {null|string} Either returns the error message or null
 */
export const fieldMapErrorMessage = (errors: FieldErrors<FieldValues>, map: string) => {
  if (!errors) return null

  const obj = dotToObject(errors, map)
  if (!obj || (obj && !obj.message)) return null

  return obj.message
}

/**
 * Dot notation to object conversion. Takes any object as first argument and uses the string dot notation from the
 * second argument (i.e. 'a.child.node') to access that given object value.
 *
 * @param {any} obj Object to be accessed by dot notation
 * @param {string} dot Dot notation string to extract object data
 * @returns
 */
const dotToObject = (obj: any, dot: string) => {
  const rec = (obj: any, dot: string[]): any => {
    if (dot.length && typeof obj[dot[0]] !== 'undefined') {
      return rec(obj[dot[0]], dot.slice(1))
    }
    return obj
  }

  return rec(obj, dot.split('.'))
}

/**
 * Helper hook used for radio inputs that are actually boolean inputs, converting
 * their values to boolean as expected. Note you can't use boolean radio register
 * for more than two radio buttons, since it wouldn't be binary.
 *
 * @param name Radio input field name
 * @returns
 */
export const useBooleanRadioRegister = (name: string) => {
  const { getValues, setValue } = useFormContext()
  return {
    defaultValue: Number(getValues(name)).toString(),
    onChange: (val: string) => setValue(name, Boolean(Number(val))),
  }
}

/**
 * Truncates an address-alike string by the middle, adding ellipsis. It considers
 * the addresses to be coming with 0x prefixed, so it cuts two less chars from the
 * front than the back
 * @param {string} address The address to be truncated
 * @param {number} length The length to be shown for each side of the address
 * @returns
 */
export const addressTextOverflow = (address: string, length: number | null = 4) => {
  if (!length) return address
  return `${address.substring(0, length + 2)}...${address.substring(address.length - length, address.length)}`
}

/**
 * RecursivePartial is quite self-explanatory.. it's a recursive Partial type
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P]
}
