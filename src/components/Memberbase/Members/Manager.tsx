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
import { useMutation } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRevalidator } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import InputBasic from '~components/shared/Form/InputBasic'
import { useTable } from '../TableProvider'

const fieldMap: Record<string, string> = {
  name: 'name',
  lastname: 'lastName',
  email: 'email',
  phone: 'phone',
  memberID: 'memberID',
  national_id: 'nationalId',
  birth_date: 'birthdate',
}

const requiredFields = ['name', 'lastName', 'email', 'memberID', 'phone']

const useAddMember = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const { revalidate } = useRevalidator()

  return useMutation<void, Error, Record<string, any>>({
    mutationFn: async (members) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(organization.address)),
        { body: { members }, method: 'POST' }
      ),
    onSuccess: () => {
      revalidate()
    },
  })
}

export const MemberManager = ({ control, member = null }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const { columns } = useTable()
  const addMember = useAddMember()
  const defaultValues = useMemo(() => {
    const result: Record<string, string> = {}
    columns.forEach((col) => {
      const formKey = fieldMap[col.id]
      if (formKey) {
        result[formKey] = ''
      }
    })
    return result
  }, [columns])
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

  const onSubmit = (data) => {
    const { name, email, phone, password, memberID, lastName, nationalId, birthdate } = data

    const member = {
      memberID,
      name,
      email,
      phone,
      password,
      other: {
        lastName,
        nationalId,
        birthdate,
      },
    }

    addMember.mutate([member], {
      onSuccess: () => {
        toast({
          title: successToastMessage,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        methods.reset()
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
              {columns
                .filter((col) => col.visible)
                .map((col) => {
                  const formValue = fieldMap[col.id]
                  if (!formValue) return null

                  return (
                    <InputBasic
                      key={formValue}
                      formValue={formValue}
                      label={col.label}
                      type={formValue === 'birthdate' ? 'date' : 'text'}
                      required={requiredFields.includes(formValue)}
                    />
                  )
                })}
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
