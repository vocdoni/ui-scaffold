import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Link,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { Census3TokenSummary, EnvOptions, ICensus3SupportedChain, Token, VocdoniCensus3Client } from '@vocdoni/sdk'
import { ChakraStylesConfig, GroupBase, Select, SelectInstance, chakraComponents } from 'chakra-react-select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'

export const CensusTokens = () => {
  const { env } = useClient()
  const [token, setToken] = useState<Token | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingTk, setLoadingTk] = useState<boolean>(false)
  const selectTokenRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const selectChainRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const [chains, setChains] = useState<ICensus3SupportedChain[]>([])
  const [tokens, setTokens] = useState<Census3TokenSummary[]>([])
  const [totalTks, setTotalTks] = useState(0)

  const { t } = useTranslation()
  const {
    setValue,
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )
  const chain = register('chain', {
    required: {
      value: true,
      message: 'You need to select a network',
    },
  })

  const ch: ICensus3SupportedChain | undefined = watch('chain')

  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ct: Token | undefined = watch('censusToken')

  useEffect(() => {
    // fetch tokens and chains
    ;(async () => {
      setLoading(true)
      try {
        const tks = await client.getSupportedTokens()
        setTokens(tks)
        const chs = await client.getSupportedChains()
        setChains(chs)
      } catch (err) {
        setError(errorToString(err))
      }
      setLoading(false)
    })()
  }, [])

  const processedTokens = useMemo(() => {
    if (!ch) return []

    setToken(undefined)

    let filteredByChainTokens = Array.from(tokens).filter((token) => token.chainID === ch.chainID)

    const uniqueTypes = [...new Set(tokens.map((tk) => tk.type))].sort()

    const orderedTokensByGroup: {
      label: string
      options: Token[] | { name: string; status: { synced: boolean } }[]
    }[] = uniqueTypes.map((type) => {
      const tokensWithType = filteredByChainTokens.filter((tk) => tk.type === type)
      return { label: type.toUpperCase(), options: tokensWithType }
    })

    orderedTokensByGroup.push({
      label: 'request',
      options: [{ name: 'Request Custom Tokens', status: { synced: true } }],
    })

    const totalTks = orderedTokensByGroup.reduce((acc, curr) => {
      if (curr.label !== 'request') {
        return acc + curr.options.length
      }
      return acc
    }, 0)

    setTotalTks(totalTks)

    return orderedTokensByGroup
  }, [ch])

  const filteredTks = processedTokens

  useEffect(() => {
    // get token
    if (!ct) return
    ;(async () => {
      if (!ct?.ID) return
      setLoadingTk(true)
      try {
        const token = await client.getToken(ct.ID, ct.chainID, ct.externalID)
        setToken(token)
      } catch (err) {
        setError(errorToString(err))
      } finally {
        setLoadingTk(false)
      }
    })()
  }, [ct])

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  return (
    <Stack w='full' direction='column' gap={3} alignItems='center'>
      <Flex
        w='full'
        flexDirection={{ base: 'column', lg2: 'row' }}
        justifyContent='space-between'
        gap={{ base: 8, lg2: 0 }}
      >
        <FormControl
          isInvalid={!!errors.chain}
          w='full'
          maxW={{ base: '100%', lg2: '38%' }}
          display='flex'
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          <FormLabel fontWeight='bold'>{t('form.process_create.census.network')}</FormLabel>
          <Select
            ref={selectChainRef}
            placeholder={t('form.process_create.census.network_placeholder')}
            aria-label={t('form.process_create.census.network_placeholder')}
            options={Array.isArray(chains) ? chains : [chains]}
            defaultValue={ch}
            getOptionValue={(value) => value}
            getOptionLabel={({ name }) => `${name}`}
            onChange={async (network) => {
              setValue('censusToken', undefined)
              setValue('chain', network)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            name={chain.name}
            onBlur={chain.onBlur}
            isLoading={loading}
            isDisabled={loading || loadingTk}
            components={customComponentsNetwork}
            chakraStyles={customStylesNetwork}
          />
          <FormErrorMessage>{errors.chain && errors.chain.message?.toString()}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.censusToken}
          w='full'
          maxW={{ base: '100%', lg2: '60%' }}
          display='flex'
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          <FormLabel display='flex' justifyContent='space-between' fontWeight='bold'>
            <Text as='span'>Token</Text>{' '}
            {!!ch && !!totalTks && (
              <Text as='span' fontWeight='normal' ml={10} color='gray'>
                {totalTks === 1 ? '1 token' : `${totalTks} tokens`}
              </Text>
            )}
          </FormLabel>
          <Select
            ref={selectTokenRef}
            key={`my_unique_select_key__${ct}`}
            placeholder={t('form.process_create.census.tokens_placeholder')}
            aria-label={t('form.process_create.census.tokens_placeholder')}
            defaultValue={ct}
            options={filteredTks}
            getOptionValue={({ chainAddress, chainID, externalID }) => chainAddress + chainID + externalID}
            getOptionLabel={({ name }) => name}
            onChange={async (token) => {
              setValue('censusToken', token)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            name={ctoken.name}
            onBlur={ctoken.onBlur}
            isDisabled={!ch || loadingTk}
            isOptionDisabled={(option) => !option.status?.synced}
            components={customComponentsTokens}
            chakraStyles={customStylesTokens}
          />
          <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Flex>

      {loadingTk ? (
        <Spinner mt={10} />
      ) : (
        <>
          <TokenPreview token={token} chainName={ch?.name} />
          <MaxCensusSizeSelector token={token} />
        </>
      )}
    </Stack>
  )
}

export const MaxCensusSizeSelector = ({ token }: { token?: Token }) => {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext()

  const [sliderValue, setSliderValue] = useState<number>(getValues('maxCensusSize'))
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const { t } = useTranslation()

  // set slidervalue the very first time, based on token.size
  useEffect(() => {
    if (sliderValue !== undefined || !token) return

    const val = Number((token as any).size) / 2
    setSliderValue(val)
    setValue('maxCensusSize', Math.round(val))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, sliderValue])

  if (sliderValue === undefined || !token) return null

  const max = Number((token as any).size)
  const uniTokenHolders = watch('maxCensusSize')

  const percent = Math.round((sliderValue / max) * 100)

  return (
    <>
      <FormControl isInvalid={!!errors.maxCensusSize} mb={3}>
        <FormLabel mb={3}>{t('form.process_create.census.max_census_slider_label')}</FormLabel>
        <Slider
          aria-label={t('form.process_create.census.max_census_slider_arialabel')}
          defaultValue={sliderValue}
          min={0}
          max={max}
          onChange={(v) => {
            setSliderValue(v)
            setValue('maxCensusSize', v)
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={max * 0.25} mt='1' ml='-2.5' fontSize='sm'>
            25%
          </SliderMark>
          <SliderMark value={max * 0.5} mt='1' ml='-2.5' fontSize='sm'>
            50%
          </SliderMark>
          <SliderMark value={max * 0.75} mt='1' ml='-2.5' fontSize='sm'>
            75%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg='primary.500' />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='primary.500'
            color='white'
            placement='top'
            isOpen={showTooltip}
            label={t('form.process_create.census.max_census_slider_tooltip', {
              percent,
              voters: Math.round(sliderValue),
            })}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <FormErrorMessage>{errors.maxCensusSize && errors.maxCensusSize.message?.toString()}</FormErrorMessage>
      </FormControl>
      <Text>
        <Trans
          i18nKey={'form.process_create.census.max_census_resum'}
          values={{
            uniTokenHolders: formatNumber(uniTokenHolders),
            percent,
          }}
        />
      </Text>
    </>
  )
}

export const TokenPreview = ({ token, chainName }: { token?: Token; chainName?: string }) => {
  if (!token) return null
  return (
    <Card my={5} w='full'>
      <CardHeader>
        <Grid
          gridTemplateColumns={{
            base: 'min-content 1fr',
            sm2: 'min-content min-content 1fr',
            xl: 'min-content 1fr min-content min-content min-content',
          }}
          gridTemplateRows={{ base: 'repeat(4, min-content)', sm2: 'repeat(3, min-content)', xl: '1fr' }}
          columnGap={{ base: 2, sm2: 3 }}
        >
          <Flex
            gridRowStart={1}
            gridRowEnd={{ base: 3, sm2: 2 }}
            gridColumnStart={1}
            gridColumnEnd={2}
            justifyContent='center'
            alignItems='center'
          >
            <Avatar
              name={token.name}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.ID}/logo.png`}
            />
          </Flex>
          <Flex
            gridRowStart={1}
            gridRowEnd={2}
            gridColumnStart={{ base: 2, xl: 5 }}
            gridColumnEnd={{ base: 3, xl: 6 }}
            justifyContent={{ base: 'center', sm2: 'start' }}
            whiteSpace='nowrap'
          >
            <Badge
              variant='outline'
              colorScheme='gray'
              py={1}
              px={3}
              maxW='min-content'
              borderRadius='lg'
              alignSelf='center'
            >
              {chainName}
            </Badge>
          </Flex>
          <Flex
            gridRowStart={{ base: 2, sm2: 1 }}
            gridRowEnd={{ base: 3, sm2: 2 }}
            gridColumnStart={{ base: 2, sm2: 3, xl: 6 }}
            gridColumnEnd={{ base: 3, sm2: 4, xl: 7 }}
            justifyContent={{ base: 'center', sm2: 'start' }}
          >
            <Text color='gray' alignSelf='center'>
              <Trans
                i18nKey={'form.process_create.census.holders'}
                values={{
                  holders: formatNumber((token as any).size),
                }}
              />
            </Text>
          </Flex>

          <Flex
            gridColumnStart={{ base: 1, xl: 2 }}
            gridColumnEnd={{ base: 3, sm2: 4, xl: 3 }}
            gridRowStart={{ base: 3, xl: 1 }}
            gridRowEnd={{ base: 4, xl: 2 }}
            justifyContent='start'
            alignItems={{ base: 'start', xl: 'center' }}
            flexDirection={{ base: 'column', xl: 'row' }}
            gap={2}
            mt={{ base: 3, xl: 0 }}
          >
            <Heading size='sm'>{token.name}</Heading>
            <Text>({token.symbol})</Text>
          </Flex>
        </Grid>
      </CardHeader>
    </Card>
  )
}

const customComponentsTokens = {
  GroupHeading: (props: any) => {
    const poap = /poap/i
    const nft = /nft/i

    if (props.data.label === 'request') return

    return (
      <chakraComponents.GroupHeading {...props}>
        <Flex alignItems='center' gap={2}>
          {poap.test(props.data.label) && <FaPeopleGroup />}
          {nft.test(props.data.label) && <BsImage />}
          {!poap.test(props.data.label) && !nft.test(props.data.label) && <FaEthereum />}

          {props.children}
        </Flex>
      </chakraComponents.GroupHeading>
    )
  },
  Option: (props: any) => {
    if (props.data.name === 'Request Custom Tokens') {
      return (
        <chakraComponents.Option {...props}>
          <Flex justifyContent='center' w='full'>
            <Link variant='primary' href='https://tally.so/r/mO46VY' target='_blank' fontWeight='bold'>
              <Text as='span' fontSize='xl'>
                +
              </Text>{' '}
              {props.children}
            </Link>
          </Flex>
        </chakraComponents.Option>
      )
    } else {
      return (
        <chakraComponents.Option {...props}>
          <Flex alignItems='center' gap={2}>
            <Avatar
              size='xs'
              name={props.data.name}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.data.ID}/logo.png`}
            />
            <Text>{props.children}</Text>
          </Flex>
        </chakraComponents.Option>
      )
    }
  },

  DropdownIndicator: (props: any) => {
    return (
      <>
        <chakraComponents.DropdownIndicator {...props}>
          <SearchIcon fontSize='sm' />
        </chakraComponents.DropdownIndicator>
        <chakraComponents.DropdownIndicator {...props}>
          <ChevronDownIcon />
        </chakraComponents.DropdownIndicator>
      </>
    )
  },
}

