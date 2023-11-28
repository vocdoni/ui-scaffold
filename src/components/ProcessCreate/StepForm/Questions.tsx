import { Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CreateProcessQuestions from '../Questions/indexOnVote'
import { StepsNavigation } from '../Steps/Navigation'
import { useProcessCreationSteps } from '../Steps/use-steps'
import Wrapper from '../Steps/Wrapper'

export interface Option {
  option: string
}

export interface Question {
  title: string
  description: string
  options: Option[]
}

export interface QuestionsValues {
  questions: Question[]
}

export const Questions = () => {
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<QuestionsValues>({
    defaultValues: {
      questions: form.questions,
    },
  })

  const onSubmit: SubmitHandler<QuestionsValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <FormProvider {...methods}>
      <Wrapper>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CreateProcessQuestions />
        </Box>

        <StepsNavigation />
      </Wrapper>
    </FormProvider>
  )
}
