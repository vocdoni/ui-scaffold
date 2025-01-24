import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { useFaucet } from '~components/Faucet/use-faucet'
import { OrganizationCreate as AccountCreationForm } from '~components/Organization/Create'

const AccountCreate = () => {
  const [faucetAmount, setFaucetAmount] = useState<number>(0)
  const { getAuthTypes } = useFaucet()

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        if (atypes.auth.oauth) {
          setFaucetAmount(atypes.auth.oauth)
        }
      } catch (e) {
        setFaucetAmount(NaN)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AccountCreationForm>
      <Text>
        <Trans
          i18nKey='new_organization.description1'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        >
          Set up your{' '}
          <Text as='span' fontWeight='bold'>
            organization for free
          </Text>{' '}
          and start creating voting processes to engage with your community.
        </Trans>
      </Text>
      <Text mb={5}>
        <Trans
          i18nKey='new_organization.description2'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
          values={{ faucetAmount }}
        >
          You will have the chance to claim tokens later from the faucet to create proposals and engage with your
          community.
        </Trans>
      </Text>
    </AccountCreationForm>
  )
}

export default AccountCreate
