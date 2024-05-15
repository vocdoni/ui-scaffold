import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { AccountCreate as AccountCreationForm } from '~components/Account/Create'
import { useFaucet } from '~components/Faucet/use-faucet'

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
        />
      </Text>
      <Text mb={5}>
        <Trans
          i18nKey='new_organization.description2'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
          values={{ faucetAmount }}
        />
      </Text>
    </AccountCreationForm>
  )
}

export default AccountCreate
