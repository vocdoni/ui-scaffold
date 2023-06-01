import { Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useProcessCreationSteps } from '.'
import CreateProcessQuestions from '../Questions'
import { StepsNavigation } from './Navigation'

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
      <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateProcessQuestions />
        <StepsNavigation />
      </Box>
    </FormProvider>
  )
}
