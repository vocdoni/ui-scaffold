import {
  Alert,
  AlertIcon,
  Badge,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { Census3Token, EnvOptions, ICensus3SupportedChain, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { ChakraStylesConfig, GroupBase, Select, SelectComponentsConfig, SelectInstance } from 'chakra-react-select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { DefaultCensusSize } from '~constants'
import { reactSelectStyles } from '~theme/reactSelectStyles'
import { useProcessCreationSteps } from '../Steps/use-steps'
import selectComponents, { CryptoAvatar } from './select-components'
import gitcoinPassportImg from '/assets/gitcoin-passport.png'

export interface FilterOptionOption<Option> {
  readonly label: string
  readonly value: string
  readonly data: Option
}

type GrupedTokenTypes = {
  label: string
  options: TokenSummary[] | { name: string; synced: boolean; type: string }[]
}[]

export const CensusTokens = () => {
  const { t } = useTranslation()
  const { env } = useClient()
  const { form } = useProcessCreationSteps()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingTk, setLoadingTk] = useState<boolean>(false)
  const selectTokenRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const selectChainRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const [chains, setChains] = useState<ICensus3SupportedChain[]>([])
  const [groupedTokens, setGroupedTokens] = useState<GrupedTokenTypes>([])
  const {
    setValue,
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const { tokens: selectComponentsTokens, networks: selectComponentsNetworks } = selectComponents

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
      message: t('census.chain_required'),
    },
  })

  const ch: ICensus3SupportedChain | undefined = watch('chain')

  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: t('census.token_required'),
    },
  })
  const ct: Census3Token = watch('censusToken')
  const strategySize: number = watch('strategySize')

  const formatGroupLabel = (data: GroupBase<any>) => {
    switch (data.label?.toLowerCase()) {
      case 'erc20':
        return 'Tokens'
      case 'erc721':
        return 'NFTs'
      case 'poap':
        return 'POAPs'
      case 'aragon':
        return 'Aragon DAO'
      default:
        return data.label
    }
  }

  const filterOptions = (candidate: FilterOptionOption<any>, input: string) => {
    const regex = new RegExp(input, 'ig')
    const { data } = candidate

    if (ch) {
      return (
        (data.chainID === ch.chainID && (data.name.match(regex) || data.symbol.match(regex) || data.ID.match(regex))) ||
        data.type === 'request'
      )
    }
    return true
  }

  useEffect(() => {
    // fetch tokens and chains
    ;(async () => {
      setLoading(true)
      setError(undefined)
      try {
        const chs = await client.getSupportedChains()

        // Sort chains with the order: eth, gor, matic, maticmum, and the rest in alphabetical order
        const order: {
          [key: string]: number
          eth: number
          gor: number
          matic: number
          maticmum: number
        } = {
          eth: 1,
          gor: 2,
          matic: 3,
          maticmum: 4,
        }
        const filteredTag = 'aragon'
        const filteredType = 'gitcoinpassport'

        const defaultOrder: number = 10000

        chs.sort((a, b) => {
          const orderA = order[a.shortName as keyof typeof order] || defaultOrder
          const orderB = order[b.shortName as keyof typeof order] || defaultOrder

          if (orderA !== orderB) {
            return orderA - orderB
          }

          return a.shortName.localeCompare(b.shortName)
        })
        setChains(chs)

        const tks = (await client.getSupportedTokens()).filter((tk) => tk.type !== filteredType)

        const tags = [
          ...new Set(
            tks
              .filter((tk) => tk.tags.length > 0 && tk.type !== filteredType)
              .map((tk) => tk.tags)
              .flat()
          ),
        ]
        const uniqueTypes = [...new Set(tks.map((tk) => tk.type))].sort()

        const groupedTokens: GrupedTokenTypes = uniqueTypes.map((type) => {
          const tokensWithType = tks.filter(
            (tk) => tk.type === type && (!tk.tags.length || (tk.tags.length > 0 && !tk.tags.includes(filteredTag)))
          )
          return { label: type.toUpperCase(), options: tokensWithType }
        })
        if (tags.length) {
          tags.forEach((tag) => {
            if (tag !== filteredTag) return
            groupedTokens.push({
              label: tag.toUpperCase(),
              options: tks.filter((tk) => tk.tags.includes(tag)),
            })
          })
        }

        // sort all grouped tokens ascending
        groupedTokens.forEach((group, key) => {
          groupedTokens[key].options = group.options.sort((a, b) => a.name.localeCompare(b.name))
        })

        groupedTokens.push({
          label: 'request',
          options: [{ name: t('census.request_custom_token'), synced: true, type: 'request' }],
        })

        setGroupedTokens(groupedTokens)
      } catch (err) {
        setError(errorToString(err))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // get token
    if (!ct) return
    ;(async () => {
      if (!ct?.ID) return
      setLoadingTk(true)
      setError(undefined)

      try {
        const { size, timeToCreateCensus, accuracy } = await client.getStrategyEstimation(
          ct.defaultStrategy,
          form.electionType.anonymous
        )

        setValue('accuracy', accuracy)
        setValue('strategySize', size)
        setValue('timeToCreateCensus', timeToCreateCensus)
        const initialValue = size < DefaultCensusSize ? size : DefaultCensusSize
        setValue('maxCensusSize', initialValue)
      } catch (err) {
        setError(errorToString(err))
        setValue('strategySize', undefined)
        setValue('censusToken', undefined)
      } finally {
        setLoadingTk(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ct])

  const totalTks = useMemo(() => {
    const options = groupedTokens.map((token) => token.options).flat()
    const totalOptions = options.filter((op) => {
      if ('chainID' in op && op.chainID === ch?.chainID) {
        return true
      }
      return false
    }).length
    return totalOptions
  }, [groupedTokens, ch])

  return (
    <Stack w='full' direction='column' gap={3} alignItems='center'>
      <Flex
        w='full'
        flexDirection={{ base: 'column', lg2: 'row' }}
        justifyContent='space-between'
        alignItems='start'
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
            defaultValue={ch}
            name={chain.name}
            onBlur={chain.onBlur}
            options={Array.isArray(chains) ? chains : [chains]}
            getOptionValue={(value: ICensus3SupportedChain) => String(value.chainID)}
            getOptionLabel={({ name }: ICensus3SupportedChain) => `${name}`}
            onChange={(network) => {
              setValue('censusToken', undefined)
              setValue('chain', network || undefined)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            isClearable
            isLoading={loading}
            isDisabled={loading || loadingTk}
            components={
              selectComponentsNetworks as Partial<
                SelectComponentsConfig<ICensus3SupportedChain, boolean, GroupBase<ICensus3SupportedChain>>
              >
            }
            chakraStyles={
              reactSelectStyles as ChakraStylesConfig<
                ICensus3SupportedChain,
                boolean,
                GroupBase<ICensus3SupportedChain>
              >
            }
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
                {t('process_create.census.total_tokens', {
                  count: totalTks,
                })}
              </Text>
            )}
          </FormLabel>
          <Select
            ref={selectTokenRef}
            placeholder={t('form.process_create.census.tokens_placeholder')}
            aria-label={t('form.process_create.census.tokens_placeholder')}
            defaultValue={ct}
            value={ct} // By setting the value will prevent to show request tokens as selected value
            name={ctoken.name}
            onBlur={ctoken.onBlur}
            formatGroupLabel={formatGroupLabel}
            options={groupedTokens}
            filterOption={filterOptions}
            getOptionValue={({ chainAddress, chainID, externalID }: TokenSummary) =>
              chainAddress + chainID + externalID
            }
            getOptionLabel={(props: TokenSummary) => {
              if (props.symbol) return `${props.name}  (${props.symbol})`
              else return `${props.name}`
            }}
            onChange={(token) => {
              if (token === null || token.type === 'request') setValue('censusToken', null)
              else setValue('censusToken', token)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            isClearable
            isSearchable
            isDisabled={!ch || loadingTk}
            isOptionDisabled={(option) => !(option as { synced?: boolean })?.synced}
            components={selectComponentsTokens as Partial<SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>>}
            chakraStyles={reactSelectStyles}
          />
          <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Flex>

      {loadingTk ? (
        <Spinner mt={10} />
      ) : (
        !error && (
          <>
            <TokenPreview token={ct} chainName={ch?.name} strategySize={strategySize} />
          </>
        )
      )}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Stack>
  )
}

export const TokenPreview = ({
  token,
  chainName,
  strategySize,
  passportScore,
}: {
  token?: Census3Token
  chainName?: string
  strategySize?: number
  passportScore?: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [minCardSize800px, setMinCardSize800px] = useState(false)

  useEffect(() => {
    const getCardWidth = () => {
      if (cardRef.current) {
        const { width } = cardRef.current.getBoundingClientRect()
        setMinCardSize800px(width >= 800)
      }
    }

    getCardWidth()

    window.addEventListener('resize', getCardWidth)

    return () => {
      window.removeEventListener('resize', getCardWidth)
    }
  }, [])

  if (!token || !strategySize || token.type === 'request') return null

  return (
    <Card ref={cardRef} borderRadius={0} w='full' my={5} boxShadow='var(--box-shadow)'>
      <CardHeader>
        <Grid
          gridTemplateColumns='min-content 1fr min-content min-content'
          gridColumn={{ base: 'min-content min-content', xl: 'min-content' }}
          gap={3}
        >
          <GridItem
            gridColumnStart={1}
            gridColumnEnd={2}
            gridRowStart={1}
            gridRowEnd={{ base: 2, sm2: 3, xl: minCardSize800px ? 2 : 3 }}
            display='flex'
            alignItems='center'
          >
            <CryptoAvatar
              name={token.name}
              icon={token && token.type === 'gitcoinpassport' ? gitcoinPassportImg : token.iconURI}
              id={token.ID}
              chainId={token.chainID}
              size='md'
            />
          </GridItem>
          <GridItem
            gridColumnStart={{ base: 2, xl: minCardSize800px ? 3 : 2 }}
            gridColumnEnd={{ base: 3, xl: minCardSize800px ? 4 : 3 }}
            gridRowStart={1}
            gridRowEnd={2}
            display='flex'
            alignItems='center'
          >
            <Badge
              variant='outline'
              colorScheme='gray'
              py={1}
              px={3}
              maxW='min-content'
              borderRadius='0'
              alignSelf='center'
            >
              {chainName}
            </Badge>
          </GridItem>
          <GridItem
            gridColumnStart={4}
            gridColumnEnd={5}
            gridRowStart={1}
            gridRowEnd={2}
            display='flex'
            alignItems='center'
          >
            <Text
              color='gray'
              alignSelf='center'
              whiteSpace={{ base: 'pre-wrap', sm2: 'nowrap' }}
              overflow='hidden'
              textOverflow='ellipsis'
              textAlign='center'
            >
              <Trans
                i18nKey={'form.process_create.census.holders'}
                values={{
                  holders: formatNumber(strategySize),
                }}
              />
            </Text>
          </GridItem>
          <GridItem
            gridColumnStart={{ base: 1, sm2: 2 }}
            gridColumnEnd={{ base: 6, xl: minCardSize800px ? 3 : 6 }}
            gridRowStart={{ base: 2, xl: minCardSize800px ? 1 : 2 }}
            gridRowEnd={{ base: 3, xl: minCardSize800px ? 2 : 3 }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
          >
            <Heading size='sm' mb={1}>
              {token.name} {token && token.type === 'gitcoinpassport' && `: ${passportScore}`}
            </Heading>

            <Text>({token.symbol})</Text>
          </GridItem>
        </Grid>
      </CardHeader>
    </Card>
  )
}

const formatNumber = (number: number) => {
  if (number < 1000) {
    return number.toString()
  } else if (number < 1000000) {
    const numEnK = Math.floor(number / 1000)
    return numEnK.toFixed(0) + 'K'
  } else {
    const numEnM = Math.floor(number / 1000000)
    return numEnM.toFixed(0) + 'M'
  }
}
