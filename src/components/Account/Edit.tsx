import { Button, Flex, HStack, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { LuCheck, LuCopy } from 'react-icons/lu'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { DashboardBox } from '~shared/Dashboard/Contents'
import { useProfile } from '~src/queries/account'
import AccountForm from './Form'

export const AccountEdit = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: profile } = useProfile()
  return (
    <Flex flexDirection='column' gap={6}>
      <DashboardBox px={6} pb={6} pt={4}>
        <AccountForm profile={profile} />
      </DashboardBox>
      <DashboardBox p={6}>
        <Text size='2xl' fontWeight='600'>
          {t('delete.delete_title', { defaultValue: 'Delete Account' })}
        </Text>
        <Text size='sm' color='texts.subtle'>
          {t('delete.delete_subtitle', { defaultValue: 'Permanently delete your account and all associated data' })}
        </Text>
        <Button colorScheme='red' alignSelf={'flex-start'} onClick={onOpen}>
          <Trans i18nKey='delete_my_account'>Delete Account</Trans>
        </Button>
      </DashboardBox>
      <DeleteModal
        size='md'
        isOpen={isOpen}
        onClose={onClose}
        title={t('delete.confirm_title', { defaultValue: 'Delete Your Account' })}
        subtitle={
          <Flex flexDirection='column' gap={2}>
            <Text fontSize='sm'>
              {t('delete.confirm_description', {
                defaultValue: 'To delete your account, please contact our support team via email.',
              })}
            </Text>
            <HStack py={4}>
              <Text fontFamily='mono' colorScheme='black' fontWeight='extrabold'>
                support@vocdoni.org
              </Text>
              <IconButton
                icon={<Icon as={showCheck ? LuCheck : LuCopy} />}
                aria-label={t('delete.copy_email', { defaultValue: 'Copy support email' })}
                onClick={handleCopy}
                variant='ghost'
                size='sm'
              />
            </HStack>
          </Flex>
        }
      >
        <Flex flexDirection='column'>
          <Button variant='outline' alignSelf='flex-end' onClick={onClose}>
            {t('delete.cancel_button', { defaultValue: 'Cancel' })}
          </Button>
        </Flex>
      </DeleteModal>
    </Flex>
  )
}
