import { AlertStatus, Box, HStack, ListItem, UnorderedList, useStyleConfig } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

export enum SecurityLevels {
  WEAK = 'WEAK',
  MID = 'MID',
  STRONG = 'STRONG',
}

export type SecurityLevel = SecurityLevels.WEAK | SecurityLevels.MID | SecurityLevels.STRONG

export type SecurityLevelMessages = {
  subtext: JSX.Element
  alert: {
    title: JSX.Element
    description: JSX.Element
    status: AlertStatus
  }
}

export const getSecurityLevelMessages = (level: SecurityLevel): SecurityLevelMessages => {
  switch (level) {
    case SecurityLevels.STRONG:
      return {
        subtext: (
          <Trans i18nKey='voter_auth.guarantees_sub_strong'>
            Strong authentication guarantees with two-factor verification enabled.
          </Trans>
        ),
        alert: {
          title: <Trans i18nKey='voter_auth.guarantees_strong_title'>Strong Authentication Guarantees</Trans>,
          description: (
            <Trans i18nKey='voter_auth.guarantees_strong_description'>
              Your configuration provides strong authentication guarantees with two-factor verification.
            </Trans>
          ),
          status: 'success',
        },
      }
    case SecurityLevels.MID:
      return {
        subtext: (
          <Trans i18nKey='voter_auth.guarantees_sub_mid'>
            Mid-level authentication guarantees with 3 credentials but no two-factor verification.
          </Trans>
        ),
        alert: {
          title: <Trans i18nKey='voter_auth.guarantees_mid_title'>Mid-Level Authentication Guarantees</Trans>,
          description: (
            <>
              <Trans i18nKey='voter_auth.guarantees_mid_description_intro'>
                Your configuration provides mid-level authentication guarantees with 3 credentials.
              </Trans>
              <UnorderedList mt={2} pl={4}>
                <ListItem>
                  <Trans i18nKey='voter_auth.guarantees_mid_list_1'>
                    Enable two-factor authentication for strong guarantees
                  </Trans>
                </ListItem>
              </UnorderedList>
            </>
          ),
          status: 'warning',
        },
      }
    case SecurityLevels.WEAK:
    default:
      return {
        subtext: (
          <Trans i18nKey='voter_auth.guarantees_sub_weak'>
            Basic authentication guarantees with 1 credential and no two-factor verification.
          </Trans>
        ),
        alert: {
          title: <Trans i18nKey='voter_auth.guarantees_weak_title'>Weak Authentication Guarantees</Trans>,
          description: (
            <>
              <Trans i18nKey='voter_auth.guarantees_weak_description_intro'>
                Your current configuration provides minimal authentication guarantees. We strongly recommend:
              </Trans>
              <UnorderedList mt={2} pl={4}>
                <ListItem>
                  <Trans i18nKey='voter_auth.guarantees_weak_list_1'>
                    Add more credentials (aim for 2) for better identity verification
                  </Trans>
                </ListItem>
                <ListItem>
                  <Trans i18nKey='voter_auth.guarantees_weak_list_2'>
                    Enable two-factor authentication for an additional verification layer
                  </Trans>
                </ListItem>
              </UnorderedList>
            </>
          ),
          status: 'error',
        },
      }
  }
}

export const getSecurityLevel = (use2FA: boolean, credentials: string[]): SecurityLevel => {
  if (use2FA) return SecurityLevels.STRONG
  return credentials.length === 3 ? SecurityLevels.MID : SecurityLevels.WEAK
}

const SecurityLevelBox = ({ level, isActive }: { level: SecurityLevel; isActive: boolean }) => {
  const variant = isActive ? level.toLowerCase() : 'inactive'
  const styles = useStyleConfig('SecurityLevelBox', { variant })

  return <Box __css={styles}>{level}</Box>
}

export const SecurityLevelDisplay = ({ credentials = [], use2FA }: { credentials: string[]; use2FA: boolean }) => {
  const level = getSecurityLevel(use2FA, credentials)

  return (
    <HStack spacing={3} w='full'>
      {(['WEAK', 'MID', 'STRONG'] as SecurityLevel[]).map((lvl) => (
        <SecurityLevelBox key={lvl} level={lvl} isActive={lvl === level} />
      ))}
    </HStack>
  )
}
