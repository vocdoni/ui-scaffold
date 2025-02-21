import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

type CSPStep1FormData = {
  code: string
}

export const Step1Base = () => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CSPStep1FormData>({
    defaultValues: {
      code: '',
    },
  })

  const onSubmit = (values: CSPStep1FormData) => {
    console.log('values:', values)
  }

  return (
    <VStack spacing={6} align='stretch' w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.code}>
            <HStack justifyContent='center'>
              <Controller
                control={control}
                name='code'
                rules={{
                  required: t('csp_census.auth.step1.validation.required', {
                    defaultValue: 'Code is required',
                  }),
                  minLength: {
                    value: 4,
                    message: t('csp_census.auth.step1.validation.length', {
                      defaultValue: 'Code must be 4 digits',
                    }),
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PinInput
                    size='lg'
                    value={value}
                    onChange={(val) => {
                      onChange(val)
                      if (val.length === 4) {
                        handleSubmit(onSubmit)()
                      }
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                )}
              />
            </HStack>
            {errors.code && <FormErrorMessage textAlign='center'>{errors.code.message}</FormErrorMessage>}
            <Text textAlign='center' mt={2} fontSize='sm' color='gray.600'>
              <Trans i18nKey='csp_census.auth.step1.resend'>
                Not received the code?{' '}
                <Link color='primary.500' onClick={() => console.log('resend')}>
                  Re-send
                </Link>
              </Trans>
            </Text>
          </FormControl>

          <Button type='submit' colorScheme='primary' w='full'>
            {t('csp_census.auth.step1.submit', {
              defaultValue: 'Authenticate',
            })}
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export const Step1Modal = () => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Trans i18nKey='csp_census.auth.step1.title'>Authentication</Trans>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Step1Base />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
