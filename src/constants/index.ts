import { FieldErrors, FieldValues } from 'react-hook-form'

export const FormatDate = 'dd/MM/yyyy'

export enum ModalType {
  Closed = 0,
  Loading,
  Info,
  AddTokens,
  Success,
}

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
export const isInvalidFieldMap = (
  errors: FieldErrors<FieldValues>,
  map: string
) => {
  return !!fieldMapErrorMessage(errors, map)
}

/**
 * Given an object of react-hook-form errors, returns the specified mapped field error message.
 *
 * @param {FieldErrors<FieldValues>} errors Object of errors obtained from formState in `useFormContext`.
 * @param {string} map The field map in dot notation.
 * @returns {null|string} Either returns the error message or null
 */
export const fieldMapErrorMessage = (
  errors: FieldErrors<FieldValues>,
  map: string
) => {
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
