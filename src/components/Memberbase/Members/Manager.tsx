import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
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
import { Member, useAddMembers } from '~src/queries/members'
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

  useEffect(() => {
    if (member) {
      methods.reset(member)
    }
  }, [member, methods])

  const onSubmit = (data: MemberFormData) => {
    const { name, email, phone, password, memberID } = data

    const memberPayload: Member = {
      memberID,
      name,
      email,
      phone,
      password,
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
          queryKey: QueryKeys.organization.members(organization.address),
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
            <Flex as='form' id='member-form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={4}>
              {columns.map((col) => (
                <InputBasic
                  key={col.id}
                  formValue={col.id}
                  label={col.label}
                  type={col.id === 'birthdate' ? 'date' : 'text'}
                />
              ))}
            </Flex>
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
