import { Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'
import { GithubUserSearch } from '../Census/Csp/GithubUserSearch'
import { GoogleUsers } from '../Census/Csp/GoogleUsers'

export interface CensusCspValues {
  userList: { login: string }[]
}

export const StepFormCensusCsp = ({ provider }: { provider: 'github' | 'google' }) => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm({
    defaultValues: {
      userList: form.userList,
      maxCensusSize: form.userList?.length || 0,
    },
  })
  const userList = methods.watch('userList')

  useEffect(() => {
    methods.clearErrors('userList')
    setForm({ ...form, userList, maxCensusSize: userList?.length || 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList])

  const onSubmit: SubmitHandler<CensusCspValues> = (data) => {
    if (!userList.length) {
      methods.setError('userList', {
        type: 'manual',
        message: t('form.error.min_users_address'),
      })
    } else {
      next()
    }
  }

  const updatedUserSelection = (users: any) => {
    methods.setValue('userList', users)
  }

  return (
    <>
      <Box px={7} py={4}>
        <FormProvider {...methods}>
          <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
            {provider === 'github' && (
              <GithubUserSearch
                onUpdateSelection={updatedUserSelection}
                showSelectedList={true}
                initialUsers={userList}
              />
            )}

            {provider === 'google' && (
              <GoogleUsers
                formField={'aDiffUserList'}
                onUpdateSelection={updatedUserSelection}
                initialUsers={userList}
              />
            )}

            {methods.formState.errors.userList && (
              <Text color='red' textAlign='center' mt={2}>
                {methods.formState.errors.userList.message}
              </Text>
            )}
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
