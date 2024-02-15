import { CalendarIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { AiFillGooglePlusCircle } from 'react-icons/ai'
import { FaRegCalendarAlt } from 'react-icons/fa'

const ModalPro = ({ isOpen, onClose, reason }: { isOpen: boolean; onClose: () => void; reason: string }) => {
  const { t } = useTranslation()
  console.log(reason)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      reason: reason,
    },
  })

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  useEffect(() => {
    setValue('reason', reason)
  }, [reason])

  const onSubmit = (form: { name: string; email: string; reason: string }) => {
    console.log(form)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={{ lg: '700px' }}>
        <ModalHeader>{t('process_create.modal_pro.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={6}>
            <Trans
              i18nKey='process_create.modal_pro.description'
              components={{
                p: <Text />,
                bold: <Text as='span' fontWeight='bold' />,
              }}
            />
          </Box>

          <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 0 }}>
            <Flex
              as='form'
              id='modal-pro'
              flex='1 1 50%'
              flexDirection='column'
              justifyContent='space-between'
              gap={10}
              pr={{ lg: 5 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Text color='gray' mb={0}>
                {t('process_create.modal_pro.form_description')}
              </Text>
              <Flex flexDirection='column' gap={3}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t('process_create.modal_pro.form_name_label')}</FormLabel>
                  <Input
                    {...register('name', { required })}
                    placeholder={t('process_create.modal_pro.form_name_placeholder')}
                  />
                  {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>{t('process_create.modal_pro.form_email_label')}</FormLabel>
                  <Input
                    {...register('email', { required })}
                    type='email'
                    placeholder={t('process_create.modal_pro.form_email_placeholder')}
                  />
                  {!!errors.email && <FormErrorMessage>{errors.email?.message?.toString()}</FormErrorMessage>}
                </FormControl>
              </Flex>
              <Button type='submit' form='modal-pro'>
                {t('process_create.modal_pro.form_btn')}
              </Button>
            </Flex>
            <Box w={{ lg: '1px' }} h={{ base: '1px', lg: 'auto' }} bgColor='gray'></Box>
            <Flex flex='1 1 50%' flexDirection='column' justifyContent='space-between' gap={10} pl={{ lg: 5 }}>
              <Text color='gray'>{t('process_create.modal_pro.scheudle_description')}</Text>
              <Flex justifyContent='center' mb='10px'>
                <Box position='relative' width='100px'>
                  <FaRegCalendarAlt size={100} />
                  <Box position='absolute' top='65px' left='70px' bgColor='white' borderRadius='full'>
                    <AiFillGooglePlusCircle size={50} />
                  </Box>
                </Box>
              </Flex>
              <Button
                as='a'
                href='https://calendar.google.com/calendar/appointments/schedules/AcZssZ29VUbJIqlHtdY32eVUd2OhbjfQLoiHhTAk34Ct6PianaFnwediCb6K021zcX5RaKDdd76eZS-O?gv=true'
                target='_blank'
                leftIcon={<CalendarIcon />}
              >
                {t('process_create.modal_pro.scheudle_btn')}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalPro
