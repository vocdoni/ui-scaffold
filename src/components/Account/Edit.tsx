import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { InnerContentsMaxWidth } from '~constants'
import { useProfile } from '~src/queries/account'
import AccountForm from './Form'
import PasswordForm from './PasswordForm'
import Teams from './Teams'

export const AccountEdit = () => {
  const { data: profile } = useProfile()
  return (
    <Flex flexDirection='column'>
      <Tabs w='full' maxW={InnerContentsMaxWidth} mx='auto' isFitted>
        <TabList>
          <Tab>
            <Trans i18nKey='profile.title'>Profile</Trans>
          </Tab>
          <Tab>
            <Trans i18nKey='password'>Password</Trans>
          </Tab>
          <Tab>
            <Trans i18nKey='teams'>Teams</Trans>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AccountForm profile={profile} />
          </TabPanel>
          <TabPanel>
            <PasswordForm />
          </TabPanel>
          <TabPanel>
            <Teams roles={profile?.organizations} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button colorScheme='red' variant='outline' alignSelf='center' mt='auto' isDisabled>
        <Trans i18nKey='delete_my_account'>Delete my account</Trans>
      </Button>
    </Flex>
  )
}
