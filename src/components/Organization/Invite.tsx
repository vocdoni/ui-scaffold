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
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { HSeparator } from '~components/Auth/SignIn'
import InputBasic from '~components/Layout/InputBasic'

const InviteForm = () => {
  const { t } = useTranslation()

  const methods = useForm({
    defaultValues: {
      email: '',
      role: 'admin',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

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
    defaultValue: 'guest',
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
