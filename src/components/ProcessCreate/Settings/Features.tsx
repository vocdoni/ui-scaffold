import { Badge, Flex, Icon } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
import { useSubscription } from '~components/Auth/Subscription'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import { DetailedCheckbox } from '~shared/Form/DetailedCheckbox'

const useProcessFeatures = () => {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      anonymous: {
        title: t('anonymous.title', { defaultValue: 'Anonymous' }),
        description: t('anonymous.description', { defaultValue: 'Voters will remain anonymous' }),
        icon: BiCheckDouble,
        name: 'electionType.anonymous',
        permission: 'features.anonymous',
      },
      liveResults: {
        title: t('live_results.title', { defaultValue: 'Live results' }),
        description: t('live_results.description', {
          defaultValue: 'Vote contents will be publicly available till the end of the voting',
        }),
        icon: BiCheckDouble,
        name: 'electionType.liveResults',
      },
      overwrite: {
        title: t('overwrite.title', { defaultValue: 'Vote overwrite' }),
        description: t('overwrite.description', { defaultValue: 'Voters will be able to overwrite their vote once' }),
        name: 'maxVoteOverwrites',
        icon: BiCheckDouble,
        permission: 'features.overwrite',
      },
      // non implemented features...
      // personalization: {
      //   title: t('personalization.title', { defaultValue: 'personalization' }),
      //   description: t('personalization.description', { defaultValue: 'personalization' }),
      //   icon: BiCheckDouble,
      // },
      // emailReminder: {
      //   title: t('email_reminder.title', { defaultValue: 'Email reminder' }),
      //   description: t('email_reminder.description', { defaultValue: 'Remind by email' }),
      //   icon: BiCheckDouble,
      // },
      // smsNotification: {
      //   title: t('sms_notification.title', { defaultValue: 'SMS Notification' }),
      //   description: t('sms_notification.description', { defaultValue: 'Notify users somehow (?)' }),
      //   icon: BiCheckDouble,
      // },
      // whiteLabel: {
      //   title: t('white_label.title', { defaultValue: 'White label' }),
      //   description: t('white_label.description', { defaultValue: 'Customize the process layout entirely adding your own logos and color palette' }),
      //   icon: BiCheckDouble,
      // },
      // liveStreaming: {
      //   title: t('live_streaming.title', { defaultValue: 'Live Streaming' }),
      //   description: t('live_streaming.description', { defaultValue: 'IDK what\'s this about' }),
      //   icon: BiCheckDouble,
      // },
    }),
    [t]
  )
}

export const Features = () => {
  const { t } = useTranslation()
  const translations = useProcessFeatures()
  const { permission } = useSubscription()
  const { openModal } = usePricingModal()
  const { setValue, watch } = useFormContext()

  return (
    <Flex flexDirection='column' gap={6}>
      {Object.entries(translations).map(([feature, card], i) => {
        const needsUpgrade = 'permission' in card && !permission(card.permission)
        const name = card.name ?? `features.${feature}`
        const isChecked = watch(name)

        return (
          <DetailedCheckbox
            key={i}
            {...card}
            name={name}
            badge={needsUpgrade && <Badge colorScheme='red'>{t('upgrade')}</Badge>}
            icon={card.icon && <Icon as={card.icon} />}
            isChecked={isChecked}
            onChange={(e) => {
              if (!needsUpgrade) {
                setValue(card.name, e.target.checked)
                return
              }

              openModal('planUpgrade', {
                feature: 'permission' in card && card.permission,
                text: translations[feature].title,
              })
              // reset the value to false
              setValue(card.name, false)
              return false
            }}
          />
        )
      })}
    </Flex>
  )
}
