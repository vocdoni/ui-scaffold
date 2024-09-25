import { useProcessCreationSteps } from '../Steps/use-steps'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { Flex } from '@chakra-ui/react'
import { StepsNavigation } from '~components/ProcessCreate/Steps/Navigation'
import { FeaturesKeys } from '~components/AccountSaas/useAccountPlan'
import { ConfigurationValues } from '~components/ProcessCreate/StepForm/Info'
import { SaasFeatures as SaasFeaturesComponent } from '~components/ProcessCreate/Settings/SaasFeatures'

export type ExtraFeatures = Record<FeaturesKeys, boolean>
interface FeaturesForm extends ExtraFeatures, ConfigurationValues {}

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
