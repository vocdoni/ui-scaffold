import { lazy } from 'react'
import { SuspenseLoader } from '~src/router/SuspenseLoader'

const Spreadsheet = lazy(() => {
  if (import.meta.env.features._census.spreadsheet) {
    return import('./CensusSpreadsheet').then((module) => ({ default: module.StepFormCensusSpreadsheet }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const SpreadsheetCensus = () => (
  <SuspenseLoader>
    <Spreadsheet />
  </SuspenseLoader>
)

const Web3 = lazy(() => {
  if (import.meta.env.features._census.web3) {
    return import('./CensusWeb3').then((module) => ({ default: module.StepFormCensusWeb3 }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const Web3Census = () => (
  <SuspenseLoader>
    <Web3 />
  </SuspenseLoader>
)

const Token = lazy(() => {
  if (import.meta.env.features._census.token) {
    return import('./CensusToken').then((module) => ({ default: module.StepFormCensusToken }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const TokenCensus = () => (
  <SuspenseLoader>
    <Token />
  </SuspenseLoader>
)

const Csp = lazy(() => {
  if (import.meta.env.features._census.csp) {
    return import('./CensusCsp').then((module) => ({ default: module.StepFormCensusCsp }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const CspCensus = () => (
  <SuspenseLoader>
    <Csp />
  </SuspenseLoader>
)

const Gitcoin = lazy(() => {
  if (import.meta.env.features._census.gitcoin) {
    return import('./CensusGitcoin').then((module) => ({ default: module.StepFormCensusGitcoin }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const GitcoinCensus = () => (
  <SuspenseLoader>
    <Gitcoin />
  </SuspenseLoader>
)

const Multichain = lazy(() => {
  if (import.meta.env.features._census.multichain) {
    return import('./CensusMultichain').then((module) => ({ default: module.StepFormCensusMultichain }))
  }

  return Promise.resolve({ default: () => <></> })
})

export const MultichainCensus = () => (
  <SuspenseLoader>
    <Multichain />
  </SuspenseLoader>
)