const customComponentsNetwork = {
  Option: (props: any) => {
    return (
      <chakraComponents.Option {...props}>
        <Flex alignItems='center' gap={2}>
          <FaEthereum />
          <Text>{props.children}</Text>
        </Flex>
      </chakraComponents.Option>
    )
  },
}
const customStyles: ChakraStylesConfig = {
  control: (base, state) => ({
    ...base,
    boxShadow: 'var(--box-shadow)',
    // bgColor: 'red',
    // match with the menu

    fontWeight: 'bold',
    // Overwrittes the different states of border
    // borderColor: state.isFocused && 'yellow',
    // Removes weird border around container
    // boxShadow: state.isFocused ? null : null,
    // borderColor: state.isActive && 'red',
    // '&:hover': {
    //   // Overwrittes the different states of border
    //   borderColor: state.isFocused ? 'purple' : 'orange',
    // },
    // fontWeight: 'bold',
  }),
  placeholder: (base) => ({
    ...base,
    fontWeight: 'normal',
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    zIndex: 10,
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'md',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: 'lg',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    bgColor: 'transparent',
  }),
}
const customStylesNetwork: ChakraStylesConfig = {
  ...customStyles,
}

const customStylesTokens: ChakraStylesConfig = {
  ...customStyles,
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
    pl: 10,
  }),
}

const formatNumber = (numero: number) => {
  if (numero < 1000) {
    return numero.toString()
  } else if (numero < 1000000) {
    const numEnK = Math.floor(numero / 1000)
    return numEnK.toFixed(0) + 'K'
  } else {
    const numEnM = Math.floor(numero / 1000000)
    return numEnM.toFixed(0) + 'M'
  }
}
