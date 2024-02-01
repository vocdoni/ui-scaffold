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
  return import('./CensusCsp').then((module) => ({ default: module.StepFormCensusCsp }))
})

export const CspCensusGithub = () => (
  <SuspenseLoader>{import.meta.env.features._census.csp_github && <Csp provider='github' />}</SuspenseLoader>
)

export const CspCensusGoogle = () => (
  <SuspenseLoader>{import.meta.env.features._census.csp_google && <Csp provider='google' />}</SuspenseLoader>
)
