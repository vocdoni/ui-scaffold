import { Checkbox, CheckboxProps, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { cloneElement, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export type DetailedCheckboxProps = CheckboxProps & {
  badge?: ReactElement
  description?: string
  icon?: ReactElement
  name: string
  title: string
}

export const DetailedCheckbox = ({ icon, badge, title, description, name, ...props }: DetailedCheckboxProps) => {
  const { t } = useTranslation()
  const styles = useMultiStyleConfig('DetailedCheckbox', props)
  const { register } = useFormContext()

  return (
    <Checkbox variant='detailed' {...register(name)} {...props} sx={styles.checkbox}>
      <Text sx={styles.title}>
        {icon && cloneElement(icon, { sx: styles.icon })}
        {t(title)}
      </Text>
      <Text sx={styles.description}> {description}</Text>

      {badge && cloneElement(badge, { sx: styles.badge })}
    </Checkbox>
  )
}
