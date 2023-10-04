import { Flex, Spinner, Text } from '@chakra-ui/react'
import { Claim } from '@components/Faucet/Claim'
import { useClient } from '@vocdoni/react-providers'
import { UnpublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const CostPreview = ({
  unpublished,
  disable,
}: {
  unpublished: UnpublishedElection | undefined
  disable: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()
  const { account, client } = useClient()
  const [cost, setCost] = useState<number | undefined>()

  // election estimate cost
  useEffect(() => {
    if (typeof cost !== 'undefined' || typeof unpublished === 'undefined') return

    client
      .estimateElectionCost(unpublished)
      .then((cost) => {
        setCost(cost)
        disable(cost > account!.balance)
      })
      .catch((e) => {
        console.error('could not estimate election cost:', e)
        setCost(NaN)
      })
  }, [cost, unpublished])

  if (typeof cost === 'undefined') {
    return <Spinner />
  }

  return (
    <Flex flexDirection='column'>
      {t('form.process_create.confirm.cost_preview', {
        cost,
        balance: account?.balance,
      })}
      {cost > account!.balance && (
        <Flex color='orange' direction='column'>
          <Text>{t('form.process_create.confirm.not_enough_tokens')}</Text>
          <Claim />
        </Flex>
      )}
    </Flex>
  )
}
