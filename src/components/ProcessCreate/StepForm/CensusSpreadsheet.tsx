import { Box, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusCsvManager } from '../Census/Spreadsheet'
import { SpreadsheetManager } from '../Census/Spreadsheet/spreadsheet-manager'
import { useProcessCreationSteps } from '../Steps/use-steps'
import { Web3Address } from './CensusWeb3'

export interface CensusSpreadsheetValues {
  addresses: Web3Address[]
  spreadsheet?: SpreadsheetManager
}

export const StepFormCensusSpreadsheet = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusSpreadsheetValues>({
    defaultValues: {
      spreadsheet: form.spreadsheet,
      weightedVote: form.weightedVote
    },
  })

  const onSubmit: SubmitHandler<CensusSpreadsheetValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <>
      <Box mb={5}>
        <Text fontWeight='bold' fontSize='xl2' textAlign='center' mb={3}>
          {t('form.process_create.census.spreadsheet_title')}
        </Text>
      </Box>

      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusCsvManager />
        </Box>
      </FormProvider>
    </>
  )
}
