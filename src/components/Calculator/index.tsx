import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { Election, PlainCensus } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlinePercentage } from 'react-icons/ai'
import { FaCcStripe, FaEthereum } from 'react-icons/fa'
import { MdOutlineLoop } from 'react-icons/md'
import { PiNumberSquareOneLight } from 'react-icons/pi'
import { generatePath, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { MinPurchaseTokens, StripeEnabled, TokenPrice } from '~constants'

const Calculator = () => {
  const { t } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)
  const [totalTokens, setTotalTokens] = useState(0)

  return (
    <>
      <Flex direction='column' gap={4} className='site-wrapper'>
        <Box mx='auto' mb={20}>
          <Heading as={'h2'} mb={10} className='brand-theme' size={'xl'} textTransform='uppercase'>
            {t('calculator.title')}
          </Heading>

          <Trans
            i18nKey='calculator.description'
            components={{
              p: <Text mb={10} />,
            }}
          />
          <Tabs variant='calculator' onChange={(index) => setTabIndex(index)} index={tabIndex}>
            <TabList>
              <Tab>
                <PiNumberSquareOneLight />
                {t('calculator.one_time')}
              </Tab>
              <Tab>
                <AiOutlinePercentage />
                {t('calculator.packages')}
              </Tab>
              <Tab>
                <MdOutlineLoop />
                {t('calculator.recurring')}
              </Tab>
            </TabList>

            <Card variant='calculator'>
              <LeftSideCalculator setTabIndex={setTabIndex} setTotalTokens={setTotalTokens} />
              <RightSideCalculator totalTokens={totalTokens} setTotalTokens={setTotalTokens} />
            </Card>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
const LeftSideCalculator = ({
  setTabIndex,
  setTotalTokens,
}: {
  setTabIndex: Dispatch<SetStateAction<number>>
  setTotalTokens: Dispatch<SetStateAction<number>>
}) => {
  const { t } = useTranslation()
  const { client } = useClient()

  const methods = useForm({
    defaultValues: {
      censusSize: 100,
      duration: 1,
      numberElections: 1,
      anonymous: false,
      encrypted: false,
      voteOverwrite: false,
      package: 0,
    },
  })

  const anonymous = methods.watch('anonymous', false)
  const encrypted = methods.watch('encrypted', false)
  const voteOverwrite = methods.watch('voteOverwrite', false)

  const onSubmit = async (form: any) => {
    const startDate = new Date()

    const endDate = new Date(startDate.getTime() + form.duration * 24 * 60 * 60 * 1000)

    const census = new PlainCensus()

    const election = Election.from({
      title: 'Election title',
      description: 'Election description',
      startDate,
      endDate,
      census,
      electionType: {
        anonymous: form.anonymous,
        secretUntilTheEnd: form.encrypted,
      },
      voteType: {
        maxVoteOverwrites: form.voteOverwrite ? 1 : 0,
      },
      maxCensusSize: form.censusSize,
    })

    const price = await client.calculateElectionCost(election)

    setTotalTokens(price * form.numberElections)
    setTabIndex(0)
  }
  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        flexGrow={1}
        flexShrink={0}
        flexBasis={{ base: '100%', xl: '50%' }}
        flexDirection='column'
        px={{ base: 5, lg: 14 }}
        py='16px'
        bgColor='calculator.left_side'
      >
        <Text className='process-create-title' textTransform='uppercase' textAlign='center' mb={5}>
          {t('calculator.estimate_election_cost')}
        </Text>
        <Flex flexGrow={1} mb={5} flexDirection='column' justifyContent='space-between' gap={3}>
          <Controller
            name={'censusSize'}
            control={methods.control}
            defaultValue={1}
            rules={{
              required,
            }}
            render={({ field: { ref, onChange, value, ...restField } }) => (
              <FormControl
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexDirection={{ base: 'column', sm2: 'row' }}
                gap={2}
              >
                <FormLabel m={0} whiteSpace='nowrap'>
                  {t('calculator.census_size')}
                </FormLabel>
                <Flex gap={8}>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={100000000}
                    maxW={40}
                    value={value}
                    {...restField}
                    onChange={(_, num) => {
                      onChange(num)
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </FormControl>
            )}
          />
          <Controller
            name={'duration'}
            control={methods.control}
            defaultValue={1}
            rules={{
              required,
            }}
            render={({ field: { ref, onChange, value, ...restField } }) => (
              <FormControl
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexDirection={{ base: 'column', sm2: 'row' }}
                gap={2}
              >
                <FormLabel m={0} whiteSpace='nowrap'>
                  {t('calculator.duration')}
                </FormLabel>
                <Flex gap={8}>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={1800}
                    maxW={40}
                    value={value}
                    {...restField}
                    onChange={(_, num) => {
                      onChange(num)
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </FormControl>
            )}
          />
          <Controller
            name={'numberElections'}
            control={methods.control}
            defaultValue={1}
            rules={{
              required,
            }}
            render={({ field: { ref, onChange, value, ...restField } }) => (
              <FormControl
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexDirection={{ base: 'column', sm2: 'row' }}
                gap={2}
                mb={8}
              >
                <FormLabel m={0} whiteSpace='nowrap'>
                  {t('calculator.num_elections')}
                </FormLabel>
                <Flex gap={8}>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={1000}
                    maxW={40}
                    value={value}
                    {...restField}
                    onChange={(_, num) => {
                      onChange(num)
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </FormControl>
            )}
          />
          <Flex justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }}>
            <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }} mb={8}>
              <Checkbox {...methods.register('anonymous')} isChecked={anonymous} id='anonymous'></Checkbox>
              <FormLabel
                variant='process-create-label'
                htmlFor='anonymous'
                fontSize='16px'
                lineHeight='20px'
                whiteSpace='nowrap'
                m={0}
              >
                {t('calculator.anonymous')}
              </FormLabel>
            </Flex>
            <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }} mb={8}>
              <Checkbox {...methods.register('encrypted')} isChecked={encrypted} id='encrypted'></Checkbox>
              <FormLabel
                variant='process-create-label'
                htmlFor='encrypted'
                fontSize='16px'
                lineHeight='20px'
                whiteSpace='nowrap'
                m={0}
              >
                {t('calculator.encrypted')}
              </FormLabel>
            </Flex>
            <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }} mb={8}>
              <Checkbox {...methods.register('voteOverwrite')} isChecked={voteOverwrite} id='voteOverwrite'></Checkbox>
              <FormLabel
                variant='process-create-label'
                htmlFor='voteOverwrite'
                fontSize='16px'
                lineHeight='20px'
                whiteSpace='nowrap'
                m={0}
              >
                {t('calculator.vote_overwrite')}
              </FormLabel>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt='auto' justifyContent='center'>
          <Button type='submit'> {t('calculator.calculate_cost')}</Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}
