import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const Invite = ({ setInviteView }: { setInviteView: Dispatch<SetStateAction<boolean>> }) => {
  const { textColorSecondary } = useDarkMode()
  const [email, setEmail] = useState('')
  const [option, setOption] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (email.length) {
      setError(false)
    }
  }, [email])

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!email) {
      setError(true)
    }
  }
  return (
    <Box maxW='600px' mx='auto'>
      <Flex justifyContent='space-between'>
        <Heading fontSize='2xl' mb='10px'>
          <Trans>Invite people to your workspace</Trans>
        </Heading>
        <Button variant='outline' onClick={() => setInviteView(false)}>
          X
        </Button>
      </Flex>
      <Text color={textColorSecondary}>
        <Trans>Work together on projects</Trans>
      </Text>
      <HSeparator my='20px' />
      {!email.length && <EmailsForm setEmail={setEmail} />}
      {!!email.length && (
        <Flex flexDirection='column' gap='10px' mt='20px' mb='40px'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Text>{email}</Text>
            <Button variant='outline' onClick={() => setEmail('')}>
              X
            </Button>
          </Flex>
        </Flex>
      )}
      <OptionForm option={option} setOption={setOption} />
      {!!error && (
        <Text my='10px' color='red.400'>
          <Trans>You have to add an email</Trans>
        </Text>
      )}
      <form onSubmit={onSubmit}>
        <Flex justifyContent='center'>
          <Button mx='auto' type='submit'>
            <Trans>Submit</Trans>
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

const EmailsForm = ({ setEmail }: { setEmail: Dispatch<SetStateAction<string>> }) => {
  const { t } = useTranslation()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = (form: { email: string }) => {
    setEmail(form.email)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>
          <Trans>Enter email</Trans>
        </FormLabel>
        <Input type='email' {...register('email', { required })} borderColor='rgba(135, 140, 189, 0.3)' my='10px' />
        <FormErrorMessage mb='10px'>{errors.email?.message?.toString()}</FormErrorMessage>
        <Flex justifyContent='center'>
          <Button mx='auto' type='submit'>
            <Trans>Add</Trans>
          </Button>
        </Flex>
      </FormControl>
    </form>
  )
}

const OptionForm = ({ option, setOption }: { option: string; setOption: Dispatch<SetStateAction<string>> }) => {
  const { bgSecondary, textColorSecondary } = useDarkMode()

  return (
    <FormControl>
      <FormLabel>
        <Trans>Select an option</Trans>
      </FormLabel>
      <RadioGroup>
        <Stack direction='column' my='10px' gap={0}>
          <Flex
            as='label'
            border='1px solid'
            borderColor='rgba(135, 140, 189, 0.3)'
            gap='20px'
            padding='25px'
            cursor='pointer'
            onClick={() => setOption('team member')}
            bg={option === 'team member' ? bgSecondary : 'transparent'}
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
              <Radio isChecked={option === 'team member'} />
            </Flex>
          </Flex>

          <Flex
            as='label'
            border='1px solid'
            borderColor='rgba(135, 140, 189, 0.3)'
            gap='20px'
            padding='25px'
            cursor='pointer'
            onClick={() => setOption('guest')}
            bg={option === 'guest' ? bgSecondary : 'transparent'}
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
              <Radio isChecked={option === 'guest'} />
            </Flex>
          </Flex>
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

export default Invite
