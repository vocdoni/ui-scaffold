import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import InputBasic from '~components/shared/Form/InputBasic'
import { QueryKeys } from '~src/queries/keys'
import { Member, useAddMembers, useUrlPagination } from '~src/queries/members'
import { useTable } from '../TableProvider'

type MemberFormData = Record<string, string>

type MemberManagerProps = {
  control: React.ReactElement
  member?: Partial<Member> | null
}

export const MemberManager = ({ control, member = null }: MemberManagerProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const { columns } = useTable()
  const addMember = useAddMembers()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()
  const { page, limit } = useUrlPagination()

  const defaultValues: MemberFormData = useMemo(() => Object.fromEntries(columns.map((col) => [col.id, ''])), [columns])

  const methods = useForm({ defaultValues })

  const isEdit = Boolean(member)

  const title = isEdit
    ? t('memberbase.edit_member.title', { defaultValue: 'Edit Member' })
    : t('memberbase.add_member.title', { defaultValue: 'Add Member' })

  const description = isEdit
    ? t('memberbase.edit_member.description', { defaultValue: 'Edit the member details below.' })
    : t('memberbase.add_member.description', { defaultValue: 'Fill in the member details below.' })

  const successToastMessage = isEdit
    ? t('memberbase.edit_member.success', { defaultValue: 'Member updated successfully!' })
    : t('memberbase.add_member.success', { defaultValue: 'Member added successfully!' })

  const errorToastMessage = isEdit
    ? t('memberbase.edit_member.error', { defaultValue: 'Error updating member.' })
    : t('memberbase.add_member.error', { defaultValue: 'Error adding member.' })

  const fieldValidations: Record<string, any> = {
    email: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t('form.member.error.invalid_email', { defaultValue: 'Invalid email address' }),
      },
    },
    phone: {
      pattern: {
        value: /^\+?[1-9]\d{7,14}$/,
        message: t('form.member.error.invalid_phone', { defaultValue: 'Invalid phone number' }),
      },
    },
    birthDate: {
      validate: (value: string) => {
        if (!value) return true
        const selectedDate = new Date(value)
        const now = new Date()

        return (
          selectedDate <= now ||
          t('form.member.error.invalid_birth_date', { defaultValue: 'Birth date cannot be in the future' })
        )
      },
    },
  }

  /**
   * Syncs the form values with the selected member.
   *
   * When the `member` prop changes, this effect resets the form fields
   * to match the new member's data. This ensures that when editing an existing
   * member, the form is pre-filled with their current information.
   */
  useEffect(() => {
    if (member) {
      methods.reset(member)
    }
  }, [member])

  const onSubmit = (data: MemberFormData) => {
    const { memberNumber, name, surname, email, phone, nationalID, birthDate } = data

    const memberPayload: Partial<Member> = {
      memberNumber,
      name,
      surname,
      email,
      phone,
      nationalID,
      birthDate,
    }

    addMember.mutate([memberPayload], {
      onSuccess: () => {
        toast({
          title: successToastMessage,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        methods.reset()
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.organization.members(organization.address), page, limit],
        })
        onClose()
      },
      onError: (error) => {
        toast({
          title: errorToastMessage,
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }

  const handleClose = () => {
    methods.clearErrors()
    onClose()
  }

  return (
    <FormProvider {...methods}>
      {cloneElement(control, { ref: btnRef, onClick: onOpen })}
      <Drawer isOpen={isOpen} placement='right' onClose={handleClose} finalFocusRef={btnRef} size='sm'>
        <DrawerOverlay />
        <DrawerContent p={1}>
          <DrawerHeader>
            <Heading size='md'>{title}</Heading>
            <Text fontSize='sm' color='texts.subtle'>
              {description}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack as='form' id='member-form' spacing={4} onSubmit={methods.handleSubmit(onSubmit)}>
              {columns.map((col) => {
                const isPhone = col.id === 'phone'
                const isBirthdate = col.id === 'birthDate'

                return (
                  <InputBasic
                    key={col.id}
                    formValue={col.id}
                    label={col.label}
                    type={isBirthdate ? 'date' : isPhone ? 'tel' : 'text'}
                    validation={fieldValidations[col.id] || {}}
                  />
                )
              })}
            </Stack>
            <Flex justify='flex-end' gap={2} mt={4}>
              <Button variant='outline' colorScheme='black' onClick={handleClose}>
                {t('memberbase.form.cancel', { defaultValue: 'Cancel' })}
              </Button>
              <Button type='submit' isLoading={addMember.isPending} colorScheme='black' form='member-form'>
                {t('memberbase.form.save', { defaultValue: 'Save Changes' })}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  )
}
