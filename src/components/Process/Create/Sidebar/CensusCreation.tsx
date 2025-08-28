import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { chakraComponents } from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { CensusCsvManager } from '~components/Process/Census/Spreadsheet'
import { CensusWeb3Addresses } from '~components/Process/Census/Web3'
import { Select } from '~components/shared/Form/Select'
import { useGroups } from '~src/queries/groups'
import { Routes } from '~src/router/routes'
import { GroupCensusCreation } from './GroupCensusCreation'

export enum CensusTypes {
  CSP = 'csp',
  Spreadsheet = 'spreadsheet',
  Web3 = 'web3',
}

export const censusTabs = [CensusTypes.CSP, CensusTypes.Spreadsheet, CensusTypes.Web3] as const

export const GroupSelect = () => {
  const { t } = useTranslation()
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext()
  const censusType = watch('censusType')
  const [hasFetchedScroll, setHasFetchedScroll] = useState(false)
  const { data, fetchNextPage, hasNextPage, isFetching } = useGroups(6)

  const CustomMenuList = (props) => {
    return (
      <chakraComponents.MenuList {...props}>
        {props.children}
        {hasNextPage && (
          <Box py={2} textAlign='center'>
            {isFetching ? <Spinner size='sm' /> : t('process_create.groups.scroll_to_load', 'Scroll to load more...')}
          </Box>
        )}
      </chakraComponents.MenuList>
    )
  }

  // Reset hasFetchedScroll when fetching starts
  useEffect(() => {
    if (!isFetching) setHasFetchedScroll(false)
  }, [isFetching])

  return (
    <FormControl isInvalid={!!errors.groupId}>
      <FormLabel>
        <Trans i18nKey='process_create.census.memberbase.label'>Select a group of members to create the census</Trans>
        {(!data || data.length === 0) && (
          <>
            . If you don't have any yet, create one first{' '}
            <Link
              as={ReactRouterLink}
              to={Routes.dashboard.memberbase.base}
              color='blue.500'
              _hover={{ textDecoration: 'underline' }}
            >
              here
            </Link>
            .
          </>
        )}
      </FormLabel>
      <Controller
        control={control}
        name='groupId'
        rules={{
          required: {
            value: censusType === CensusTypes.CSP,
            message: t('form.error.required', 'This field is required'),
          },
        }}
        render={({ field }) => {
          const selected = data?.find((g) => g.id === field.value) ?? null
          return (
            <Select
              options={data ?? []}
              value={selected}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option.id}
              placeholder={t('process_create.group.select', 'Select group')}
              isLoading={isFetching}
              onChange={(option) => field.onChange(option?.id ?? '')}
              onMenuScrollToBottom={async () => {
                if (hasNextPage && !hasFetchedScroll) {
                  setHasFetchedScroll(true)
                  await fetchNextPage()
                }
              }}
              closeMenuOnSelect
              maxMenuHeight={200}
              components={{ MenuList: CustomMenuList }}
            />
          )
        }}
      />
      <FormErrorMessage>{errors.groupId?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

const CensusCreation = ({ showExtraMethods }: { showExtraMethods: boolean }) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext()
  const censusType = watch('censusType')

  const currentIndex = censusTabs.indexOf(censusType)

  // Set default census type to Memberbase (Group) if not set
  useEffect(() => {
    if (!censusType) {
      setValue('censusType', CensusTypes.CSP)
    }
  }, [censusType, setValue])

  const handleTabChange = (index: number) => {
    const nextType = censusTabs[index]
    const prevType = watch('censusType')

    if (nextType === prevType) return

    switch (prevType) {
      case CensusTypes.CSP:
        setValue('groupId', '')
        break
      case CensusTypes.Web3:
        setValue('addresses', [])
        break
      case CensusTypes.Spreadsheet:
        setValue('spreadsheet', undefined)
        break
    }

    setValue('censusType', nextType)
  }

  // If extra methods are not enabled, show only the Group selection
  if (!showExtraMethods) {
    return <GroupCensusCreation />
  }

  // If extra methods are enabled, show the full tab system
  return (
    <Tabs index={currentIndex} onChange={handleTabChange} isFitted>
      <TabList w='full'>
        <Tab>{t('process_create.census.group.label', { defaultValue: 'Group' })}</Tab>
        <Tab>{t('process_create.census.spreadsheet.label', { defaultValue: 'Spreadsheet' })}</Tab>
        <Tab>{t('process_create.census.web3.label', { defaultValue: 'Web3' })}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0}>
          <GroupCensusCreation />
        </TabPanel>
        <TabPanel px={0} display='flex' flexDirection='column' gap={4}>
          <CensusCsvManager />
        </TabPanel>
        <TabPanel px={0} display='flex' flexDirection='column' gap={4}>
          <CensusWeb3Addresses />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CensusCreation
