import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
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
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AiOutlinePercentage } from 'react-icons/ai'
import { FaCcStripe, FaEthereum } from 'react-icons/fa'
import { MdOutlineLoop } from 'react-icons/md'
import { PiNumberSquareOneLight } from 'react-icons/pi'

const Calculator = () => {
  const methods = useForm({
    defaultValues: {
      censusSize: 100,
      duration: 1,
      numberElections: 1,
      anonymous: false,
      encrypted: false,
    },
  })

  return (
    <Flex
      className='calculator'
      width={'80%'}
      mx='auto'
      flexDirection={{ base: 'column', lg: 'row' }}
      overflow='hidden'
    >
      <FormProvider {...methods}>
        <Flex as='form' flex='1 1 50%' flexDirection='column' px={14} py={5} bgColor='calculator.left_side'>
          <LeftSideCalculator />
        </Flex>
      </FormProvider>

      <Flex flexDirection='column' flex='1 1 50%' bgColor='calculator.right_side' color='calculator.right_side_color'>
        <RightSideCalculator />
      </Flex>
    </Flex>
  )
}
const LeftSideCalculator = () => {
  const { t } = useTranslation()

  const { control } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  return (
    <>
      <Text className='process-create-title' textTransform='uppercase' textAlign='center' mb={5}>
        Estimate your election cost
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
              variant='process-create-label'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormLabel m={0} whiteSpace='nowrap'>
                Census Size (voters)
              </FormLabel>
              <Flex gap={8}>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={100}
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
              variant='process-create-label'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormLabel m={0} whiteSpace='nowrap'>
                Duration (days)
              </FormLabel>
              <Flex gap={8}>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={100}
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
              variant='process-create-label'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              mb={8}
            >
              <FormLabel m={0} whiteSpace='nowrap'>
                Nº of elections
              </FormLabel>
              <Flex gap={8}>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={100}
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
        <Flex justifyContent='center' gap={44}>
          <Controller
            name={'anonymous'}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }} mb={8}>
                <Checkbox
                  isChecked={value}
                  id='anonymous'
                  onChange={(e) => onChange(e.target.checked as boolean)}
                ></Checkbox>
                <FormLabel
                  variant='process-create-label'
                  htmlFor='anonymous'
                  fontSize='16px'
                  lineHeight='20px'
                  whiteSpace='nowrap'
                  m={0}
                >
                  Anonymous
                </FormLabel>
              </Flex>
            )}
          />
          <Controller
            name={'encrypted'}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Flex alignItems='center' gap={2} flexDirection={{ base: 'column', md: 'row' }} mb={8}>
                <Checkbox
                  isChecked={value}
                  id='encrypted'
                  onChange={(e) => onChange(e.target.checked as boolean)}
                ></Checkbox>
                <FormLabel
                  variant='process-create-label'
                  htmlFor='encrypted'
                  fontSize='16px'
                  lineHeight='20px'
                  whiteSpace='nowrap'
                  m={0}
                >
                  Encrypted
                </FormLabel>
              </Flex>
            )}
          />
        </Flex>
      </Flex>
      <Flex mt='auto' justifyContent='center'>
        <Button>Calculate cost</Button>
      </Flex>
    </>
  )
}
const RightSideCalculator = () => {
  return (
    <Tabs flexGrow={1} variant='soft-rounded' colorScheme='whiteAlpha' display='flex' flexDirection='column'>
      <TabList justifyContent='center' gap={5} py={5}>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <PiNumberSquareOneLight />
          One-time
        </Tab>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <AiOutlinePercentage />
          Packages
        </Tab>
        <Tab display='flex' alignItems='center' gap={1} border='1px solid white' color='white' py={1}>
          <MdOutlineLoop />
          Recurring
        </Tab>
      </TabList>
      <TabPanels flexGrow={1} display='flex' flexDirection='column'>
        <TabPanel flexGrow={1} display='flex' flexDirection='column'>
          <Box px={14}>
            <Flex justifyContent='space-between' mb={3}>
              <Text>Voting process cost:</Text>
              <Text fontWeight='bold'>70 tokens</Text>
            </Flex>
            <Flex justifyContent='space-between' mb={8}>
              <Text>Price per Token:</Text>
              <Text fontWeight='bold'>0.15 €</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Flex flexDirection='column'>
                <Text>Total Cost:</Text>
                <Text>(without VAT)</Text>
              </Flex>
              <Text fontWeight='bold'>10.5 €</Text>
            </Flex>
          </Box>
          <Box mt='auto'>
            <Flex justifyContent='center' gap={5} mt={8} mb={5}>
              <Button variant='buy'>
                <FaCcStripe />
                Buy with Card
              </Button>
              <Button variant='buy'>
                <FaEthereum />
                Buy with Crypto
              </Button>
            </Flex>
            <Text fontSize='14px' textAlign='center'>
              If you have any question, check our FAQ or contact our support team
            </Text>
          </Box>
        </TabPanel>

        <TabPanel flexGrow={1} display='flex' flexDirection='column' px={14}>
          <Flex mb={3}>
            <Text flex='1 1 33%' textAlign='start'>
              PACKAGE
            </Text>
            <Text flex='1 1 30%' textAlign='center'>
              DISCOUNT
            </Text>
            <Text flex='1 1 30%' textAlign='end'>
              TOTAL
            </Text>
          </Flex>
          <RadioGroup>
            <Stack>
              <Flex gap={2}>
                <Radio value='1' colorScheme='primary'></Radio>
                <Flex grow={1}>
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
                <Radio value='2' colorScheme='primary'></Radio>
                <Flex grow={1}>
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
                <Radio value='3' colorScheme='primary'></Radio>
                <Flex grow={1}>
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
                <Radio value='4' colorScheme='primary'></Radio>
                <Flex grow={1}>
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
                <Radio value='5' colorScheme='primary'></Radio>
                <Flex grow={1}>
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
            <Flex justifyContent='center' gap={5} mt={8} mb={5}>
              <Button variant='buy'>
                <FaCcStripe />
                Buy with Card
              </Button>
              <Button variant='buy'>
                <FaEthereum />
                Buy with Crypto
              </Button>
            </Flex>
            <Text fontSize='14px' textAlign='center'>
              Do you need more tokens than the listed? Contact our support team
            </Text>
          </Box>
        </TabPanel>

        <TabPanel flexGrow={1} display='flex' flexDirection='column'>
          <Flex grow={1} flexDirection='column' justifyContent='space-between' gap={3} px={14}>
            <Text>Do you need a recurring amount of tokens or do you plan to create multiple elections?</Text>
            <Text>Do you need secure digital voting for your software?</Text>
            <Text>We offer atractive integrations and services agreement options for this kind of needs</Text>
            <Text>
              Don't hesitate and contact us and our expert team will assist you and tailor a specific plan for you!
            </Text>
          </Flex>

          <Box mt='auto'>
            <Flex justifyContent='center' mt={8} mb={5}>
              <Button variant='secondary'>Contact Us</Button>
            </Flex>
            <Text fontSize='14px' textAlign='center'>
              If you have any question, check our FAQ or contact our support team
            </Text>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Calculator
