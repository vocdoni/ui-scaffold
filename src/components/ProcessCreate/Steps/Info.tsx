import { Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CreateProcessMeta from '../Meta'
import CreateProcessSettings from '../Settings'
import { StepsNavigation } from './Navigation'
import { useProcessCreationSteps } from './use-steps'

export interface InfoValues {
  title: string
  description: string
  endDate: Date
  startDate: Date
  electionType: {
    autoStart: boolean
    interruptible: boolean
    secretUntilTheEnd: boolean
  }
  maxVoteOverwrites: number
  weightedVote: boolean
}

export const Info = () => {
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<InfoValues>({
    defaultValues: form,
  })

  const onSubmit: SubmitHandler<InfoValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <FormProvider {...methods}>
      <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateProcessMeta />
        <CreateProcessSettings />
        <StepsNavigation />
      </Box>
    </FormProvider>
  )
}
