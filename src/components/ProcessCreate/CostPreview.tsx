import { Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { VocdoniFaucet } from '@constants'
import { useClient } from '@vocdoni/react-providers'
import { UnpublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiShoppingCart } from 'react-icons/hi'

export const CostPreview = ({ unpublished }: { unpublished: UnpublishedElection }) => {
  const { t } = useTranslation()
  const { account, client } = useClient()
  const [cost, setCost] = useState<number | undefined>()

  // election estimate cost
  useEffect(() => {
    if (typeof cost !== 'undefined' || typeof unpublished === 'undefined') return

    client
      .estimateElectionCost(unpublished)
      .then(setCost)
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
      {cost > account?.balance && (
        <Flex color='orange' direction='column'>
          <Text>{t('form.process_create.confirm.not_enough_tokens')}</Text>
          <Link variant='button' colorScheme='primary' alignSelf='self-start' target='_blank' href={VocdoniFaucet}>
            <HiShoppingCart size={20} /> {t('form.process_create.confirm.get_more_tokens')}
          </Link>
        </Flex>
      )}
    </Flex>
  )
}
