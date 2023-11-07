import {
  Box,
  Button,
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
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { TbDatabaseExclamation } from 'react-icons/tb'
import { useClaim } from '~components/Faucet/Claim'
import { useProcessCreationSteps } from './Steps/use-steps'
import imageHeader from '/assets/voc-tokens.jpg'

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
        // set as NaN to ensure the "create" button is enabled (because it checks for a number)
        // this way the user can still create the election even tho the cost could not be estimated
        setCost(NaN)
      })
  }, [cost, unpublished])

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
              <Text mb={3}>{t('cost_preview.subtitle')}</Text>

              <UnorderedList>
                <ListItem>
                  <Text display='flex' justifyContent='space-between' fontSize='sm'>
                    <Trans
                      i18nKey='cost_preview.census_total'
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

      {cost && cost > account!.balance && (
        <Flex flexDir='column' alignItems='center' gap={2}>
          <Text color='red' textAlign='center'>
            {t('cost_preview.not_enough_tokens')}
          </Text>
          <Button
            variant='rounded'
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

const GetVocTokens = ({
  loading,
  handleSignIn,
}: {
  loading: boolean
  handleSignIn: (provider: string) => Promise<void>
}) => {
  const { t } = useTranslation()
  const [socialAccount, setSocialAccount] = useState('')

  return (
    <>
      <ModalContent minW={{ md: '600px' }}>
        <ModalHeader>
          <Text>{t('get_voc_tokens.title')}</Text>
          <Box bgImage={imageHeader} bgRepeat='no-repeat' minH={{ base: '180px', md: '200px' }} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={8}>
            <Trans
              i18nKey='get_voc_tokens.description'
              components={{
                text: <Text />,
                strong: <Text as='span' fontWeight='bold' />,
              }}
            />
          </Box>
          <Text fontSize='sm' fontWeight='bold' textAlign='center'>
            {t('get_voc_tokens.authentification_method')}
          </Text>
          <Flex justifyContent='space-around' my={3}>
            <Button
              aria-label={t('link.github').toString()}
              cursor='pointer'
              onClick={() => setSocialAccount('github')}
              sx={{
                '&': {
                  bgColor: socialAccount === 'github' ? 'primary.500' : '',

                  '& svg': {
                    color: socialAccount === 'github' ? 'white' : 'primary.500',
                  },

                  '&:disabled': {
                    '& svg': {
                      color: 'gray',
                    },
                  },

                  '&:hover': {
                    cursor: socialAccount === 'github' ? 'default' : 'pointer',
                    bgColor: socialAccount === 'github' ? 'primary.500' : '',

                    '& svg': {
                      color: socialAccount === 'github' ? 'white' : 'primary.500',
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
              <Icon as={FaGithub} w={8} h={8} />
            </Button>
            <Tooltip label={t('get_voc_tokens.coming_soon')}>
              <Button
                isDisabled
                aria-label={t('link.twitter').toString()}
                disabled
                cursor='pointer'
                onClick={() => setSocialAccount('twitter')}
                sx={{
                  '&': {
                    bgColor: socialAccount === 'twitter' ? 'primary.500' : '',

                    '& svg': {
                      color: socialAccount === 'twitter' ? 'white' : 'primary.500',
                    },

                    '&:disabled': {
                      '& svg': {
                        color: 'gray',
                      },
                    },

                    '&:hover': {
                      cursor: socialAccount === 'twitter' ? 'default' : 'pointer',
                      bgColor: socialAccount === 'twitter' ? 'primary.500' : '',

                      '& svg': {
                        color: socialAccount === 'twitter' ? 'white' : 'primary.500',
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
                <Icon as={FaTwitter} w={8} h={8} />
              </Button>
            </Tooltip>
            <Tooltip label={t('get_voc_tokens.coming_soon')}>
              <Button
                isDisabled
                aria-label={t('link.discord').toString()}
                disabled
                cursor='pointer'
                onClick={() => setSocialAccount('discord')}
                title='coming soon'
                sx={{
                  '&': {
                    bgColor: socialAccount === 'discord' ? 'primary.500' : '',

                    '& svg': {
                      color: socialAccount === 'discord' ? 'white' : 'primary.500',
                    },

                    '&:disabled': {
                      '& svg': {
                        color: 'gray',
                      },
                    },

                    '&:hover': {
                      cursor: socialAccount === 'discord' ? 'default' : 'pointer',
                      bgColor: socialAccount === 'discord' ? 'primary.500' : '',

                      '& svg': {
                        color: socialAccount === 'discord' ? 'white' : 'primary.500',
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
                <Icon as={FaDiscord} w={8} h={8} />
              </Button>
            </Tooltip>
          </Flex>

          <Text fontSize='sm' textAlign='center' color='gray'>
            <Trans
              i18nKey='get_voc_tokens.authentification_method_helper'
              values={{
                faucetAmount: import.meta.env.FAUCET_AMOUNT,
              }}
            />
          </Text>
        </ModalBody>

        <ModalFooter flexDirection='column' alignItems='center' gap={3}>
          <Button
            variant='rounded'
            colorScheme='primary'
            onClick={() => handleSignIn(socialAccount)}
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
