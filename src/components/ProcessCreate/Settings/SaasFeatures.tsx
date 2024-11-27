import { Box, Checkbox, CheckboxProps, Flex, Icon, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { BiCheckDouble } from 'react-icons/bi'
import { useSubscription } from '~components/Auth/Subscription'

const useProcessFeatures = () => {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      anonymous: {
        title: t('anonymous.title', { defaultValue: 'Anonymous' }),
        description: t('anonymous.description', { defaultValue: 'Voters will remain anonymous' }),
        boxIcon: BiCheckDouble,
        formKey: 'electionType.anonymous',
      },
      secretUntilTheEnd: {
        title: t('secret_until_the_end.title', { defaultValue: 'Secret until the end' }),
        description: t('secret_until_the_end.description', {
          defaultValue: 'Vote contents will be encrypted till the end of the voting',
        }),
        boxIcon: BiCheckDouble,
        formKey: 'electionType.secretUntilTheEnd',
      },
      overwrite: {
        title: t('overwrite.title', { defaultValue: 'Vote overwrite' }),
        description: t('overwrite.description', { defaultValue: 'Voters will be able to overwrite their vote once' }),
        formKey: 'maxVoteOverwrites',
        boxIcon: BiCheckDouble,
      },
      // non implemented features...
      // personalization: {
      //   title: t('personalization.title', { defaultValue: 'personalization' }),
      //   description: t('personalization.description', { defaultValue: 'personalization' }),
      //   boxIcon: BiCheckDouble,
      // },
      // emailReminder: {
      //   title: t('email_reminder.title', { defaultValue: 'Email reminder' }),
      //   description: t('email_reminder.description', { defaultValue: 'Remind by email' }),
      //   boxIcon: BiCheckDouble,
      // },
      // smsNotification: {
      //   title: t('sms_notification.title', { defaultValue: 'SMS Notification' }),
      //   description: t('sms_notification.description', { defaultValue: 'Notify users somehow (?)' }),
      //   boxIcon: BiCheckDouble,
      // },
      // whiteLabel: {
      //   title: t('white_label.title', { defaultValue: 'White label' }),
      //   description: t('white_label.description', { defaultValue: 'Customize the process layout entirely adding your own logos and color palette' }),
      //   boxIcon: BiCheckDouble,
      // },
      // liveStreaming: {
      //   title: t('live_streaming.title', { defaultValue: 'Live Streaming' }),
      //   description: t('live_streaming.description', { defaultValue: 'IDK what\'s this about' }),
      //   boxIcon: BiCheckDouble,
      // },
    }),
    [t]
  )
}
export const Features = () => {
  const { subscription } = useSubscription()
  const translations = useProcessFeatures()

  return (
    <Flex flexDirection='column' gap={6}>
      {Object.entries(translations).map(([feature, card], i) => (
        <CheckBoxCard key={i} {...card} formKey={card.formKey ?? `saasFeatures.${feature}`} />
      ))}
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
