import { Flex } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FeaturesKeys } from '~components/Pricing/Features'
import { Features as SaasFeaturesComponent } from '~components/ProcessCreate/Settings/SaasFeatures'
import { ConfigurationValues } from '~components/ProcessCreate/StepForm/Info'
import { StepsNavigation } from '~components/ProcessCreate/Steps/Navigation'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { useProcessCreationSteps } from '../Steps/use-steps'

export type SaasFeaturesValues = { saasFeatures: Record<FeaturesKeys, boolean> }
interface FeaturesForm extends SaasFeaturesValues, ConfigurationValues {}

export const SaasFeatures = () => {
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<FeaturesForm>({
    defaultValues: form,
  })

  const onSubmit: SubmitHandler<FeaturesForm> = (data) => {
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
          gap={5}
        >
          <SaasFeaturesComponent />
        </Flex>
        <StepsNavigation />
      </Wrapper>
    </FormProvider>
  )
}
