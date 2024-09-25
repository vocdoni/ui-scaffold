import { Box, Checkbox, CheckboxProps, Icon, Text } from '@chakra-ui/react'
import { BiCheckDouble } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { FeaturesKeys, useAccountPlan } from '~components/AccountSaas/useAccountPlan'
import { Loading } from '~src/router/SuspenseLoader'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

const useFeaturesTranslations = (): Record<FeaturesKeys, CheckBoxCardProps> => {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      anonymous: {
        description: t('anonymous', { defaultValue: 'anonymous' }),
        title: t('anonymous', { defaultValue: 'anonymous' }),
        boxIcon: BiCheckDouble,
        formKey: 'electionType.anonymous',
      },
      secretUntilTheEnd: {
        description: t('secretUntilTheEnd', { defaultValue: 'secretUntilTheEnd' }),
        title: t('secretUntilTheEnd', { defaultValue: 'secretUntilTheEnd' }),
        boxIcon: BiCheckDouble,
        formKey: 'electionType.secretUntilTheEnd',
      },
      overwrite: {
        description: t('overwrite', { defaultValue: 'overwrite' }),
        title: t('overwrite', { defaultValue: 'overwrite' }),
        boxIcon: BiCheckDouble,
      },
      personalization: {
        description: t('personalization', { defaultValue: 'personalization' }),
        title: t('personalization', { defaultValue: 'personalization' }),
        boxIcon: BiCheckDouble,
      },
      emailReminder: {
        description: t('emailReminder', { defaultValue: 'emailReminder' }),
        title: t('emailReminder', { defaultValue: 'emailReminder' }),
        boxIcon: BiCheckDouble,
      },
      smsNotification: {
        description: t('smsNotification', { defaultValue: 'smsNotification' }),
        title: t('smsNotification', { defaultValue: 'smsNotification' }),
        boxIcon: BiCheckDouble,
      },
      whiteLabel: {
        description: t('whiteLabel', { defaultValue: 'whiteLabel' }),
        title: t('whiteLabel', { defaultValue: 'whiteLabel' }),
        boxIcon: BiCheckDouble,
      },
      liveStreaming: {
        description: t('liveStreaming', { defaultValue: 'liveStreaming' }),
        title: t('liveStreaming', { defaultValue: 'liveStreaming' }),
        boxIcon: BiCheckDouble,
      },
    }),
    [t]
  )
}
export const SaasFeatures = () => {
  const { data, isLoading } = useAccountPlan()
  const translations = useFeaturesTranslations()

  if (isLoading) return <Loading />
  if (!data) return null

  return (
    <Box>
      {Object.entries(data.features).map(([feature, inPlan], i) => {
        const card = translations[feature as FeaturesKeys]
        if (!card) return null
        return <CheckBoxCard key={i} isPro={!inPlan} {...card} formKey={card.formKey ?? feature} />
      })}
    </Box>
  )
}

interface CheckBoxCardProps {
  title: string
  description: string
  boxIcon: IconType
  isPro?: boolean
  formKey?: string
}

const CheckBoxCard = ({ title, description, boxIcon, isPro, formKey, ...rest }: CheckBoxCardProps & CheckboxProps) => {
  const { register, watch } = useFormContext()

  return (
    <Checkbox variant='radiobox' {...register(formKey)} {...rest}>
      <Box>
        <Icon as={boxIcon} />
        <Text>{title}</Text>
      </Box>
      {isPro && <Text as='span'>Pro</Text>}
      <Text>{description}</Text>
    </Checkbox>
  )
}
