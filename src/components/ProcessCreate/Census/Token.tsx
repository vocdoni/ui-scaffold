import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
} from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/chakra-components'
import { EnvOptions, ICensus3Token, VocdoniCensus3Client } from '@vocdoni/sdk'
import { AsyncSelect, GroupBase, SelectInstance } from 'chakra-react-select'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CensusTokens = () => {
  const { env } = useClient()
  const [token, setToken] = useState<ICensus3Token | undefined>()
  const [error, setError] = useState<string | undefined>()
  const selectRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const { t } = useTranslation()
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )
  const getToken = useCallback(
    async (token: string) => {
      try {
        const t = await client.getToken(token)
        setToken(t)
        return t
      } catch (e: any) {
        setError(errorToString(e))
      }
    },
    [client]
  )

  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ct: string | undefined = watch('censusToken')

  useEffect(() => {
    if (!ct || token) return
    ;(async () => {
      const t = await getToken(ct)
      selectRef.current?.setValue(t, 'select-option')
    })()
  }, [ct, getToken, token])

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  return (
    <Flex justifyContent='center'>
      <Flex maxW='50%' w='full' direction='column'>
        <FormControl isInvalid={!!errors.censusToken}>
          <AsyncSelect
            ref={selectRef}
            placeholder={t('form.process_create.census.tokens_placeholder')}
            cacheOptions
            defaultOptions
            defaultValue={ct}
            loadOptions={(input: string) => client.getSupportedTokens() as Promise<ICensus3Token[]>}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ name, symbol }) => `${name} (${symbol})`}
            onChange={async (token) => setValue('censusToken', token?.id)}
            name={ctoken.name}
            onBlur={ctoken.onBlur}
            chakraStyles={{ container: (p, state) => ({ ...p, w: 'full' }) }}
          />
          <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
        </FormControl>
        <TokenPreview token={token} />
      </Flex>
    </Flex>
  )
}

export const TokenPreview = ({ token }: { token?: ICensus3Token }) => {
  if (!token) return null

  return (
    <Card mt={3} w='full'>
      <CardHeader>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar
              name={token.name}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.id}/logo.png`}
            />

            <Box>
              <Heading size='sm'>{token.name}</Heading>
              <Text>{token.symbol}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  )
}
