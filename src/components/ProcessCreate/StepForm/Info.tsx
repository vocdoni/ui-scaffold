import { Flex } from '@chakra-ui/react'
import { ElectionResultsTypeNames } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CreateProcessMeta from '../Meta'
import CreateProcessSettings from '../Settings'
import { StepsNavigation } from '../Steps/Navigation'
import Wrapper from '../Steps/Wrapper'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface InfoValues {
  title: string
  description: string
  // dates need to be string to properly reset the values to the inputs
  endDate: string
  startDate: string
}

export interface ConfigurationValues {
  electionType: {
    autoStart: boolean
    interruptible: boolean
    secretUntilTheEnd: boolean
    anonymous: boolean
  }
  resultsType: {
    name: ElectionResultsTypeNames
  }
  maxVoteOverwrites: number
  weightedVote: boolean
}

type FormValues = InfoValues & ConfigurationValues

export const Info = () => {
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<FormValues>({
    defaultValues: form,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <FormProvider {...methods}>
      <Wrapper>
        <Flex
          as='form'
          id='process-create-form'
          onSubmit={methods.handleSubmit(onSubmit)}
          flexDirection='column'
          gap={8}
        >
          <CreateProcessMeta />
          <CreateProcessSettings />
        </Flex>
        <StepsNavigation />
      </Wrapper>
    </FormProvider>
  )
}
