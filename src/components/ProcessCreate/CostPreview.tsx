import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Icon,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { UnpublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { TbDatabaseExclamation } from 'react-icons/tb'
import { HandleSignInFunction, useClaim } from '~components/Faucet/Claim'
import { useFaucet } from '~components/Faucet/use-faucet'
import { useProcessCreationSteps } from './Steps/use-steps'
import imageModal from '/assets/onvote-modal-get-voctokens.jpg'

export const CostPreview = ({
  unpublished,
  disable,
}: {
  unpublished: UnpublishedElection | undefined
  disable: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account, client } = useClient()
  const [cost, setCost] = useState<number | undefined>()
  const { form } = useProcessCreationSteps()
  const { loading, handleSignIn } = useClaim()
  const {
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
      })
      .catch((e) => {
        console.error('could not estimate election cost:', e)
        // set as NaN to ensure the "create" button is enabled (because it checks for a number)
        // this way the user can still create the election even tho the cost could not be estimated
        setCost(NaN)
      })
  }, [client, cost, unpublished])

  // disable button if cost is higher than account balance
  useEffect(() => {
    if (typeof cost === 'undefined' || !account?.balance) return

    disable(cost > account!.balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, account?.balance])

  return (
    <Flex flexDirection='column' gap={2} mb={5}>
      <Text fontWeight='bold' fontFamily='pixeloidsans' textTransform='uppercase'>
        {t('form.process_create.confirm.cost_title')}
      </Text>
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
              <Text mb={3}>{t('cost_preview.subtitle')}</Text>

              <UnorderedList>
                <ListItem>
                  <Text display='flex' justifyContent='space-between' fontSize='sm'>
                    <Trans
                      i18nKey='cost_preview.census_total'
                      components={{
                        span: <Text as='span' />,
                      }}
                      count={unpublished?.maxCensusSize}
                    />
                  </Text>
                </ListItem>

                <ListItem>
                  <Text display='flex' justifyContent='space-between' fontSize='sm'>
                    <Trans
                      i18nKey='cost_preview.duration'
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
                  <ListItem>
                    <Text display='flex' justifyContent='space-between' fontSize='sm'>
                      <Trans
                        i18nKey='form.process_create.confirm.anonymous'
                        components={{
                          span: <Text as='span' />,
                        }}
                      />
                    </Text>
                  </ListItem>
                )}
              </UnorderedList>
            </Box>
            <UnorderedList m={0}>
              <ListItem display='flex' justifyContent='space-between' fontWeight='bold' fontSize='sm'>
                <Trans
                  i18nKey='cost_preview.total'
                  components={{
                    span: <Text as='span' />,
                  }}
                  values={{
                    cost,
                  }}
                />
              </ListItem>{' '}
              <ListItem display='flex' justifyContent='space-between' fontWeight='bold' fontSize='sm'>
                <Trans
                  i18nKey='cost_preview.balance'
                  components={{
                    span: <Text as='span' />,
                    span2: <Text as='span' flex='0 0 50%' display='flex' alignItems='end' justifyContent='end' />,
                  }}
                  values={{
                    balance: account!.balance,
                  }}
                />
              </ListItem>
              <ListItem display='flex' justifyContent='space-between' fontWeight='bold' fontSize='sm'>
                <Trans
                  i18nKey='cost_preview.result'
                  components={{
                    span: <Text as='span' />,
                    span2: (
                      <Text
                        as='span'
                        color={account!.balance - cost < 0 ? 'process_create.preview_negative_balance' : ''}
                        flex='0 0 50%'
                        display='flex'
                        alignItems='end'
                        justifyContent='end'
                      />
                    ),
                  }}
                  values={{
                    remainTokens: account!.balance - cost,
                  }}
                />
              </ListItem>
            </UnorderedList>
          </>
        )}
      </Flex>
      {/* cost && cost > account!.balance */}
      {cost && cost > account!.balance && (
        <Flex flexDir='column' alignItems='center' gap={2}>
          <Text color='red' textAlign='center'>
            {t('cost_preview.not_enough_tokens')}
          </Text>
          <Button
            variant='on-vote'
            colorScheme='primary'
            leftIcon={<TbDatabaseExclamation />}
            maxW={64}
            onClick={onOpen}
          >
            {t('cost_preview.button')}
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <GetVocTokens handleSignIn={handleSignIn} loading={loading} />
          </Modal>
        </Flex>
      )}
    </Flex>
  )
}