const RightSideCalculator = ({
  totalTokens,
  setTotalTokens,
}: {
  totalTokens: number
  setTotalTokens: Dispatch<SetStateAction<number>>
}) => {
  const { t } = useTranslation()

  const totalPrice = TokenPrice * totalTokens

  return (
    <Flex
      flexDirection='column'
      flexGrow={1}
      flexShrink={0}
      flexBasis={{ base: '100%', xl: '50%' }}
      bgColor='calculator.right_side'
      color='calculator.right_side_color'
    >
      <TabPanels flexGrow={1} display='flex' flexDirection='column' pt={10}>
        <TabPanel flexGrow={1} display='flex' flexDirection='column'>
          <Box px={{ base: 5, lg: 14 }}>
            <Flex justifyContent='space-between' mb={3}>
              <Text>{t('calculator.voting_process_cost')}</Text>
              <Text fontWeight='bold'>{totalTokens} tokens</Text>
            </Flex>
            <Flex justifyContent='space-between' mb={8}>
              <Text>{t('calculator.price_per_token')}</Text>
              <Text fontWeight='bold'>0.15 €</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Flex flexDirection='column'>
                <Text>{t('calculator.total_cost')}</Text>
                <Text>{t('calculator.vat')}</Text>
              </Flex>
              <Text fontWeight='bold'>{totalPrice.toFixed(2)} €</Text>
            </Flex>
          </Box>
          <Box mt='auto'>
            <BuyBtns totalTokens={totalTokens} />

            <Text fontSize='14px' textAlign='center'>
              <Trans
                i18nKey='calculator.contact'
                components={{
                  customLink: (
                    <Link as={ReactRouterLink} to='https://www.vocdoni.io/contact' target='_blank' color='white' />
                  ),
                  faqsLink: <Link as={ReactRouterLink} to='/#faqs' color='white' />,
                }}
              />
            </Text>
          </Box>
        </TabPanel>

        <TabPanel flexGrow={1} display='flex' flexDirection='column'>
          <Flex mb={3} px={{ base: 5, lg: 14 }}>
            <Text flex='1 1 33%' textAlign='start' textTransform='uppercase'>
              {t('calculator.package')}
            </Text>
            <Text flex='1 1 30%' textAlign='center' textTransform='uppercase'>
              {t('calculator.discount')}
            </Text>
            <Text flex='1 1 30%' textAlign='end' textTransform='uppercase'>
              {t('calculator.total')}
            </Text>
          </Flex>
          <RadioGroup value={String(totalTokens)} onChange={(e) => setTotalTokens(Number(e))} px={{ base: 5, lg: 14 }}>
            <Stack>
              <Flex gap={2}>
                <Radio value='1000' id='1' colorScheme='secondary'></Radio>
                <Flex as='label' grow={1} htmlFor='1' fontWeight={totalTokens === 1000 ? 'bold' : 'normal'}>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                    1K Tokens
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='center'>
                    1%
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='end'>
                    149 €
                  </Text>
                </Flex>
              </Flex>

              <Flex gap={2}>
                <Radio value='15000' id='2' colorScheme='secondary'></Radio>
                <Flex as='label' grow={1} htmlFor='2' fontWeight={totalTokens === 15000 ? 'bold' : 'normal'}>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                    15K Tokens
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='center'>
                    7%
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='end'>
                    697 €
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={2}>
                <Radio value='30000' id='3' colorScheme='secondary'></Radio>
                <Flex as='label' grow={1} htmlFor='3' fontWeight={totalTokens === 30000 ? 'bold' : 'normal'}>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                    30K Tokens
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='center'>
                    15%
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='end'>
                    1275 €
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={2}>
                <Radio value='50000' id='4' colorScheme='secondary'></Radio>
                <Flex as='label' grow={1} htmlFor='4' fontWeight={totalTokens === 50000 ? 'bold' : 'normal'}>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                    50K Tokens
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='center'>
                    21%
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='end'>
                    5925 €
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={2}>
                <Radio value='100000' id='5' colorScheme='secondary'></Radio>
                <Flex as='label' grow={1} htmlFor='5' fontWeight={totalTokens === 100000 ? 'bold' : 'normal'}>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                    +100K Tokens
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='center'>
                    30%
                  </Text>
                  <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='end'>
                    10500 €
                  </Text>
                </Flex>
              </Flex>
            </Stack>
          </RadioGroup>
          <Box mt='auto'>
            <BuyBtns totalTokens={totalTokens} />
            <Text fontSize='14px' textAlign='center'>
              <Trans
                i18nKey='calculator.more_tokens'
                components={{
                  customLink: <Link as={ReactRouterLink} to='https://www.vocdoni.io/contact' color='white' />,
                }}
              />
            </Text>
          </Box>
        </TabPanel>

        <TabPanel flexGrow={1} display='flex' flexDirection='column'>
          <Flex grow={1} flexDirection='column' justifyContent='space-between' gap={3} px={{ base: 5, lg: 14 }}>
            <Trans
              i18nKey='calculator.recurring_description'
              components={{
                p: <Text mb={2} />,
              }}
            />
          </Flex>

          <Flex mt='20px' justifyContent='center'>
            <Button as={ReactRouterLink} to='https://www.vocdoni.io/contact' target='_blank' variant='secondary'>
              {t('calculator.contact_us')}
            </Button>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Flex>
  )
}

