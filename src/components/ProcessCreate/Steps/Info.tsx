import { Box, Button } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CreateProcessHeader from '../Header'
import CreateProcessSettings from '../Settings'

export interface ProcessCreateInfoValues {
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
  const methods = useForm<ProcessCreateInfoValues>({
    defaultValues: {
      electionType: {
        autoStart: false,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      maxVoteOverwrites: 0,
      weightedVote: false,
    },
  })

  const onSubmit: SubmitHandler<ProcessCreateInfoValues> = async (data) => {
    console.log('data:', data)
  }

  return (
    <FormProvider {...methods}>
      <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateProcessHeader />
        <CreateProcessSettings />
        <Box mt={5}>
          <Button type='submit'>Next</Button>
        </Box>
      </Box>
    </FormProvider>
  )
}