const GetVocTokens = ({ loading, handleSignIn }: { loading: boolean; handleSignIn: HandleSignInFunction }) => {
  const { t } = useTranslation()
  const [socialAccount, setSocialAccount] = useState('')
  const { account } = useClient()
  const { getAuthTypes } = useFaucet()
  const [faucetAmount, setFaucetAmount] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        setFaucetAmount(atypes.oauth)
      } catch (e) {}
    })()
  }, [])

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{t('get_voc_tokens.title')}</Text>
          <Box bgImage={imageModal} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb='32px'>
            <Trans
              i18nKey='get_voc_tokens.description'
              components={{
                text: <Text />,
                strong: <Text as='span' fontWeight='bold' />,
              }}
            />
          </Box>
          <Flex flexDirection='column' gap='16px'>
            <Text fontSize='sm' fontWeight='bold' textAlign='center'>
              {t('get_voc_tokens.authentification_method')}
            </Text>
            <Flex justifyContent='space-around'>
              <OAuthLoginButton
                aria-label={t('login.github').toString()}
                onClick={() => setSocialAccount('github')}
                selected={socialAccount === 'github'}
              >
                <Icon as={FaGithub} w={8} h={8} />
              </OAuthLoginButton>
              <Tooltip>
                <OAuthLoginButton
                  aria-label={t('login.google').toString()}
                  onClick={() => setSocialAccount('google')}
                  selected={socialAccount === 'google'}
                >
                  <Icon as={FaGoogle} w={8} h={8} />
                </OAuthLoginButton>
              </Tooltip>
              <Tooltip>
                <OAuthLoginButton
                  aria-label={t('login.facebook').toString()}
                  onClick={() => setSocialAccount('facebook')}
                  selected={socialAccount === 'facebook'}
                >
                  <Icon as={FaFacebook} w={8} h={8} />
                </OAuthLoginButton>
              </Tooltip>
            </Flex>
            <Text fontSize='sm' textAlign='center' color='gray'>
              <Trans
                i18nKey='get_voc_tokens.authentification_method_helper'
                values={{
                  faucetAmount,
                }}
              />
            </Text>
          </Flex>
        </ModalBody>{' '}
        <ModalFooter flexDirection='column' alignItems='center' gap={3}>
          <Button
            variant='primary'
            onClick={() =>
              handleSignIn(socialAccount, account?.address as string, [
                { param: 'connected', value: true },
                { param: 'loadDraft', value: '' },
              ])
            }
            isLoading={loading}
            isDisabled={!socialAccount}
          >
            {t('get_voc_tokens.button')}
          </Button>

          <Trans
            i18nKey='get_voc_tokens.info'
            components={{
              text: <Text fontSize='sm' textAlign='center' />,
              mailto: <Link href='mailto:info@onvote.app' fontWeight='bold' color='primary.500' />,
            }}
          />
        </ModalFooter>
      </ModalContent>
    </>
  )
}

const OAuthLoginButton = (props: Partial<ButtonProps & { selected: boolean }>) => {
  const { children, selected } = props
  return (
    <Button
      {...props}
      cursor='pointer'
      title='coming soon'
      sx={{
        '&': {
          bgColor: selected ? 'primary.500' : '',

          '& svg': {
            color: selected ? 'white' : 'primary.500',
          },

          '&:disabled': {
            '& svg': {
              color: 'gray',
            },
          },

          '&:hover': {
            cursor: selected ? 'default' : 'pointer',
            bgColor: selected ? 'primary.500' : '',

            '& svg': {
              color: selected ? 'white' : 'primary.500',
            },

            '&:disabled': {
              '&': {
                cursor: 'default',
              },
              '& svg': {
                color: 'gray',
              },
            },
          },
        },
      }}
    >
      {children}
    </Button>
  )
}
