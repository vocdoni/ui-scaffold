import { Box, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusSpreadsheetManager } from '../Census/Spreadsheet/CensusSpreadsheetManager'
import { CensusCsvManager } from '../Census/Spreadsheet/indexOnVote'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface CensusSpreadsheetValues {
  weightedVote: boolean
  spreadsheet?: CensusSpreadsheetManager
}

export const StepFormCensusSpreadsheet = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusSpreadsheetValues>({
    defaultValues: {
      spreadsheet: form.spreadsheet,
      weightedVote: form.weightedVote,
    },
  })

  const onSubmit: SubmitHandler<CensusSpreadsheetValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <>
      <Box px={7} py={4}>
        <Text fontWeight='bold' color='process_create.census.title' mb={5}>
          {t('census.spreadsheet_title')}
        </Text>
        <FormProvider {...methods}>
          <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
            <CensusCsvManager />
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
