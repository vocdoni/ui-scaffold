import {
  Box,
  Button,
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
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlinePercentage } from 'react-icons/ai'
import { FaCcStripe, FaEthereum } from 'react-icons/fa'
import { MdOutlineLoop } from 'react-icons/md'
import { PiNumberSquareOneLight } from 'react-icons/pi'
import { generatePath, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

const Calculator = () => {
  const { t } = useTranslation()
  const { client } = useClient()

  const [tabIndex, setTabIndex] = useState(0)
  const [priceTokens, setPriceTokens] = useState(0)

  const methods = useForm({
    defaultValues: {
      censusSize: 100,
      duration: 1,
      numberElections: 1,
      anonymous: false,
      encrypted: false,
      voteOverwrite: false,
    },
  })

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
        secretUntilTheEnd: true,
      },
      voteType: {
        maxVoteOverwrites: 0,
      },
      maxCensusSize: form.censusSize,
    })

    const price = await client.calculateElectionCost(election)

    setPriceTokens(price * form.numberElections)
    setTabIndex(0)
  }
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

            <Flex
              className='calculator'
              flexDirection={{ base: 'column', xl: 'row' }}
              overflow='hidden'
              maxW={{ base: '600px', xl: 'none' }}
              mx='auto'
              mb='100px'
            >
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
                  <LeftSideCalculator />
                </Flex>
              </FormProvider>
              <Flex
                flexDirection='column'
                flexGrow={1}
                flexShrink={0}
                flexBasis={{ base: '100%', xl: '50%' }}
                bgColor='calculator.right_side'
                color='calculator.right_side_color'
              >
                <RightSideCalculator priceTokens={priceTokens} tabIndex={tabIndex} />
              </Flex>
            </Flex>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
const LeftSideCalculator = () => {
  const { t } = useTranslation()

  const { control, watch, register } = useFormContext()
  const anonymous = watch('anonymous', false)
  const encrypted = watch('encrypted', false)
  const voteOverwrite = watch('voteOverwrite', false)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  return (
    <>
      <Text className='process-create-title' textTransform='uppercase' textAlign='center' mb={5}>
        {t('calculator.estimate_election_cost')}
      </Text>
      <Flex flexGrow={1} mb={5} flexDirection='column' justifyContent='space-between' gap={3}>
        <Controller
          name={'censusSize'}
          control={control}
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
          control={control}
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
          control={control}
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
            <Checkbox {...register('anonymous')} isChecked={anonymous} id='anonymous'></Checkbox>
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
            <Checkbox {...register('encrypted')} isChecked={encrypted} id='encrypted'></Checkbox>
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
            <Checkbox {...register('voteOverwrite')} isChecked={voteOverwrite} id='voteOverwrite'></Checkbox>
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
    </>
  )
}
const RightSideCalculator = ({ priceTokens, tabIndex }: { priceTokens: number; tabIndex: number }) => {
  const { t } = useTranslation()

  const pricePerToken = 0.15
  const totalPrice = pricePerToken * priceTokens
  const stripeEnabled = import.meta.env.STRIPE_PUBLIC_KEY.length > 0
  const stripeAmount = priceTokens < 100 ? '100' : priceTokens.toString()
  if (!stripeEnabled) console.warn('Stripe is not enabled')

  const packages = {
    '1k': 149,
    '5k': 697,
    '10k': 1275,
    '50k': 5925,
    '100k': 10500,
  }

  const [radio, setRadio] = useState(0)

  return (
    <TabPanels flexGrow={1} display='flex' flexDirection='column' pt={10}>
      <TabPanel flexGrow={1} display='flex' flexDirection='column'>
        <Box px={{ base: 5, lg: 14 }}>
          <Flex justifyContent='space-between' mb={3}>
            <Text>{t('calculator.voting_process_cost')}</Text>
            <Text fontWeight='bold'>{priceTokens} tokens</Text>
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
          <BuyBtns
            priceTokens={priceTokens}
            stripeAmount={stripeAmount}
            totalPrice={totalPrice}
            oneTimeTab={tabIndex === 0}
          />

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
        <RadioGroup
          onChange={(e) => {
            if (e === '1') setRadio(packages['1k'])
            if (e === '2') setRadio(packages['5k'])
            if (e === '3') setRadio(packages['10k'])
            if (e === '4') setRadio(packages['50k'])
            if (e === '5') setRadio(packages['100k'])
          }}
          px={{ base: 5, lg: 14 }}
        >
          <Stack>
            <Flex gap={2}>
              <Radio value='1' id='1' colorScheme='secondary'></Radio>
              <Flex as='label' grow={1} htmlFor='1' fontWeight={radio === packages['1k'] ? 'bold' : 'normal'}>
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
              <Radio value='2' id='2' colorScheme='secondary'></Radio>
              <Flex as='label' grow={1} htmlFor='2' fontWeight={radio === packages['5k'] ? 'bold' : 'normal'}>
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
              <Radio value='3' id='3' colorScheme='secondary'></Radio>
              <Flex as='label' grow={1} htmlFor='3' fontWeight={radio === packages['10k'] ? 'bold' : 'normal'}>
                <Text flex='1 1 30%' whiteSpace='nowrap' textAlign='start'>
                  10K Tokens
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
              <Radio value='4' id='4' colorScheme='secondary'></Radio>
              <Flex as='label' grow={1} htmlFor='4' fontWeight={radio === packages['50k'] ? 'bold' : 'normal'}>
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
              <Radio value='5' id='5' colorScheme='secondary'></Radio>
              <Flex as='label' grow={1} htmlFor='5' fontWeight={radio === packages['100k'] ? 'bold' : 'normal'}>
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
          <BuyBtns
            priceTokens={priceTokens}
            stripeAmount={stripeAmount}
            totalPrice={totalPrice}
            packageSelected={radio}
            oneTimeTab={tabIndex === 0}
          />
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
  )
}

