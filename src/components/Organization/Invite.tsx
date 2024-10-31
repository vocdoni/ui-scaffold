import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  Stack,
  Text,
  useDisclosure,
  useRadio,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { ReactElement } from 'react'
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { HSeparator } from '~components/Auth/SignIn'
import { useAuth } from '~components/Auth/useAuth'
import InputBasic from '~components/Layout/InputBasic'
import { CallbackProvider, useCallbackContext } from '~utils/callback-provider'

type InviteData = {
  email: string
  role: string
}

const useInviteMemberMutation = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useMutation<InviteData, Error, InviteData>({
    mutationFn: async (body) =>
      await bearedFetch(`organizations/${ensure0x(organization.address)}/members`, {
        method: 'POST',
        body,
      }),
  })
}

const InviteForm = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const mutation = useInviteMemberMutation()
  const { success } = useCallbackContext()

  const methods = useForm({
    defaultValues: {
      email: '',
      role: 'admin',
    },
  })

  const onSubmit = (data: InviteData) =>
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: t('invite.success', { defaultValue: 'Invitation sent successfully!' }),
          description: t('invite.user_invited'),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        success()
      },
      onError: (error: Error) => {
        toast({
          title: t('invite.error', { defaultValue: 'Error' }),
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })

  return (
    <FormProvider {...methods}>
      <Flex as='form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={6}>
        <InputBasic
          formValue='email'
          label={t('email')}
          placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
          type='email'
          required
        />
        <FormControl>
          <FormLabel fontSize='sm'>
            <Trans i18nKey='invite.select_option'>Select an option</Trans>
          </FormLabel>
          <Stack direction='column' my='10px' gap={0}>
            <RoleRadio
              name='role'
              value='admin'
              fieldName={<Trans i18nKey='invite.admin'>Admin</Trans>}
              description={
                <Trans i18nKey='invite.admin_description'>
                  Can view, comment, or also create and edit all workspace projects and folders. Typically used for
                  employees.
                </Trans>
              }
              borderTopRadius='xl'
            />
            <RoleRadio
              name='role'
              value='manager'
              fieldName={<Trans i18nKey='invite.manager'>Manager</Trans>}
              description={<Trans i18nKey='invite.manager_description'>Can manage 😁</Trans>}
            />
            <RoleRadio
              name='role'
              value='guest'
              fieldName={<Trans i18nKey='invite.guest'>Guest</Trans>}
              description={
                <Trans i18nKey='invite.guest_description'>
                  Can only access projects that you specify. Typically used for clients and stakeholders.
                </Trans>
              }
              borderBottomRadius='xl'
            />
          </Stack>
        </FormControl>
        <Flex justifyContent='center'>
          <Button mx='auto' type='submit'>
            <Trans i18nKey='submit'>Submit</Trans>
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export const InviteToTeamModal = (props: ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} {...props}>
        <Trans i18nKey='invite_people'>Invite People</Trans>
      </Button>
      <CallbackProvider success={() => onClose()}>
        <Modal isOpen={isOpen} onClose={onClose} size='xl' closeOnOverlayClick>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display='flex' flexDirection='column' gap={6}>
              <Flex justifyContent='space-between' flexDirection='column' gap={1}>
                <Heading fontSize='2xl'>
                  <Trans i18nKey='invite.title'>Invite people to your team</Trans>
                </Heading>
                <Text fontWeight='normal'>
                  <Trans i18nKey='invite.subtitle'>Work together on projects</Trans>
                </Text>
              </Flex>
              <HSeparator />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InviteForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </CallbackProvider>
    </>
  )
}

type RoleRadioProps = FlexProps & {
  name: string
  fieldName: ReactElement
  description: ReactElement
  value: string
}

const RoleRadio = ({ name, fieldName: title, description, value, ...props }: RoleRadioProps) => {
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
  })

  const { getInputProps, getRadioProps } = useRadio({
    value,
    onChange: field.onChange,
    isChecked: field.value === value,
  })

  const input = getInputProps()
  const radio = getRadioProps()

  return (
    <Flex
      as='label'
      border='1px solid'
      borderColor='rgba(135, 140, 189, 0.3)'
      gap={5}
      padding={6}
      cursor='pointer'
      _checked={{ bg: 'dashboard.invite.bg_checked_light', _dark: { bg: 'dashboard.invite.bg_checked_dark' } }}
      {...props}
      {...radio}
    >
      <input {...input} />
      <Box flex='1'>
        <Text>{title}</Text>
        <Text fontWeight='normal'>{description}</Text>
      </Box>
      <Radio
        isChecked={field.value === value}
        onChange={() => field.onChange(value)} // Ensure onChange updates form state
      />
    </Flex>
  )
}
