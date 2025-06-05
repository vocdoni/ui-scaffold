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
} from '@chakra-ui/react'
import { cloneElement, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import InputBasic from '~components/shared/Form/InputBasic'

export const MemberManager = ({ control, participant = null }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const methods = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      memberId: '',
      nationalId: '',
      birthdate: '',
    },
  })

  useEffect(() => {
    if (participant) {
      methods.reset(participant)
    }
  }, [participant, methods])

  const title = participant
    ? t('memberbase.edit_member.title', { defaultValue: 'Edit Member' })
    : t('memberbase.add_member.title', { defaultValue: 'Add Member' })

  const description = participant
    ? t('memberbase.edit_member.description', { defaultValue: 'Edit the member details below.' })
    : t('memberbase.add_member.description', { defaultValue: 'Fill in the member details below.' })

  const onSubmit = (data) => {
    const { name, email, phone, password, participantNo, lastName, nationalId, birthdate } = data

    const payload = {
      participantNo,
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

    console.log('Payload', payload)
    onClose()
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      {cloneElement(control, { ref: btnRef, onClick: onOpen })}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='sm'>
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
              <InputBasic
                formValue='name'
                label={t('memberbase.form.name', { defaultValue: 'First Name' })}
                type='text'
                required
              />
              <InputBasic
                formValue='lastName'
                label={t('memberbase.form.lastname', { defaultValue: 'Last Name' })}
                type='text'
                required
              />
              <InputBasic
                formValue='email'
                label={t('memberbase.form.email', { defaultValue: 'Email' })}
                type='email'
              />
              <InputBasic formValue='phone' label={t('memberbase.form.phone', { defaultValue: 'Phone' })} type='tel' />
              <InputBasic
                formValue='participantNo'
                label={t('memberbase.form.member_id', { defaultValue: 'Member ID' })}
                type='text'
              />
              <InputBasic
                formValue='nationalId'
                label={t('memberbase.form.national_id', { defaultValue: 'National ID' })}
                type='text'
              />
              <InputBasic
                formValue='birthdate'
                label={t('memberbase.form.birthdate', { defaultValue: 'Birthdate' })}
                type='date'
              />
            </Flex>
            <Flex justify='flex-end' gap={2} mt={4}>
              <Button variant='outline' colorScheme='black' onClick={onClose}>
                {t('memberbase.form.cancel', { defaultValue: 'Cancel' })}
              </Button>
              <Button type='submit' colorScheme='black' form='member-form'>
                {t('memberbase.form.save', { defaultValue: 'Save Changes' })}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  )
}
