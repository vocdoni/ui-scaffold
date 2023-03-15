import { FieldErrors, FieldValues } from 'react-hook-form'

export const FormatDate = 'dd/MM/yyyy'

export enum ModalType {
  Closed = 0,
  Loading,
  Info,
  AddTokens,
  Success,
}

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

  // check first field to avoid undefined type errors
  const [parent] = map.split('.')
  if (!errors[parent]) return null

  // check map (reduce solution is nice but crashes in some scenarios, may be changed to recursive function)
  const obj = map.split('.').reduce((o: any, i: string) => o[i], errors)
  if (!obj.message) {
    return null
  }

  return obj.message
}
