import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { DashboardBox } from '~components/Layout/Dashboard'
import { useProfile } from '~src/queries/account'
import AccountForm from './Form'

export const AccountEdit = () => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  return (
    <Flex flexDirection='column' gap={6}>
      <DashboardBox px={6} pb={6} pt={4}>
        <AccountForm profile={profile} />
      </DashboardBox>

      {/*
      I hate leaving code like this commented out, but we're gonna need it in the future
      <DashboardBox p={6}>
        <Text size={'2xl'} fontWeight={'600'} mb={1.5}>
          {t('delete.danger_title', { defaultValue: 'Danger Zone' })}
        </Text>
        <Text size='sm' color='rgb(115, 115, 115)' mb={6}>
          {t('delete.dange_subtitle', { defaultValue: 'Permanently delete your account and all associated data' })}
        </Text>
        <Box h='1px' borderBottom={'var(--border)'} mb={6}></Box>
        <Text size={'lg'} fontWeight={'600'}>
          {t('delete.delete_title', { defaultValue: 'Delete Account' })}
        </Text>
        <Text size='sm' color='rgb(115, 115, 115)' mb={4}>
          {t('delete.delete_subtitle', {
            defaultValue: 'Once you delete your account, there is no going back. This action cannot be undone.',
          })}
        </Text>
        <Button colorScheme='red' alignSelf='center' mt='auto'>
          <Trans i18nKey='delete_my_account'>Delete Account</Trans>
        </Button>
      </DashboardBox> */}
    </Flex>
  )
}
