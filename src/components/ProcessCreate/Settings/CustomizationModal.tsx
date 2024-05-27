import {
  AspectRatio,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '~components/ProcessCreate/Steps/use-steps'
import { FormProvider, SubmitHandler, useForm, useFormContext, UseFormRegister } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import fallback from '/assets/default-avatar.png'
import { Button } from '@vocdoni/chakra-components'
import { CiSaveDown2 } from 'react-icons/ci'
import { useEffect } from 'react'

export type CustomizationValues = {
  isCustomizationSet: boolean
  logo: string
  color: string
  header: string
  streamUri: string
  subdomain: string
}

const CustomizationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()
  const methods = useForm<CustomizationValues>({
    defaultValues: form,
  })

  const onSubmit: SubmitHandler<CustomizationValues> = (data) => {
    // Check if form is dirty to mark the customization as set up
    const customizationFields: (keyof CustomizationValues)[] = ['logo', 'color', 'header', 'streamUri', 'subdomain']
    const isCustomizationSet = customizationFields.some((field) => {
      return methods.formState.dirtyFields[field] && methods.getValues(field) !== ''
    })
    setForm({ ...form, ...data, isCustomizationSet })
    onClose()
  }

  // Use previously saved form values.
  // Used to do not store unwanted changes if the modal was closed without submitting.
  useEffect(() => {
    if (isOpen) {
      methods.reset(form)
    }
  }, [isOpen, form, methods])

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={{ lg: '700px' }}>
          <ModalHeader>{t('process_create.customization.title')}</ModalHeader>
          <ModalCloseButton />
          <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalBody>
              {t('process_create.customization.description')}
              <RowLayout label={t('process_create.customization.logo_label')}>
                <ImageSelector name={'logo'} />
              </RowLayout>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' leftIcon={<CiSaveDown2 />}>
                {t('process_create.customization.submit')}
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}

// todo(kon): replace this component with the EditProfile one
const REGEX_IMG = /^(https?:\/\/|ipfs:\/\/)/i

interface ImageUploaderProps {
  name: string
  helper?: string
}

const ImageSelector = ({ name, helper }: ImageUploaderProps) => {
  const correctImageFormat = (val: string) => REGEX_IMG.test(val)
  const { t } = useTranslation()

  const {
    register,
    unregister,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const image = watch(name)

  return (
    <Flex alignItems='center' gap={5}>
      <Box position='relative' outline='none' border='none'>
        <AspectRatio flexShrink={0} w={{ base: 20, md: 40 }} ratio={1.25 / 1} borderRadius={0} overflow='hidden'>
          <Image src={image} fallbackSrc={fallback} />
        </AspectRatio>
        {correctImageFormat(image) && (
          <IconButton
            aria-label={t('form.account_create.delete_image')}
            icon={<BiTrash />}
            onClick={() => {
              setValue(name, '')
              unregister(name)
            }}
            position='absolute'
            top={2}
            right={2}
            cursor='pointer'
            size='xs'
            fontSize='md'
          />
        )}
      </Box>
      <FormControl isInvalid={!!errors['name']}>
        <Input
          type='text'
          {...register(name, {
            validate: (val: string) => {
              if (val && !correctImageFormat(val)) {
                return t('form.error.avatar_error')
              }
            },
          })}
          mb={1}
          placeholder={t('form.edit_profile.avatar_placeholder').toString()}
        />

        {!!errors['name'] ? (
          <FormErrorMessage>{errors['name']?.message?.toString()}</FormErrorMessage>
        ) : !!helper ? (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{helper}</Text>
          </FormHelperText>
        ) : null}
      </FormControl>
    </Flex>
  )
}

const RowLayout = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </>
  )
}

export default CustomizationModal
