import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link as ChakraLink,
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
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Election, PlainCensus } from '@vocdoni/sdk'
import { useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlinePercentage } from 'react-icons/ai'
import { FaCcStripe, FaEthereum } from 'react-icons/fa'
import { MdOutlineLoop } from 'react-icons/md'
import { PiNumberSquareOneLight } from 'react-icons/pi'
import { generatePath, Link } from 'react-router-dom'

const Calculator = () => {
  const { t } = useTranslation()
  const { client } = useClient()
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
  }
  return (
    <Box width={'80%'} mx='auto' mb={20}>
      <Heading as={'h2'} mb={10} className='brand-theme' size={'xl'} textTransform='uppercase'>
        {t('calculator.title')}
      </Heading>

      <Trans
        i18nKey='calculator.description'
        components={{
          p: <Text mb={10} />,
        }}
      />

      <Flex className='calculator' flexDirection={{ base: 'column', xl2: 'row' }} overflow='hidden'>
        <FormProvider {...methods}>
          <Flex
            as='form'
            flex='0 0 50%'
            flexDirection='column'
            px={{ base: 5, lg: 14 }}
            py={5}
            bgColor='calculator.left_side'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <LeftSideCalculator />
          </Flex>
        </FormProvider>

        <Flex flex='0 0 50%' flexDirection='column' bgColor='calculator.right_side' color='calculator.right_side_color'>
          <RightSideCalculator priceTokens={priceTokens} />
        </Flex>
      </Flex>
    </Box>
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
const RightSideCalculator = ({ priceTokens }: { priceTokens: number }) => {
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
    <Tabs flexGrow={1} variant='soft-rounded' colorScheme='whiteAlpha' display='flex' flexDirection='column'>
      <TabList justifyContent='center' alignItems='center' flexWrap='wrap' gap={5} py={5}>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <PiNumberSquareOneLight />
          {t('calculator.one_time')}
        </Tab>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <AiOutlinePercentage />
          {t('calculator.packages')}
        </Tab>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <MdOutlineLoop />
          {t('calculator.recurring')}
        </Tab>
      </TabList>
      <TabPanels flexGrow={1} display='flex' flexDirection='column'>
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
            <Flex
              justifyContent='center'
              flexDirection={{ base: 'column', sm2: 'row' }}
              alignItems='center'
              gap={5}
              mt={8}
              mb={5}
            >
              <Button
                variant='secondary'
                as={Link}
                to={generatePath('/stripe/checkout/:amount', { amount: stripeAmount })}
                isDisabled={!totalPrice || !import.meta.env.STRIPE_PUBLIC_KEY.length}
              >
                <FaCcStripe />
                {t('calculator.buy_with_card')}
              </Button>
              <Button variant='secondary' isDisabled={!totalPrice}>
                <FaEthereum />
                {t('calculator.buy_with_crypto')}
              </Button>
            </Flex>
            <Text fontSize='14px' textAlign='center'>
              <Trans
                i18nKey='calculator.contact'
                components={{
                  link: <ChakraLink />,
                }}
              />
            </Text>
          </Box>
        </TabPanel>

        <TabPanel flexGrow={1} display='flex' flexDirection='column' px={{ base: 5, lg: 14 }}>
          <Flex mb={3}>
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
            <Flex
              flexDirection={{ base: 'column', sm2: 'row' }}
              alignItems='center'
              justifyContent='center'
              gap={5}
              mt={8}
              mb={5}
            >
              <Button variant='secondary' isDisabled={!radio}>
                <FaCcStripe />
                {t('calculator.buy_with_card')}
              </Button>
              <Button variant='secondary' isDisabled={!radio}>
                <FaEthereum />
                {t('calculator.buy_with_crypto')}
              </Button>
            </Flex>
            <Text fontSize='14px' textAlign='center'>
              <Trans
                i18nKey='calculator.more_tokens'
                components={{
                  link: <ChakraLink />,
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
                p: <Text />,
              }}
            />
          </Flex>

          <Box mt='auto'>
            <Flex justifyContent='center' mt={8} mb={5}>
              <Button variant='secondary'>Contact Us</Button>
            </Flex>

            <Text fontSize='14px' textAlign='center'>
              <Trans
                i18nKey='calculator.contact'
                components={{
                  link: <ChakraLink />,
                }}
              />
            </Text>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Calculator