const EnoughTokensModal = ({
  isOpen,
  onClose,
  totalPrice,
  stripeAmount,
}: {
  isOpen: boolean
  onClose: () => void
  totalPrice: number
  stripeAmount: string
}) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tokens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Trans />
          <Trans
            i18nKey='calculator.modal_description'
            components={{
              p: <Text textAlign='center' />,
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            as={ReactRouterLink}
            to={generatePath('/stripe/checkout/:amount', { amount: stripeAmount })}
            isDisabled={!totalPrice || !import.meta.env.STRIPE_PUBLIC_KEY.length}
          >
            <FaCcStripe />
            {t('calculator.buy_with_card')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const BuyBtns = ({
  priceTokens,
  totalPrice,
  stripeAmount,
  oneTimeTab,
  packageSelected,
}: {
  priceTokens: number
  totalPrice: number
  stripeAmount: string
  oneTimeTab?: boolean
  packageSelected?: number
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useClient()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [hasConnected, setHasConnected] = useState(false)

  useEffect(() => {
    if (hasConnected && isConnected) {
      onOpen()
    }
  }, [isConnected, hasConnected])

  const oneTimeDisabled =
    !import.meta.env.STRIPE_PUBLIC_KEY.length || !oneTimeTab || !(!!totalPrice && priceTokens > 100)
  const packageDisabled = !import.meta.env.STRIPE_PUBLIC_KEY.length || !packageSelected

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
              } else if (oneTimeTab && account && account?.balance >= priceTokens) {
                onOpen()
              } else {
                navigate(generatePath('/stripe/checkout/:amount', { amount: stripeAmount }))
              }
            }}
            as={ReactRouterLink}
            isDisabled={oneTimeDisabled && packageDisabled}
          >
            <FaCcStripe />
            {t('calculator.buy_with_card')}
          </Button>
          {!!(oneTimeTab && !!totalPrice && priceTokens < 100) && (
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
      <EnoughTokensModal isOpen={isOpen} onClose={onClose} totalPrice={totalPrice} stripeAmount={stripeAmount} />
    </>
  )
}

export default Calculator
