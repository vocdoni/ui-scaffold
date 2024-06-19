import {
  AspectRatio,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
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
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import fallback from '/assets/default-avatar.png'
import { Button } from '@vocdoni/chakra-components'
import { CiSaveDown2 } from 'react-icons/ci'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AspectRatioProps } from '@chakra-ui/layout/dist/aspect-ratio'
import ReactPlayer from 'react-player'
import { SketchPicker, ColorResult } from 'react-color'
import { useClient } from '@vocdoni/react-providers'
import { InfoValues } from '~components/ProcessCreate/StepForm/Info'

export type CustomizationValues = {
  isCustomizationSet: boolean
  logo: string
  color: string
  header: string
  streamUri: string
  subdomain: string
}

const CustomizationModal = ({
  isOpen,
  onClose,
  electionInfo,
}: {
  isOpen: boolean
  onClose: () => void
  electionInfo: InfoValues
}) => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()
  const methods = useForm<CustomizationValues>({
    defaultValues: form,
  })

  const { account } = useClient()

  const formData = methods.watch()

  const previewWindowRef = useRef<Window | null>(null)

  const onSubmit: SubmitHandler<CustomizationValues> = (data) => {
    // Check if form is dirty to mark the customization as set up
    const customizationFields: (keyof CustomizationValues)[] = ['logo', 'color', 'header', 'streamUri', 'subdomain']
    const isCustomizationSet = customizationFields.some((field) => {
      return methods.formState.dirtyFields[field] && methods.getValues(field) !== ''
    })
    setForm({ ...form, ...data, isCustomizationSet })
    onClose()
  }

  const openPreview = () => {
    previewWindowRef.current = window.open('preview', '_blank')

    // Send the initial form data to the preview window
    previewWindowRef.current!.onload = () => {
      previewWindowRef.current!.postMessage(
        {
          previewData: {
            formData: {
              ...formData,
              ...electionInfo,
            },
            account,
          },
        },
        '*'
      )
    }
  }

  // Handle form changes and update the preview
  useEffect(() => {
    if (previewWindowRef.current) {
      previewWindowRef.current!.postMessage(
        {
          previewData: {
            formData: {
              ...formData,
              ...electionInfo,
            },
            account,
          },
        },
        '*'
      )
    }
  }, [formData, previewWindowRef])

  // Use previously saved form values.
  // Used to do not store unwanted changes if the modal was closed without submitting.
  useEffect(() => {
    if (isOpen) {
      methods.reset(form)
    }
  }, [isOpen, form, methods])

  // Clean up the preview window reference when the component unmounts
  useEffect(() => {
    return () => {
      if (previewWindowRef.current) {
        previewWindowRef.current.close()
      }
    }
  }, [])

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
              <Flex pt={4} direction={'column'} gap={6}>
                <RowLayout
                  label={t('process_create.customization.logo_label')}
                  helper={t('process_create.customization.logo_helper')}
                >
                  <MediaSelector name={'logo'} placeholder={t('process_create.customization.logo_placeholder')} />
                </RowLayout>
                <RowLayout
                  label={t('process_create.customization.color_label')}
                  helper={t('process_create.customization.color_helper')}
                >
                  <ColorPicker />
                </RowLayout>
                <RowLayout
                  label={t('process_create.customization.header_label')}
                  helper={t('process_create.customization.header_helper')}
                >
                  <MediaSelector
                    name={'header'}
                    placeholder={t('process_create.customization.header_placeholder')}
                    ratio={4 / 1}
                    w={{ base: 100, md: 100 }}
                    maxW={'100%'}
                  />
                </RowLayout>
                <RowLayout
                  label={t('process_create.customization.stream_label')}
                  helper={t('process_create.customization.stream_helper')}
                >
                  <MediaSelector
                    name={'streamUri'}
                    placeholder={t('process_create.customization.stream_placeholder')}
                    isVideo={true}
                    w={{ base: 80, md: 100 }}
                    ratio={16 / 9}
                  />
                </RowLayout>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button onClick={openPreview} variant='ghost'>
                {t('process_create.customization.preview')}
              </Button>
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

// todo(kon): replace the EditProfile avatar preview component with this one
const REGEX_IMG = /^(https?:\/\/|ipfs:\/\/)/i

type MediaSelectorProps = {
  name: string
  helper?: string
  isVideo?: boolean
  placeholder?: string
} & AspectRatioProps

const MediaSelector = ({ name, helper, isVideo = false, placeholder, ...aspectRatioProps }: MediaSelectorProps) => {
  const correctUriFormat = (val: string) => REGEX_IMG.test(val)
  const { t } = useTranslation()
  const _placeholder = placeholder ?? t('form.edit_profile.avatar_placeholder')

  const {
    register,
    unregister,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const uri = watch(name)

  return (
    <Flex alignItems='center' gap={5}>
      {correctUriFormat(uri) && (
        <Box position='relative' outline='none' border='none' maxW={'100%'}>
          <AspectRatio
            flexShrink={0}
            w={{ base: 20, md: 40 }}
            ratio={1.25 / 1}
            borderRadius={0}
            overflow='hidden'
            {...aspectRatioProps}
          >
            {isVideo ? (
              <ReactPlayer url={uri} width='100%' height='100%' controls />
            ) : (
              <Image src={uri} fallbackSrc={fallback} />
            )}
          </AspectRatio>
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
        </Box>
      )}
      {!correctUriFormat(uri) && (
        <FormControl isInvalid={!!errors['name']}>
          <Input
            type='text'
            {...register(name, {
              validate: (val: string) => {
                if (val && !correctUriFormat(val)) {
                  return t('form.error.avatar_error')
                }
              },
            })}
            mb={1}
            placeholder={_placeholder}
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
      )}
    </Flex>
  )
}

const ColorPicker = () => {
  const { watch, setValue } = useFormContext<CustomizationValues>()
  const color = watch('color')
  const setColor = useCallback((color: string) => {
    setValue('color', color)
  }, [])
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color: ColorResult) => {
    setColor(color.hex)
  }

  return (
    <Box>
      <Flex
        p='5px'
        bg='white'
        borderRadius='md'
        boxShadow='0 0 0 1px rgba(0,0,0,.1)'
        display='inline-block'
        cursor='pointer'
        onClick={handleClick}
      >
        <Box width='36px' height='14px' borderRadius='md' bg={color} />
      </Flex>
      {displayColorPicker && (
        <Box position='absolute' zIndex='2'>
          <Box position='fixed' top='0' right='0' bottom='0' left='0' onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </Box>
      )}
    </Box>
  )
}

const RowLayout = ({
  label,
  children,
  helper,
  error,
}: {
  label: string
  children: React.ReactNode
  helper: string
  error?: string
}) => {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(6, 1fr)' }}>
      <GridItem colSpan={1}>
        <FormLabel fontWeight='bold'>{label}</FormLabel>
      </GridItem>
      <GridItem colSpan={5}>
        <Flex direction={'column'} gap={1}>
          {children}
          <Text>{helper}</Text>
        </Flex>
        <FormErrorMessage>{error}</FormErrorMessage>
      </GridItem>
    </Grid>
  )
}

export default CustomizationModal
