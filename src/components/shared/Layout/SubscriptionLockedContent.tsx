import { Box, Button, Icon, Progress, Stack, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { dotobject } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { LuLock, LuSparkles } from 'react-icons/lu'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { useSubscription } from '~components/Auth/Subscription'
import { PlanFeaturesTranslationKeys } from '~components/Pricing/Features'
import { usePlans, usePlanTranslations } from '~components/Pricing/Plans'
import { SubscriptionPermission } from '~constants'
import { Routes } from '~src/router/routes'

type SubscriptionLockedContentProps = {
  children: (args: { isLocked: boolean }) => React.ReactNode
  permissionType: SubscriptionPermission
}

const useGetPlansWithFeature = (feature: SubscriptionPermission) => {
  const { data: plans = [] } = usePlans()
  return plans.filter((plan) => dotobject(plan, feature))
}

export const SubscriptionLockedContent = ({ children, permissionType }: SubscriptionLockedContentProps) => {
  const { t } = useTranslation()
  const { loading, permission, subscription } = useSubscription()
  const plansWithFeature = useGetPlansWithFeature(permissionType)
  const translations = usePlanTranslations()
  const plan = translations[subscription?.plan?.id]?.title ?? subscription?.plan?.name ?? subscription?.plan?.id
  const permissionName = t(PlanFeaturesTranslationKeys[permissionType])
  const hasPermission = permission(permissionType)
  const isLocked = !hasPermission

  if (loading) return <Progress size='xs' isIndeterminate colorScheme='gray' />

  if (hasPermission) return children({ isLocked })

  return (
    <Box borderWidth='1px' borderRadius='lg' display='grid'>
      <Box
        gridArea='1 / 1'
        pointerEvents='none'
        filter='blur(5px)'
        borderRadius='lg'
        overflow='hidden'
        aria-hidden={isLocked}
      >
        {children({ isLocked })}
      </Box>

      <Box
        gridArea='1 / 1'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        gap={3}
        borderRadius='lg'
        p={4}
        zIndex={1}
      >
        <Icon as={LuLock} boxSize={8} mb={1} />
        <Text fontWeight='bold' textAlign='center'>
          {t(`subscription.locked_content.title`, {
            defaultValue: 'Your current {{ plan }} plan does not include {{ permissionName }}',
            plan,
            permissionName,
          })}
        </Text>
        <Text fontSize='sm' color='texts.dark' textAlign='center'>
          {t(`subscription.locked_content.description`, {
            defaultValue: 'Upgrade your plan to get {{ permissionName }} and more.',
            permissionName,
          })}
        </Text>

        {plansWithFeature.length > 0 && (
          <Stack spacing={2} align='center' mt={2}>
            <Text fontSize='sm' color='texts.dark'>
              {t('subscription.locked_content.available_in', { defaultValue: 'Available in:' })}
            </Text>
            <Wrap justify='center' spacing={2}>
              {plansWithFeature.map((p) => (
                <Tag key={p.id} size='md' variant='subtle' colorScheme='green'>
                  <TagLabel>{translations[p.id]?.title ?? p.name ?? p.id}</TagLabel>
                </Tag>
              ))}
            </Wrap>
          </Stack>
        )}

        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.settings.subscription)}
          leftIcon={<Icon as={LuSparkles} />}
        >
          {t(`subscription.locked_content.unlock`, {
            defaultValue: 'Unlock {{ permissionName }}',
            permissionName,
          })}
        </Button>
      </Box>
    </Box>
  )
}
