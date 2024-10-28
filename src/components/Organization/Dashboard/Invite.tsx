import { Box, Button, Flex, FormControl, FormLabel, Heading, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { IoCloseSharp } from 'react-icons/io5'
import { HSeparator } from '~components/Auth/SignIn'
import InputCustom from '~components/Layout/InputCustom'
import useDarkMode from '~components/Layout/useDarkMode'

const Invite = ({ setInviteView }: { setInviteView: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation()
  const { textColorSecondary } = useDarkMode()

  const methods = useForm({
    defaultValues: {
      email: '',
      option: 'admin',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Flex flexDirection='column' gap={6} maxW='600px' mx='auto'>
      <Box>
        <Flex justifyContent='space-between'>
          <Heading fontSize='2xl' mb={2.5}>
            <Trans i18nKey='invite.title'>Invite people to your workspace</Trans>
          </Heading>
          <Button borderRadius='full' minW='none' minH='none' h={0} p={3} px={1} onClick={() => setInviteView(false)}>
            <IoCloseSharp />
          </Button>
        </Flex>
        <Text color={textColorSecondary}>
          <Trans i18nKey='invite.subtitle'>Work together on projects</Trans>
        </Text>
      </Box>
      <HSeparator />
      <FormProvider {...methods}>
        <Flex as='form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={6}>
          <InputCustom
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
            required
          />
          <OptionForm />
          <Flex justifyContent='center'>
            <Button mx='auto' type='submit'>
              <Trans i18nKey='submit'>Submit</Trans>
            </Button>
          </Flex>
        </Flex>
      </FormProvider>
    </Flex>
  )
}

const OptionForm = () => {
  const { bgSecondary, textColorSecondary } = useDarkMode()
  const { control } = useFormContext()

  return (
    <FormControl>
      <FormLabel fontSize='sm'>
        <Trans i18nKey='invite.select_option'>Select an option</Trans>
      </FormLabel>
      <Controller
        name='option'
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            <Stack direction='column' my='10px' gap={0}>
              <Flex
                as='label'
                border='1px solid'
                borderColor='rgba(135, 140, 189, 0.3)'
                gap={5}
                padding={6}
                borderTopRadius='xl'
                cursor='pointer'
                bg={field.value === 'admin' ? bgSecondary : 'transparent'}
              >
                <Box>
                  <Text>
                    <Trans i18nKey='invite.admin'>Admin</Trans>
                  </Text>
                  <Text color={textColorSecondary}>
                    <Trans i18nKey='invite.admin_description'>
                      Can view, comment, or also create and edit all workspace projects and folders. Typically used for
                      employees.
                    </Trans>
                  </Text>
                </Box>
                <Flex justifyContent='center' alignItems='center' gap={2.5}>
                  <Radio value='admin' isChecked={field.value === 'admin'} />
                </Flex>
              </Flex>

              <Flex
                as='label'
                border='1px solid'
                borderColor='rgba(135, 140, 189, 0.3)'
                gap={5}
                padding={6}
                borderBottomRadius='xl'
                cursor='pointer'
                bg={field.value === 'guest' ? bgSecondary : 'transparent'}
              >
                <Box>
                  <Text>
                    <Trans i18nKey='invite.guest'>Guest</Trans>
                  </Text>
                  <Text color={textColorSecondary}>
                    <Trans i18nKey='invite.guest_description'>
                      Can only access projects that you specify choose. Tipically use for clients and stackholders.
                    </Trans>
                  </Text>
                </Box>
                <Flex justifyContent='center' alignItems='center' gap={2.5}>
                  <Radio value='guest' isChecked={field.value === 'guest'} />
                </Flex>
              </Flex>
            </Stack>
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}

export default Invite
