import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

interface CSPStep0FormData {
  document: string
  birthDate: string
}

export const Step0Base = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CSPStep0FormData>()

  const onSubmit = (values: CSPStep0FormData) => {
    console.log('values', values)
  }

  return (
    <VStack spacing={6} align='stretch' w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.document}>
            <FormLabel>{t('csp_census.auth.step0.document_label')}</FormLabel>
            <Input
              {...register('document', { required: true })}
              placeholder={t('csp_census.auth.step0.document_placeholder')}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.birthDate}>
            <FormLabel>{t('csp_census.auth.step0.birth_date_label')}</FormLabel>
            <Input {...register('birthDate', { required: true })} type='date' />
          </FormControl>

          <Button type='submit' colorScheme='primary' w='full'>
            {t('csp_census.auth.step0.submit')}
          </Button>
        </Stack>
      </form>
    </VStack>
  )
}

export const Step0Modal = () => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Trans i18nKey='csp_census.auth.step0.title'>Authentication</Trans>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Step0Base />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
