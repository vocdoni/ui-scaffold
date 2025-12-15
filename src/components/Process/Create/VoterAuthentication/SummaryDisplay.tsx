import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Divider,
  HStack,
  Icon,
  Stack,
  TabPanel,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuCheck, LuMail, LuShield } from 'react-icons/lu'
import { getSecurityLevel, getSecurityLevelMessages, SecurityLevelDisplay } from './SecurityLevel'
import { TwoFAMethod } from './utils'

type CredentialsOverviewProps = {
  credentials: string[]
  use2FA: boolean
  use2FAMethod: TwoFAMethod
}

export const CredentialsOverview = ({ credentials, use2FA, use2FAMethod }: CredentialsOverviewProps) => {
  const { t } = useTranslation()

  const get2FAMethodLabel = (method: TwoFAMethod) =>
    method === 'sms'
      ? t('voter_auth.sms', { defaultValue: 'Via SMS verification' })
      : method === 'voter_choice'
        ? t('voter_auth.voters_choice', { defaultValue: "Voter's choice" })
        : t('voter_auth.email', { defaultValue: 'Via email verification' })

  return (
    <>
      {credentials && credentials.length > 0 && (
        <Box>
          <HStack spacing={2} mb={2}>
            <Icon as={LuShield} boxSize={4} />
            <Text fontSize='sm' fontWeight='semibold'>
              {t('voter_auth.summary_credentials', { defaultValue: 'Required Credentials' })}
            </Text>
          </HStack>

          <Stack pl={6} spacing={2}>
            {credentials.map((cred) => (
              <HStack key={cred}>
                <Icon as={LuCheck} color='green.500' boxSize={4} />
                <Text fontSize='sm'>{cred}</Text>
              </HStack>
            ))}
          </Stack>
        </Box>
      )}
      {use2FA && (
        <Box>
          <HStack spacing={2} mb={2}>
            <Badge colorScheme='black' fontSize='xs'>
              2FA
            </Badge>
            <Text fontSize='sm' fontWeight='semibold'>
              {t('voter_auth.summary_2fa_enable', { defaultValue: 'Two-Factor Authentication' })}
            </Text>
          </HStack>
          <Stack pl={6} spacing={2}>
            <HStack>
              <Icon as={LuCheck} color='green.500' boxSize={4} />
              <Text fontSize='sm'>{t('voter_auth.summary_2fa_enabled', { defaultValue: 'Enabled' })}</Text>
            </HStack>
            <HStack>
              <Icon as={LuMail} boxSize={4} />
              <Text fontSize='sm'>{get2FAMethodLabel(use2FAMethod)}</Text>
            </HStack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export const SummaryDisplay = () => {
  const { t } = useTranslation()
  const { watch } = useFormContext()
  const { credentials, use2FA, use2FAMethod } = watch()
  const level = getSecurityLevel(use2FA, credentials)
  const { subtext, alert } = getSecurityLevelMessages(level)

  return (
    <TabPanel>
      <Box border='1px solid' borderColor='table.border' borderRadius='md' p={5} bg='background.raised'>
        <Stack spacing={4}>
          <Text fontSize='md' fontWeight='bold'>
            {t('voter_auth.summary_title', { defaultValue: 'Authentication Configuration Summary' })}
          </Text>
          <CredentialsOverview credentials={credentials} use2FA={use2FA} use2FAMethod={use2FAMethod} />
          <Divider />
          <Box>
            <HStack spacing={2} mb={2}>
              <Icon as={LuShield} boxSize={4} />
              <Text fontSize='sm' fontWeight='semibold'>
                {t('voter_auth.guarantees', { defaultValue: 'Authentication Guarantees' })}
              </Text>
            </HStack>
            <SecurityLevelDisplay credentials={credentials} use2FA={use2FA} />
            <Text fontSize='sm' color='texts.subtle' mt={2}>
              {subtext}
            </Text>
          </Box>
          <Alert status={alert.status} variant='subtle' borderRadius='md' alignItems='start' py={3} px={4}>
            <AlertIcon />
            <Box>
              <AlertTitle fontWeight='bold'>{alert.title}</AlertTitle>
              <AlertDescription fontSize='sm'>{alert.description}</AlertDescription>
            </Box>
          </Alert>
        </Stack>
      </Box>
    </TabPanel>
  )
}
