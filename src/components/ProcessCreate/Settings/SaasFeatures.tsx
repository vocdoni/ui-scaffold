import { Box, Checkbox, CheckboxProps, Flex, Icon, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { BiCheckDouble } from 'react-icons/bi'
import { FeaturesKeys, useAccountPlan } from '~components/AccountSaas/useAccountPlan'

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
  const { data } = useAccountPlan()
  const translations = useFeaturesTranslations()

  if (!data) return null

  return (
    <Flex flexDirection='column' gap={6}>
      {Object.entries(data.features).map(([feature, inPlan], i) => {
        const card = translations[feature as FeaturesKeys]
        if (!card) return null
        return <CheckBoxCard key={i} isPro={!inPlan} {...card} formKey={card.formKey ?? `saasFeatures.${feature}`} />
      })}
    </Flex>
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
      {isPro && <Text as='span'>Pro</Text>}
      <Box>
        <Icon as={boxIcon} />
        <Text>{title}</Text>
      </Box>

      <Text>{description}</Text>
    </Checkbox>
  )
}