const TokensModal = ({
  isOpen,
  onClose,
  totalTokens,
}: {
  isOpen: boolean
  onClose: () => void
  totalTokens: number
}) => {
  const { t } = useTranslation()
  const { account } = useClient()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tokens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {totalTokens < MinPurchaseTokens && account && account?.balance >= totalTokens ? (
            <Trans
              i18nKey='calculator.modal.minimum_tokens_purchase_and_enough_tokens'
              components={{
                p: <Text textAlign='center' />,
              }}
              values={{
                pricePerToken: TokenPrice.toString(),
                minimumTokens: MinPurchaseTokens.toString(),
                totalPrice: (TokenPrice * MinPurchaseTokens).toString(),
              }}
            />
          ) : account && account?.balance >= totalTokens ? (
            <Trans
              i18nKey='calculator.modal.enough_tokens'
              components={{
                p: <Text textAlign='center' />,
              }}
            />
          ) : totalTokens < MinPurchaseTokens ? (
            <Trans
              i18nKey='calculator.modal.minimum_tokens_purchase'
              components={{
                p: <Text textAlign='center' />,
              }}
              values={{
                pricePerToken: TokenPrice.toString(),
                minimumTokens: MinPurchaseTokens.toString(),
                totalPrice: (TokenPrice * MinPurchaseTokens).toString(),
              }}
            />
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button
            as={ReactRouterLink}
            to={generatePath('/stripe/checkout/:amount', {
              amount: totalTokens < 100 ? '100' : totalTokens.toString(),
            })}
            isDisabled={!totalTokens || !import.meta.env.STRIPE_PUBLIC_KEY.length}
          >
            <FaCcStripe />
            {t('calculator.buy_with_card')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const BuyBtns = ({ totalTokens }: { totalTokens: number }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useClient()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [hasConnected, setHasConnected] = useState(false)

  if (!StripeEnabled) console.warn('Stripe is not enabled')

  useEffect(() => {
    if (hasConnected && isConnected) {
      onOpen()
    }
  }, [isConnected, hasConnected])

  const isBuyBtnDisabled = !import.meta.env.STRIPE_PUBLIC_KEY.length || !totalTokens

  return (
    <>
      <Flex alignItems={{ base: 'center', sm2: 'start' }} justifyContent='center' flexWrap='wrap' gap={5} mt={8} mb={5}>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' gap={1}>
          <Button
            variant='secondary'
            onClick={() => {
              if (!isConnected && openConnectModal) {
                openConnectModal()
                setHasConnected(true)
              } else if (!isBuyBtnDisabled && account && account?.balance >= totalTokens && totalTokens < 100) {
                onOpen()
              } else if (!isBuyBtnDisabled) {
                navigate(
                  generatePath('/stripe/checkout/:amount', {
                    amount: totalTokens < MinPurchaseTokens ? MinPurchaseTokens.toString() : totalTokens.toString(),
                  })
                )
              }
            }}
            isDisabled={isBuyBtnDisabled}
            as={ReactRouterLink}
          >
            <FaCcStripe />
            {t('calculator.buy_with_card')}
          </Button>
          {totalTokens < 100 && (
            <Text as='span' fontSize='sm'>
              Min. 100 tokens
            </Text>
          )}
        </Flex>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' gap={1}>
          <Button variant='secondary' isDisabled={true}>
            <FaEthereum />
            {t('calculator.buy_with_crypto')}
          </Button>
          <Text as='span' fontSize='sm'>
            {t('calculator.coming_soon')}
          </Text>
        </Flex>
      </Flex>
      <TokensModal isOpen={isOpen} onClose={onClose} totalTokens={totalTokens} />
    </>
  )
}

export default Calculator
