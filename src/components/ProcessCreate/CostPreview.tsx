import { Box, Flex, ListItem, Spinner, Text, UnorderedList } from '@chakra-ui/react'
import { Claim } from '@components/Faucet/Claim'
import { useClient } from '@vocdoni/react-providers'
import { UnpublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from './Steps/use-steps'

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
  const { form } = useProcessCreationSteps()
  const {
    addresses,
    startDate,
    endDate,
    electionType: { anonymous, autoStart },
  } = form

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
    <Flex flexDirection='column' gap={2} mb={5}>
      <Text fontWeight='bold'>{t('form.process_create.confirm.cost_title')}</Text>
      <Text fontSize='sm'>{t('form.process_create.confirm.cost_description')}</Text>
      <Flex flexDirection='column' gap={4} p={{ base: 3, xl: 6 }} bgColor='process_create.section' borderRadius='md'>
        {typeof cost === 'undefined' && (
          <Flex justifyContent='center'>
            <Spinner textAlign='center' />
          </Flex>
        )}
        {typeof cost !== 'undefined' && (
          <>
            <Box fontSize='sm'>
              <Text mb={3}>Your voting process</Text>
              <UnorderedList>
                <ListItem>
                  <Text display='flex' justifyContent='space-between' fontSize='sm'>
                    <Trans
                      i18nKey='form.process_create.confirm.census_total'
                      components={{
                        span: <Text as='span' />,
                      }}
                      count={addresses.length}
                    />
                  </Text>
                </ListItem>

                <ListItem>
                  <Text display='flex' justifyContent='space-between' fontSize='sm'>
                    <Trans
                      i18nKey='form.process_create.confirm.duration_total'
                      components={{
                        span: <Text as='span' />,
                      }}
                      values={{
                        date: {
                          begin: startDate && !autoStart ? new Date(startDate) : new Date(),
                          end: new Date(endDate),
                        },
                      }}
                    />
                  </Text>
                </ListItem>

                {anonymous && (
                  <ListItem fontSize='sm'>
                    <Text display='flex' justifyContent='space-between' fontSize='sm'>
                      <Trans
                        i18nKey='form.process_create.confirm.params'
                        components={{
                          span: <Text as='span' />,
                        }}
                      />
                    </Text>
                  </ListItem>
                )}
              </UnorderedList>
            </Box>
            <Text display='flex' justifyContent='space-between' fontWeight='bold' fontSize='sm'>
              <Trans
                i18nKey='form.process_create.confirm.total'
                components={{
                  span: <Text as='span' />,
                }}
                count={cost}
              />
            </Text>
          </>
        )}
      </Flex>
      <Text>{cost > account!.balance && <Claim />}</Text>
    </Flex>
  )
}
