import { useTranslation } from 'react-i18next'

export const useValidations = () => {
  const { t } = useTranslation()
  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  const requiredBoolean = (v) => (v === true || v === false ? true : required.message)
  return { required, requiredBoolean }
}
