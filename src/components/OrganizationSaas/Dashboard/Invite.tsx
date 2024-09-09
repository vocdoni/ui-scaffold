import { Box, Button, Flex, FormControl, FormLabel, Heading, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { IoCloseSharp } from 'react-icons/io5'
import Email from '~components/Auth/Email'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const Invite = ({ setInviteView }: { setInviteView: Dispatch<SetStateAction<boolean>> }) => {
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
    <Box maxW='600px' mx='auto'>
      <Flex justifyContent='space-between'>
        <Heading fontSize='2xl' mb='10px'>
          <Trans>Invite people to your workspace</Trans>
        </Heading>
        <Button
          variant='outline'
          borderColor='gray.300'
          borderRadius='full'
          minW='none'
          minH='none'
          h='0'
          p={3}
          px={1}
          onClick={() => setInviteView(false)}
        >
          <IoCloseSharp />
        </Button>
      </Flex>
      <Text color={textColorSecondary}>
        <Trans>Work together on projects</Trans>
      </Text>
      <HSeparator my='24px' />
      <FormProvider {...methods}>
        <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
          <Email label='Enter email' />
          <OptionForm />
          <Flex justifyContent='center'>
            <Button mx='auto' type='submit'>
              <Trans>Submit</Trans>
            </Button>
          </Flex>
        </Box>
      </FormProvider>
    </Box>
  )
}

const OptionForm = () => {
  const { bgSecondary, textColorSecondary } = useDarkMode()
  const { control } = useFormContext()

  return (
    <FormControl>
      <FormLabel>
        <Trans>Select an option</Trans>
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
                gap='20px'
                padding='25px'
                borderTopRadius='xl'
                cursor='pointer'
                bg={field.value === 'admin' ? bgSecondary : 'transparent'}
              >
                <Box>
                  <Text>
                    <Trans>Admin</Trans>
                  </Text>
                  <Text color={textColorSecondary}>
                    <Trans>
                      Can view, comment, or also create and edit all workspace projects and folders. Typically used for
                      employees.
                    </Trans>
                  </Text>
                </Box>
                <Flex justifyContent='center' alignItems='center' gap='10px'>
                  <Radio value='admin' isChecked={field.value === 'admin'} />
                </Flex>
              </Flex>

              <Flex
                as='label'
                border='1px solid'
                borderColor='rgba(135, 140, 189, 0.3)'
                gap='20px'
                padding='25px'
                borderBottomRadius='xl'
                cursor='pointer'
                bg={field.value === 'guest' ? bgSecondary : 'transparent'}
              >
                <Box>
                  <Text>
                    <Trans>Guest</Trans>
                  </Text>
                  <Text color={textColorSecondary}>
                    <Trans>
                      Can only access projects that you specify choose. Tipically use for clients and stackholders.
                    </Trans>
                  </Text>
                </Box>
                <Flex justifyContent='center' alignItems='center' gap='10px'>
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
