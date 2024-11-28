import { Checkbox, CheckboxProps, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { cloneElement, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

export type DetailedBoxProps = CheckboxProps & {
  badge?: ReactElement
  description?: string
  icon?: ReactElement
  name: string
  title: string
}

export const DetailedBox = ({ icon, badge, title, description, name, ...props }: DetailedBoxProps) => {
  const styles = useMultiStyleConfig('DetailedBox', props)
  const { register } = useFormContext()

  return (
    <Checkbox variant='detailed' {...register(name)} {...props} sx={styles.checkbox}>
      <Text sx={styles.title}>
        {icon && cloneElement(icon, { sx: styles.icon })}
        {title}
      </Text>
      <Text sx={styles.description}>{description}</Text>

      {badge && cloneElement(badge, { sx: styles.badge })}
    </Checkbox>
  )
}
